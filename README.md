![Proyecto Final de Backend - Coder House](https://github.com/MaJiMart/proyectoFinalBackend-Martinez/assets/116087573/e7e9c026-8ccf-407b-ba77-f95117d5dbb6)

<h1>📌"Proyecto ecommerce"</h1>

<br>Consigna:</br>
<p>Ecommerce funcional, manejo de diferentes tipos de usuarios, productos, carritos, conexión a base de datos</p>

<br>Aspectos a incluir:</br>
<p>Desde el router de /api/users, crear tres rutas:</p>
<p>✔️ GET  /  deberá obtener todos los usuarios, éste sólo debe devolver los datos principales como nombre, correo, tipo de cuenta (rol)</p>
<p>✔️ DELETE / deberá limpiar a todos los usuarios que no hayan tenido conexión en los últimos 2 días. (puedes hacer pruebas con los últimos 30 minutos, por ejemplo). Deberá enviarse un correo indicando al usuario que su cuenta ha sido eliminada por inactividad</p>
<p>✔️ Crear una vista para poder visualizar, modificar el rol y eliminar un usuario. Esta vista únicamente será accesible para el administrador del ecommerce</p>
<p>✔️ Finalizar las vistas pendientes para la realización de flujo completo de compra. NO ES NECESARIO tener una estructura específica de vistas, sólo las que tú consideres necesarias para poder llevar a cabo el proceso de compra.</p>
<p>✔️ No es necesario desarrollar vistas para módulos que no influyan en el proceso de compra (Como vistas de usuarios premium para crear productos, o vistas de panel de admin para updates de productos, etc)</p>
<p>✔️ Realizar el despliegue de tu aplicativo en la plataforma de tu elección (Preferentemente Railway.app, pues es la abarcada en el curso) y corroborar que se puede llevar a cabo un proceso de compra completo.</p>

<P>⚡ Deploy: https://proyectofinalbackend-martinez-production.up.railway.app/</P>
<P>⚡ Docker repository: https://hub.docker.com/repository/docker/majimart/proyectfinal/general</P>

<p>⚙️ Dependencias:</p>
    <P>bcrypt: ^5.1.1</P>
    <P>connect-mongo: ^5.1.0</P>
    <P>cookie-parser: ^1.4.6</P>
    <P>cors: ^2.8.5</P>
    <P>express: ^4.18.2</P>
    <P>express-handlebars: ^7.1.2</P>
    <P>jsonwebtoken: ^9.0.2</P>
    <P>mongoose: ^8.0.4</P>
    <P>mongoose-paginate-v2: ^1.8.0</P>
    <P>multer: ^1.4.5-lts.1</P>
    <P>nodemailer: ^6.9.8</P>
    <P>passport: ^0.7.0</P>
    <P>passport-github2: ^0.1.12</P>
    <P>passport-jwt: ^4.0.1</P>
    <P>passport-local: ^1.0.0</P>
    <P>swagger-jsdoc: ^6.2.8</P>
    <P>swagger-ui-express: ^5.0.0</P>
    <P>twilio: ^5.0.0-rc.1</P>
    <P>winston: ^3.11.0
    </p>
    
<p>⚙️ devDependencies:</p>
    <P>@faker-js/faker: ^8.3.1</P>
    <P>chai: ^5.0.3</P>
    <P>dotenv: ^16.3.1</P>
    <P>mocha: ^10.2.0</P>
    <P>supertest: ^6.3.4</P>
    <p>mocha: ^10.2.0 ,</p>
    <p>supertest: ^6.3.4

</p>
