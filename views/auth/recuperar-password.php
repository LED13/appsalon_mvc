<h1 class="nombre-pagina">Reestablecer Password</h1>

<p class="descripcion-pagina">Introduce tu nueva password a continuación</p>

<?php include_once __DIR__ . "/../templates/alertas.php"; ?>

<?php if ($error) return; ?>

    <form class="formulario" method="POST">

        <div class="campo">
            <label for="" class="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Introduce la nueva password">
        </div>

        <input type="submit" class="boton" value="Reestablecer">

    </form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Iniciar Sesión</a>
    <a href="/crear-cuenta">¿Aún no tienes una cuenta? Crear una</a>
</div>