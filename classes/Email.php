<?php

    namespace Classes;

    use PHPMailer\PHPMailer\PHPMailer;


    class Email {

        public $email;
        public $nombre;
        public $token;


        public function __construct($email, $nombre, $token) {

            $this->email = $email;
            $this->nombre = $nombre;
            $this->token = $token;

        }


        public function enviarConfirmacion() {

            //Crear el objeto de email
            $mail = new PHPMailer();

            $mail->isSMTP();
            $mail->Host = $_ENV['EMAIL_HOST'];
            $mail->SMTPAuth = true;
            $mail->Port = $_ENV['EMAIL_PORT'];
            $mail->Username = $_ENV['EMAIL_USER'];
            $mail->Password = $_ENV['EMAIL_PASS'];

            $mail->setFrom('cuentas@appsalon.com');
            $mail->addAddress('cuentas@appsalon.com', 'APPSalon.com');
            $mail->Subject = 'Confirma tu cuenta';

            //Set HTML
            $mail->isHTML(TRUE);
            $mail->CharSet = 'UTF-8';

            $contenido = "<html>";
            $contenido .= "<p><strong>Hola " . $this->nombre . "</strong></p>";
            $contenido .= "<p>Has creado tu cuenta en App Salon, solo debes confirmarla presionando el siguiente enlace.</p>";
            $contenido .= "<p>Presiona aquí: <a href='" . $_ENV['APP_URL'] . "/confirmar-cuenta?token=" . $this->token . "'>Confirmar Cuenta</a></p>";
            $contenido .= "<p>Si tu no solicitaste esta cuenta, puedes ignorar el mensaje</p>";
            $contenido .= "<html>";

            $mail->Body = $contenido;

            //Enviar el mail
            $mail->send();

        }


        public function enviarInstrucciones() {
        
            //Crear el objeto de email
            $mail = new PHPMailer();

            $mail->isSMTP();
            $mail->Host = $_ENV['EMAIL_HOST'];
            $mail->SMTPAuth = true;
            $mail->Port = $_ENV['EMAIL_PORT'];
            $mail->Username = $_ENV['EMAIL_USER'];
            $mail->Password = $_ENV['EMAIL_PASS'];

            $mail->setFrom('cuentas@appsalon.com');
            $mail->addAddress('cuentas@appsalon.com', 'APPSalon.com');
            $mail->Subject = 'Reestablece tu contraseña';

            //Set HTML
            $mail->isHTML(TRUE);
            $mail->CharSet = 'UTF-8';

            $contenido = "<html>";
            $contenido .= "<p><strong>Hola " . $this->nombre . "</strong></p>";
            $contenido .= "<p>Has solicitado reestablecer tu contraseña, sigue el siguiente enlace para ello.</p>";
            $contenido .= "<p>Presiona aquí: <a href='" . $_ENV['APP_URL'] . "/recuperar?token=" . $this->token . "'>Reestablecer Contraseña</a></p>";
            $contenido .= "<p>Si tu no solicitaste este cambio, puedes ignorar el mensaje</p>";
            $contenido .= "<html>";

            $mail->Body = $contenido;

            //Enviar el mail
            $mail->send();

        }

    }