
# Villaneda Store

## Descripción del proyecto

Villaneda Store es una aplicación web de comercio electrónico enfocada en la comercialización de relojes.

Permite consultar productos, marcas y ofertas, administrar el carrito de compras, registrar usuarios, iniciar sesión, gestionar favoritos y consultar información de contacto.

El proyecto fue desarrollado con Angular como trabajo final de Técnicas de Programación Frontend.

## Integrantes

| Integrante | Responsabilidades |
|---|---|
| Sebastián Villaneda | Estructura, navegación, inicio, diseño responsive y geolocalización. |
| Milerick Henao | Catálogo, productos, ofertas, detalle, carrito y drag and drop. |
| Natalia Vélez Orjuela | Registro, autenticación, guards, cookies, favoritos y pruebas de sus módulos. |

## Tecnologías utilizadas

- Angular 22
- TypeScript
- HTML5
- CSS3
- Angular Router
- Angular CDK
- Reactive Forms
- Signals
- RxJS
- LocalStorage
- Cookies
- Vitest
- Git y GitHub

## Instalación y ejecución

Clonar el repositorio:

```bash
git clone https://github.com/NataliaVelez0903/VillanedaStore.git
```

Ingresar al repositorio y seleccionar la rama de integración:

```bash
cd VillanedaStore
git checkout develop
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

## Requisitos del proyecto

Las siguientes rutas de archivos son relativas a `villaneda-store/`.

| Requisito | Implementación | Ruta o componente |
|---|---|---|
| Navegación | Menús con Angular Router | `src/app/app.routes.ts` |
| Navbar reutilizable | Navegación principal | `src/app/layout/navbar/` |
| Footer reutilizable | Enlaces y preferencias | `src/app/layout/footer/` |
| Página 404 | Ruta no encontrada | `src/app/paginas/pagina-no-encontrada/` |
| Registro | Formularios reactivos y validaciones | `src/app/paginas/cuenta/registro/` |
| Login | Autenticación de usuarios | `src/app/paginas/cuenta/iniciar-sesion/` |
| Protección de rutas | Guards funcionales | `src/app/nucleo/guards/` |
| Buenas prácticas | Servicios, interfaces y componentes | `src/app/nucleo/` y `src/app/compartido/` |
| Cookies | Guardar, leer y eliminar | `src/app/nucleo/servicios/cookies.service.ts` |
| Consentimiento | Aceptar, rechazar y restablecer | `src/app/nucleo/servicios/consentimiento-cookies.service.ts` |
| Banner de cookies | Interfaz de consentimiento | `src/app/layout/banner-cookies/` |
| Geolocalización | Ubicación y sede cercana | `src/app/paginas/contacto/` |
| Servicio de geolocalización | API de ubicación | `src/app/nucleo/servicios/geolocalizacion.service.ts` |
| Diseño responsive | Media queries, grid y flexbox | `src/styles.css` y estilos de componentes |
| Drag and drop | Ordenamiento de favoritos | `src/app/paginas/favoritos/` |
| Drag and drop | Productos al carrito | `src/app/paginas/catalogo/` |

## Rutas de navegación

| Ruta | Funcionalidad |
|---|---|
| `/inicio` | Página principal |
| `/relojes` | Catálogo de productos |
| `/marcas` | Marcas disponibles |
| `/ofertas` | Productos en oferta |
| `/blog` | Artículos |
| `/contacto` | Contacto y geolocalización |
| `/registro` | Crear cuenta |
| `/iniciar-sesion` | Ingresar a una cuenta |
| `/favoritos` | Favoritos del usuario autenticado |
| `/carrito` | Carrito de compras |
| `**` | Página no encontrada |

Las páginas utilizan lazy loading para cargar sus componentes cuando son requeridos.

## Registro de usuarios

Permite registrar cuentas mediante formularios reactivos.

Campos:

- Nombre completo.
- Correo electrónico.
- Contraseña.
- Confirmación de contraseña.

Validaciones:

- Campos obligatorios.
- Nombre de mínimo dos caracteres.
- Formato del correo electrónico.
- Contraseña de mínimo ocho caracteres.
- Coincidencia de contraseñas.
- Control de correos duplicados.

El formulario presenta mensajes de error y deshabilita el envío cuando los datos no son válidos.

## Autenticación

El servicio `AuthService` administra el registro, inicio y cierre de sesión.

Incluye:

- Validación de credenciales.
- Persistencia de sesión.
- Opción de recordar sesión.
- Recuperación del correo recordado.
- Mensajes de error.
- Navegación entre registro e inicio de sesión.

Los usuarios se almacenan en localStorage y las contraseñas se representan mediante hashes SHA-256.

## Protección de rutas

Se utilizan dos guards funcionales:

- `authGuard`: protege la ruta de favoritos cuando no existe una sesión activa.
- `invitadoGuard`: impide que los usuarios autenticados vuelvan a las páginas de registro e inicio de sesión.

Cuando un usuario intenta acceder a favoritos sin iniciar sesión, se redirige al formulario de ingreso conservando la ruta de destino mediante el parámetro `volver`.

## Gestión de favoritos

Cada usuario dispone de su propia lista de favoritos.

Funcionalidades:

- Agregar productos.
- Eliminar productos.
- Consultar favoritos.
- Ordenar mediante botones.
- Ordenar mediante arrastrar y soltar.
- Conservar el orden después de recargar.
- Mantener listas independientes por usuario.

El ordenamiento utiliza Angular CDK y `moveItemInArray`.

La interfaz cuenta con retroalimentación visual durante el arrastre y botones de ordenamiento como alternativa.

## Gestión de cookies

El servicio `CookiesService` centraliza las operaciones de guardar, leer y eliminar cookies.

| Cookie | Función | Duración |
|---|---|---|
| `vs_consentimiento` | Guarda la decisión del usuario | 180 días |
| `vs_sesion` | Mantiene la sesión activa | 7 días si se selecciona recordar sesión; de lo contrario, cookie de sesión |
| `vs_recordar_correo` | Recuerda el correo electrónico | 30 días |

La cookie de sesión es necesaria para el funcionamiento de la autenticación.

El correo se guarda únicamente cuando el usuario acepta las cookies de preferencias y selecciona recordar sesión.

El banner permite aceptar o rechazar las cookies. Desde el footer se pueden restablecer las preferencias sin cerrar la sesión activa.

## Geolocalización

El módulo de contacto contempla la ubicación del usuario y la consulta de la sede más cercana.

Archivos asociados:

- `src/app/paginas/contacto/`
- `src/app/nucleo/servicios/geolocalizacion.service.ts`

## Buenas prácticas de programación

El proyecto incorpora:

- Separación de responsabilidades mediante servicios.
- Interfaces y tipado con TypeScript.
- Inyección de dependencias.
- Componentes reutilizables.
- Nombres descriptivos.
- Lazy loading.
- Formularios reactivos.
- Variables CSS compartidas.
- HTML semántico y atributos de accesibilidad.
- Pruebas automatizadas.
- Control de versiones mediante Git.

## Diseño responsive

La aplicación utiliza Flexbox, CSS Grid y media queries para adaptar las interfaces.

Los módulos de registro, inicio de sesión, favoritos y cookies fueron revisados manualmente en los siguientes tamaños:

- 360 px: dispositivos móviles.
- 768 px: tabletas.
- 1280 px: computadores.

## Pruebas automatizadas

Se utiliza Vitest junto con Angular TestBed.

Ejecutar todas las pruebas desde la carpeta `villaneda-store`:

```bash
npm test -- --watch=false
```

### Resultados de cuenta, favoritos y cookies

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

### Resultados generales

Última ejecución verificada: 25 de noviembre de 2026.

| Indicador | Resultado |
|---|---:|
| Archivos de pruebas exitosos | 19/19 |
| Total de pruebas | 69 |
| Pruebas exitosas | 69 |
| Pruebas fallidas | 0 |
| Porcentaje de éxito | 100 % |

## Compilación de producción

Ejecutar:

```bash
npm run build
```

Los archivos generados se encuentran en:

```text
dist/villaneda-store/
```

Última compilación verificada: 25 de noviembre de 2026.

Resultado: compilación exitosa.

## Control de versiones

El proyecto utiliza Git y GitHub para el trabajo colaborativo.

- `main`: rama principal.
- `develop`: rama de integración.
- `natalia-cuenta`: desarrollo de cuenta, autenticación, favoritos y cookies.
- `fix/pruebas-catalogo`: corrección de las pruebas del catálogo.
- Ramas de funcionalidades para los demás módulos.

Los cambios se organizan mediante commits descriptivos y Pull Requests.

## Consideraciones

El proyecto utiliza localStorage y cookies para simular la autenticación y persistencia de datos.

Esta implementación tiene fines académicos y no constituye un sistema de autenticación seguro para producción.

Una implementación real requiere un backend, una base de datos, mecanismos seguros de gestión de sesiones y algoritmos adecuados para almacenar contraseñas.

## Mockup original

El mockup original se adjuntará como parte de la entrega final del proyecto.

## Estado del proyecto

Los módulos de registro, autenticación, favoritos, protección de rutas y consentimiento de cookies se encuentran implementados y probados.

La rama de integración supera las 69 pruebas automatizadas y compila correctamente para producción.
