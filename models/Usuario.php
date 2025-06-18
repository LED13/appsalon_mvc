<?php

    namespace Model;

    class Usuario extends ActiveRecord {

        //Base de Datos
        protected static $tabla = 'usuarios';
        protected static $columnasDB = ['id', 'nombre', 'apellido', 'email', 'password', 'telefono', 'admin', 'confirmado', 'token'];

        public $id;
        public $nombre;
        public $apellido;
        public $email;
        public $password;
        public $telefono;
        public $admin;
        public $confirmado;
        public $token;


        public function __construct($args = []) {
            $this->id = $args['id'] ?? null;
            $this->nombre = $args['nombre'] ?? '';
            $this->apellido = $args['apellido'] ?? '';
            $this->email = $args['email'] ?? '';
            $this->password = $args['password'] ?? '';
            $this->telefono = $args['telefono'] ?? '';
            $this->admin = $args['admin'] ?? 0;
            $this->confirmado = $args['confirmado'] ?? 0;
            $this->token = $args['token'] ?? '';
        }


        //Mensajes de validación para la creación de una cuenta
        public function validarNuevaCuenta() {

            if (!$this->nombre) {
                self::$alertas['error'][] = 'No has incluido un nombre';
            }

            if (!$this->apellido) {
                self::$alertas['error'][] = 'No has incluido un apellido';
            }

            if (!$this->email) {
                self::$alertas['error'][] = 'No has incluido un email';
            }

            if (!$this->password) {
                self::$alertas['error'][] = 'No has incluido un password para la cuenta';
            }

            if (strlen($this->password) < 6) {
                self::$alertas['error'][] = 'El password debe contener por lo menos 6 caracteres';
            }

            if (!$this->telefono) {
                self::$alertas['error'][] = 'No has incluido un telefono';
            }

            return self::$alertas;
        }


        public function validarLogin() {
            
            if (!$this->email) {
                self::$alertas['error'][] = 'No has rellenado el campo email';
            }

            if (!$this->password) {
                self::$alertas['error'][] = 'No has rellenado el campo password';
            }

            return self::$alertas;
        }


        public function validarEmail() {
            
            if (!$this->email) {
                self::$alertas['error'][] = 'El e-mail es obligatorio';
            }

            return self::$alertas;
        }


        public function validarPassword() {
            
            if (!$this->password) {
                self::$alertas['error'][] = 'No has rellenado el campo password';
            }

            if (strlen($this->password) < 6) {
                self::$alertas['error'][] = 'El password debe contener por lo menos 6 caracteres';
            }

            return self::$alertas;
        }


        public function existeUsuario() {

            $query = "SELECT * FROM " . self::$tabla . " WHERE email = '" . $this->email . "' LIMIT 1";

            $resultado = self::$db->query($query);

            if ($resultado->num_rows) {
                self::$alertas['error'][] = 'El usuario ya está registrado';
            }

            return $resultado;

        }


        public function hashPassword() {

            $this->password = password_hash($this->password, PASSWORD_BCRYPT);

        }

        
        public function crearToken() {

            $this->token = uniqid();

        }


        public function comprobarPasswordAndVerificado($password) {
            
            $resultado = password_verify($password, $this->password);

            if (!$resultado || !$this->confirmado) {
                
                if (!$resultado) {
                    self::$alertas['error'][] = 'Password incorrecto';
                } 
                
                if (!$this->confirmado) {
                    self::$alertas['error'][] = 'No has confirmado la cuenta';
                }
                
            } else {
                return true;
            }

        }

    }