
# Villaneda Store

## Descripción del proyecto

Villaneda Store es una aplicación web de comercio electrónico enfocada en la comercialización de relojes. El proyecto permite consultar productos, marcas y ofertas, gestionar favoritos, registrar usuarios, iniciar sesión y acceder a las diferentes secciones de la tienda.

El proyecto fue desarrollado con Angular como parte de un trabajo académico.

## Tecnologías utilizadas

- Angular 22
- TypeScript
- HTML5
- CSS3
- Angular CDK
- Angular Router
- Reactive Forms
- LocalStorage
- Cookies
- Vitest
- Git y GitHub

## Instalación y ejecución

Ingresar a la carpeta de la aplicación:

```bash
cd villaneda-store
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar el servidor de desarrollo:

```bash
npm start
```

Abrir en el navegador:

http://localhost:4200/

## Funcionalidades del proyecto

- Página de inicio.
- Catálogo de relojes.
- Consulta de marcas y ofertas.
- Blog.
- Contacto.
- Carrito de compras.
- Registro de usuarios.
- Inicio y cierre de sesión.
- Gestión de favoritos.
- Gestión de preferencias de cookies.

## Módulo de cuenta y autenticación

### Registro de usuarios

Permite crear una cuenta mediante un formulario con los siguientes campos:

- Nombre completo.
- Correo electrónico.
- Contraseña.
- Confirmación de contraseña.

Se implementaron validaciones para campos obligatorios, formato del correo electrónico, longitud mínima de contraseña y coincidencia de contraseñas.

También se controla el registro de correos duplicados.

### Inicio y cierre de sesión

Permite ingresar utilizando las credenciales de una cuenta registrada.

Incluye:

- Validación de credenciales.
- Mensajes de error.
- Persistencia de sesión.
- Opción de recordar sesión.
- Recuperación del correo electrónico recordado.
- Navegación entre registro e inicio de sesión.
- Cierre de sesión.

### Protección de rutas

Se implementaron dos guards:

- `authGuard`: restringe el acceso a páginas privadas cuando el usuario no ha iniciado sesión.
- `invitadoGuard`: evita que usuarios autenticados ingresen nuevamente a las páginas de registro e inicio de sesión.

Cuando un usuario intenta acceder a favoritos sin iniciar sesión, se redirige al formulario de ingreso conservando la ruta de destino.

## Módulo de favoritos

Permite que cada usuario administre su propia lista de productos favoritos.

Funcionalidades:

- Agregar productos.
- Eliminar productos.
- Consultar favoritos.
- Cambiar el orden mediante botones.
- Cambiar el orden mediante arrastrar y soltar.
- Conservar el orden después de recargar la página.
- Mantener listas independientes para cada usuario.

Para el sistema de arrastrar y soltar se utiliza Angular CDK.

## Gestión de cookies

La aplicación cuenta con un banner que permite aceptar o rechazar las cookies de preferencias.

Se implementaron las siguientes cookies:

| Cookie | Función | Duración |
|---|---|---|
| vs_consentimiento | Guardar la decisión del usuario | 180 días |
| vs_sesion | Mantener la sesión iniciada | 7 días al seleccionar recordar sesión; de lo contrario, cookie de sesión |
| vs_recordar_correo | Recordar el correo electrónico | 30 días |

El correo únicamente se guarda cuando el usuario acepta las cookies de preferencias y selecciona la opción de recordar sesión.

Desde el footer se pueden restablecer las preferencias de cookies sin cerrar la sesión activa.

## Diseño responsive

Los módulos de registro, inicio de sesión, favoritos y cookies fueron revisados manualmente en los siguientes tamaños de pantalla:

- 360 px: dispositivos móviles.
- 768 px: tabletas.
- 1280 px: computadores.

## Pruebas automatizadas

El proyecto utiliza Vitest y Angular TestBed para realizar pruebas automatizadas.

Para ejecutar todas las pruebas:

```bash
npm test -- --watch=false
```

### Resultados del módulo de cuenta, favoritos y cookies

| Módulo | Pruebas exitosas |
|---|---:|
| Registro de usuarios | 7/7 |
| Inicio de sesión | 9/9 |
| Servicio de autenticación | 11/11 |
| Componente de favoritos | 1/1 |
| Servicio de favoritos | 8/8 |
| Consentimiento de cookies | 10/10 |
| Auth Guard | 3/3 |
| Invitado Guard | 4/4 |
| Total | 53/53 |

Todas las pruebas correspondientes a estos módulos fueron superadas correctamente.

### Resultados generales

### Resultados generales

Última ejecución: 25 de noviembre de 2026.

- Total de pruebas: 69.
- Pruebas exitosas: 69.
- Pruebas fallidas: 0.

Todas las pruebas automatizadas del proyecto fueron
superadas correctamente.
## Compilación de producción

Para generar la compilación:

```bash
npm run build
```

Los archivos generados se encuentran en:

```text
dist/villaneda-store/
```

La compilación de producción fue ejecutada correctamente el 25 de noviembre de 2026.

## Control de versiones

El proyecto utiliza Git y GitHub para el trabajo colaborativo.

- `develop`: rama de integración del equipo.
- `natalia-cuenta`: rama de desarrollo de cuenta, autenticación, favoritos y cookies.

Los cambios se organizan mediante commits separados por funcionalidad y se integran mediante Pull Requests.

## Consideraciones

La aplicación utiliza almacenamiento local y cookies para simular la autenticación y persistencia de datos.

Las contraseñas se almacenan como hashes SHA-256 y no como texto plano.

Esta implementación tiene fines académicos. Para un entorno real de producción se requiere un backend, una base de datos y mecanismos de autenticación y almacenamiento de contraseñas seguros.

## Estado del proyecto

Los módulos de registro, autenticación, favoritos, protección de rutas y consentimiento de cookies se encuentran implementados y probados.
