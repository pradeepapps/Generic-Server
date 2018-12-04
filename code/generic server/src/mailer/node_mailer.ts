/**********************************************************************************************************************
-- <copyright company="Company Name">
-- (c) 2019 Company Name
-- </copyright>
***********************************************************************************************************************
-- Project     : Generic Server
-- File        : node_mailer.ts
-- Author      : PR
-- Version     : 0.1
-- Date        : 02-Dec-2018
-- Status      : Initial Version
-- Description : Used to send mail.
--
-- Modification History
-----------------------------------------------------------------------------------------------------------------------
Date         | By  | Version | Change Description
-----------------------------------------------------------------------------------------------------------------------
02-Dec-2018  | PR  | 0.1     | Initial version
**********************************************************************************************************************/

import nodemailer from 'nodemailer';
import config from '../server/config.json';
import logger from '../diagnostic/logger';

class Mailer {

  private transport;

  constructor() {

    logger.debug('Initialize node mailer...');

    this.transport = nodemailer.createTransport({
      host: config.node_mailer.host,
      port: config.node_mailer.port,
      service: config.node_mailer.service,
      secure: config.node_mailer.secure,
      auth: {
        user: config.node_mailer.username,
        pass: config.node_mailer.password
      }
    });
  }

  public sendMail(sendTo, subject, message) {

    logger.debug('Sending mail to ' + sendTo + '...');

    this.transport.sendMail({
      from: config.node_mailer.username,
      to: sendTo,
      subject: subject,
      html: message
    }, (err, info) => {
      if (err) {
        logger.error(err);
      } else {
        logger.info(info);
        logger.info('Mail sent successfully.');
        this.transport.close();
      }
    });
  }

  /**
   * Send system related mails to specified email id.
   * @param subject Mail subject.
   * @param message Mail message.
   */
  public sendSystemMail(subject, message) {

    logger.debug('In sendSystemMail...');

    message = '<p>' + message + '</p>';
    message += '<br>With Regards<br>' + config.node_mailer.signature;
    message += '<br><br><i><b>Note:</b> This is system auto-generated mail.</i>';

    this.sendMail(config.node_mailer.system_mail_send_to, subject, message);
  }

  /**
   * Send user related mails.
   * @param subject Mail subject.
   * @param message Mail message.
   */
  public sendUserMail(sendTo, subject, message) {

    logger.debug('In sendUserMail...');

    message += '\n\nWith Regards\n' + config.node_mailer.signature;

    this.sendMail(sendTo, subject, message);
  }

}

export default new Mailer();
