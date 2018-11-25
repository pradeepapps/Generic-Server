## Create OpenSSL certificate with OpenSSL on Windows

Steps: 

1. Download OpenSSL EXE file from http://slproweb.com/products/Win32OpenSSL.html.
2. Install EXE.
3. Create the certificates in folder c:\sslcert. So go ahead and create this folder on your machine.
4. Start a command-line prompt (cmd.exe), and go to the sslcert folder (type: cd \sslcert).
5. Before you start OpenSSL, you need to set 2 environment variables:
	c:\sslcert> set RANDFILE=c:\sslcert\.rnd
	c:\sslcert> set OPENSSL_CONF=C:\OpenSSL-Win32\bin\openssl.cfg
6. Now you can start OpenSSL, type: "C:\Program Files\OpenSSL-Win64\bin\openssl.exe".
7. First we generate a 4096-bit long RSA key for our root CA and store it in file ca.key:
	OpenSSL> genrsa -out ca.key 4096
	If you want to password-protect this key, add option -des3.
8. Next, we create our self-signed root CA certificate ca.crt; you’ll need to provide an identity for your root CA:
	OpenSSL> req -new -x509 -days 1826 -key ca.key -out ca.crt
	The -x509 option is used for a self-signed certificate. 1826 days gives us a cert valid for 5 years.
	
9. Create our subordinate CA that will be used for the actual signing. First, generate the key:
	OpenSSL> genrsa -out ia.key 4096
	Then, request a certificate for this subordinate CA:
	OpenSSL> req -new -key ia.key -out ia.csr
10. Make sure that the Common Name you enter here is different from the Common Name you entered previously for the root CA. If they are the same, you will get an error later on when creating the pkcs12 file.

Next step: process the request for the subordinate CA certificate and get it signed by the root CA.

x509 -req -days 730 -in ia.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out ia.crt

https://blog.didierstevens.com/2015/03/30/howto-make-your-own-cert-with-openssl-on-windows/