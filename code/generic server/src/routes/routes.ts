import { Request, Response } from 'express';

import { UserController } from "../controllers/user-controller";

export class Routes {

  public userController: UserController = new UserController();

  public initialize(app): void {

    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'GET request successfulll!!!!'
        })
      })

    // Create a new user
    app.route('/user').post(this.userController.addNewUser);

    // Get all users
    app.route('/users').get(this.userController.getUsers);

    // update a specific user
    app.route('/user/:user_id').put(this.userController.updateUser);

    // get a specific user
    app.route('/user/:user_id').get(this.userController.getUserWithID);

    // delete a specific user
    app.route('/user/:user_id').delete(this.userController.deleteUser);

    // app.route('/user/:user_id')
    //   .get(this.userController.getUserWithID) // get a specific user
    //   .put(this.userController.updateUser) // update a specific user
    //   .delete(this.userController.deleteUser) // delete a specific user

  }
}