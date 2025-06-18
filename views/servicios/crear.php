<h1 class="nombre-pagina">Nuevo Servicio</h1>
<p class="descripcion-pagin">Rellena todos los campos para añadir un Nuevo Servicio</p>

<?php

    include_once __DIR__ . '/../templates/barra.php';
    include_once __DIR__ . '/../templates/alertas.php';

?>

<form class="formulario" method="POST" action="/servicios/crear">

    <?php include_once __DIR__ . '/formulario.php'; ?>

    <input type="submit" class="boton" value="Guardar Servicio">
</form>