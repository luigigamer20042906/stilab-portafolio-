# STILab® — Portafolio web de Luis Zambrano

**Versión 2: experiencia editorial inspirada en la navegación de All In® y la atmósfera visual de Wide Angle.**

## 1. Cómo abrirlo

1. Descomprime por completo `STILab_Experiencia_AllIn_v2.zip`.
2. Abre la carpeta `STILab_AllIn_Experiencia`.
3. Haz doble clic en `index.html`. Funciona en Chrome, Firefox, Edge y Safari actuales, sin instalar nada ni pagar una API.
4. Conéctate a Internet solo si necesitas abrir los enlaces externos o utilizar un programa de correo desde el formulario.

**No abras el HTML dentro del ZIP.** Primero extrae toda la carpeta para que las imágenes puedan cargarse.

## 2. Qué se implementó

- **Timeline / inicio**: portada editorial con tipografía de gran formato; carrusel horizontal de proyectos, desplazamiento táctil, arrastre con mouse, teclado y botones; barra de progreso; piezas destacadas.
- **Proyectos / Works**: 12 proyectos reales de los archivos proporcionados; categorías filtrables; vista de cuadrícula; vista de lista; botón `Ajustar` para ver imágenes completas.
- **Índice / Index**: listado interactivo con número, proyecto y campo; la portada cambia al pasar el cursor, al dar foco o al tocar una fila.
- **Archivo / Archive**: mosaico de 23 imágenes de proyectos; cada pieza abre su ficha correspondiente.
- **Sobre mí / Datos generales**: nombre, carrera, Universidad del Azuay, Cuenca, texto de presentación, servicios/habilidades, cinco programas y un espacio reservado para el retrato pendiente.
- **Hobbies**: seis intereses con imagen, título y explicación.
- **Contacto**: correo e Instagram reales, además de un formulario que prepara un mensaje en el correo del visitante usando `mailto:` (sin servidor).
- **Proyecto individual**: título, descripción, imagen principal, área, herramientas, galería, navegación anterior/siguiente y enlace de Behance cuando está disponible.
- **Modo oscuro / claro**: botón circular superior; recuerda el último tema elegido en navegadores que permitan almacenamiento local.
- **Responsive**: optimizado para escritorio, tablet y celular, menú móvil plegable y navegación táctil.
- Transiciones suaves y compatibilidad con usuarios que han activado "reducir movimiento".

La estructura se inspira en una referencia comercial, pero **el HTML, CSS y JavaScript de esta entrega son una implementación propia**, sin descargar ni copiar los archivos privados del template.

## 3. Archivos

- `index.html`: estructura, encabezado, menú y pie del sitio.
- `styles.css`: todas las reglas visuales y responsive.
- `projects-data.js`: nombres, textos, imágenes, herramientas, categorías y enlaces de los proyectos.
- `script.js`: renderizado de páginas, navegación, carrusel, filtro, índice interactivo, tema y formulario.
- `assets/`: imágenes y logotipo originales optimizados.
- `capturas/`: evidencia visual de las vistas desktop y móvil para la tarea.
- `TEXTO_PARA_ENTREGA.txt`: explicación del diseño y reflexión para entregar al profesor.

## 4. Cómo personalizarlo

**Foto personal (pendiente):** cuando tengas tu fotografía, reemplaza en `script.js` la sección `portrait-placeholder` que aparece en la función `renderAbout()` por una imagen, por ejemplo:

```html
<div class="portrait-placeholder">
  <img src="assets/mi-foto.jpg" alt="Retrato profesional de Luis Zambrano" class="retrato-real">
</div>
```

Guarda tu foto como `assets/mi-foto.jpg` y agrega lo siguiente a `styles.css`:

```css
.retrato-real { width:100%; height:100%; object-fit:cover; }
```

Puedes enviarme la foto para integrarla sin que tengas que modificar el código.

**Modificar proyectos:** abre `projects-data.js`. Cada objeto de `projects` contiene `title`, `category`, `area`, `description`, `tools`, `images`, `alt` y un enlace opcional. Las imágenes se guardan en `assets/`.

**Colores y letras:** abre `styles.css` y cambia las variables de `body[data-theme="dark"]` y `body[data-theme="light"]`.

**Correo:** en `index.html` y `script.js` se utiliza `Luisz@stillab.studio`. Reemplázalo en ambos archivos si cambia.

## 5. Publicar gratis

### Netlify Drop (la opción más sencilla)

1. Entra en https://app.netlify.com/drop.
2. Inicia sesión si la plataforma lo solicita.
3. Arrastra **la carpeta completa `STILab_AllIn_Experiencia` ya descomprimida**, no solo `index.html`.
4. Netlify generará una dirección pública `*.netlify.app` que podrás compartir.
5. Comprueba el enlace tanto en computadora como en tu teléfono.

### GitHub Pages

1. Crea un repositorio nuevo en https://github.com/.
2. Sube el contenido de la carpeta (de modo que `index.html` quede en la raíz del repositorio).
3. Ve a **Settings → Pages → Build and deployment → Deploy from a branch**, selecciona la rama principal y la carpeta `/ (root)`.
4. Abre el enlace que muestre GitHub Pages después de activar la publicación.

> La publicación no está realizada aún: este paquete se entrega listo para subir, sin un dominio ni un enlace público inventado.

## 6. Checklist del ejercicio

- [x] Datos generales con formación, correo, habilidades y retrato reservado.
- [x] Mínimo 3 proyectos, con imagen, nombre, descripción y herramientas (hay 12).
- [x] Mínimo 3 hobbies con imagen, título y descripción (hay 6).
- [x] HTML5, CSS3 y JavaScript local.
- [x] Navegación, efecto hover, links y adaptación móvil.
- [x] Capturas de pantalla y texto explicativo.
- [x] Cambio de tema, animaciones y formulario de contacto (extras).
- [ ] Incorporar foto real cuando la envíes.
- [ ] Publicar en Netlify o GitHub Pages y copiar el enlace público.

## 7. Referencias de inspiración

- All In — https://allintitarvl.framer.website/
- Wide Angle — https://wideangles.framer.website/

El portafolio utiliza contenido y fotografías de los trabajos compartidos por Luis Zambrano. Algunas herramientas asociadas a los proyectos son propuestas basadas en el tipo de pieza y conviene verificarlas antes de su publicación final.
