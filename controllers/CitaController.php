<?php

    namespace Controllers;

    use MVC\Router;

    class CitaController {

        public static function index(Router $router) {

            if (!isset($_SESSION)) {
                session_start();
            }

            isAuth();            

            $router->render('cita/index', [
                'id' => $_SESSION['id'],
                'nombre' => $_SESSION['nombre']
            ]);
        }
    }