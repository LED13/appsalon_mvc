<?php

function debuguear($variable) : string {
    echo "<pre>";
        var_dump($variable);
    echo "</pre>";

    exit;
}


// Escapa / Sanitizar el HTML
function sanitizar($html) : string {
    $sanitizar = htmlspecialchars($html);
    
    return $sanitizar;
}


//
function esUltimo(string $actual, string $proximo) : bool {
    
    if ($actual !== $proximo) {
        return true;
    }

    return false;
}


//Función donde se revisa si el usuario esta autenticado
function isAuth() : void {
    if (!isset($_SESSION['login'])) {
        header('Location: /');
    }
}

//Función donde se revisa si el usuario es administrador
function isAdmin() : void {
    if (!isset($_SESSION['admin'])) {
        header('Location: /');
    }
}