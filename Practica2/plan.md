# 📋 Plan de Trabajo - Práctica 2: Mini Proyecto AJAX & Fundamentos

Este documento define la hoja de ruta, arquitectura del proyecto, división de tareas del equipo y especificaciones técnicas para desarrollar la aplicación web interactiva basada en **AJAX con `XMLHttpRequest`** y responder a las preguntas teóricas solicitadas en [task.md](file:///D:/Cursos/Web/Practica2/task.md).

---

## 1. 🎯 Objetivos del Proyecto

1. **Práctico**: Desarrollar una aplicación web interactiva que consuma datos de una API pública mediante el objeto nativo `XMLHttpRequest` (AJAX tradicional), renderizando la información de forma dinámica y elegante sin recargar la página.
2. **Teórico**: Documentar y comprender a fondo los fundamentos de la comunicación asíncrona, el protocolo HTTP, JSON y el ciclo de vida de `XMLHttpRequest`.
3. **Colaborativo**: Establecer un flujo ordenado de trabajo en equipo con separación clara de responsabilidades (HTML/CSS, JavaScript/AJAX, Documentación y Pruebas).

---

## 2. 🌐 Selección de la API

| Opción | API | Endpoint Recomendado | Ventajas para la Práctica |
|---|---|---|---|
| **Opción A (Recomendada)** | **FakeStore API** | `https://fakestoreapi.com/products` | Permite construir un catálogo de productos muy visual con imágenes, precios, categorías y valoraciones. Gran impacto visual para la entrega. |
| **Opción B** | **JSONPlaceholder** | `https://jsonplaceholder.typicode.com/users` o `/posts` | Estructura de datos muy directa, ideal para directorio de usuarios o blog de publicaciones. Menor carga visual de imágenes. |

> **Decisión sugerida**: **FakeStore API** por ofrecer imágenes reales y campos como categoría y precio, lo que facilita implementar filtros dinámicos en la interfaz.

---

## 3. 📂 Estructura del Proyecto

```text
Practica2/
├── index.html                  # Página principal (estructura semántica de la UI)
├── css/
│   └── styles.css              # Estilos visuales, grid responsivo, loaders y modal
├── js/
│   ├── ajax.js                 # Capa de red: funciones reutilizables con XMLHttpRequest
│   └── app.js                  # Lógica de negocio: manipulación de DOM, eventos y renderizado
├── docs/
│   └── respuestas_teoria.md    # Documento con la resolución de las preguntas de task.md
├── task.md                     # Enunciado original de la práctica
└── plan.md                     # Este plan de ejecución
```

---

## 4. 📝 Cuestionario Teórico a Responder ([task.md](file:///D:/Cursos/Web/Practica2/task.md))

Se redactará el archivo `docs/respuestas_teoria.md` con explicaciones claras, diagramas o analogías:

1. **¿Qué significa AJAX?**: *Asynchronous JavaScript and XML*. Definición y concepto fundamental.
2. **¿Por qué surgió?**: Evolución de la Web 1.0 (recargas completas de pantalla) hacia la Web 2.0 (experiencia de usuario fluida y dinámica tipo aplicación de escritorio).
3. **Funcionamiento tradicional de una página web**: Ciclo petición-recarga sincrónico (Request -> Full Page Reload).
4. **Comunicación asíncrona**: Ejecución en segundo plano, concepto de non-blocking I/O y experiencia sin interrupción para el usuario.
5. **XMLHttpRequest**: Qué es este objeto nativo del navegador, cómo se instancia y sus métodos principales (`open`, `send`, `setRequestHeader`).
6. **Solicitud HTTP**: Métodos (GET, POST, etc.), URLs, cabeceras (headers) y cuerpo (body).
7. **Respuesta del servidor**: Códigos de estado HTTP (200, 404, 500, etc.), `statusText`, cabeceras y `responseText`.
8. **JSON como formato de intercambio**: Por qué reemplazó a XML (ligereza, compatibilidad nativa con `JSON.parse()` y `JSON.stringify()`).
9. **Ventajas y limitaciones de XMLHttpRequest**:
   - *Ventajas*: Soporte universal en todos los navegadores, control fino del ciclo de vida y progreso de carga.
   - *Limitaciones*: Sintaxis verbosa basada en eventos/callbacks ("Callback Hell" si hay múltiples llamadas anidadas), falta de soporte nativo para Promises (a diferencia de la moderna Fetch API).

---

## 5. 🛠️ Fases de Implementación

### Fase 1: Maquetación y Diseño (HTML5 & CSS3)
- [ ] Crear `index.html` con estructura semántica:
  - Header con título y barra de herramientas (selector de categoría y buscador).
  - Contenedor de estado: Spinner de carga (`#loader`) y mensajes de error/alerta (`#error-container`).
  - Contenedor principal de tarjetas/cards (`#items-grid`).
  - Modal o tarjeta flotante para ver el detalle completo de un elemento.
- [ ] Diseñar `css/styles.css`:
  - Diseño responsivo (CSS Grid / Flexbox).
  - Animación del spinner de carga.
  - Estilos modernos para tarjetas (hover effects, insignias de precio/categoría).

### Fase 2: Módulo de Peticiones AJAX (`js/ajax.js`)
- [ ] Implementar la función de petición con `XMLHttpRequest`:
  ```javascript
  function consumirApi(metodo, url, callbackExito, callbackError) {
      const xhr = new XMLHttpRequest();
      xhr.open(metodo, url, true);

      xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
              try {
                  const data = JSON.parse(xhr.responseText);
                  callbackExito(data);
              } catch (e) {
                  callbackError("Error al procesar el formato JSON de la respuesta.");
              }
          } else {
              callbackError(`Error en la petición. Código de estado: ${xhr.status} (${xhr.statusText})`);
          }
      };

      xhr.onerror = function () {
          callbackError("Error de red o conexión fallida con el servidor.");
      };

      xhr.send();
  }
  ```

### Fase 3: Lógica de Interfaz y Renderizado (`js/app.js`)
- [ ] Control del ciclo de vida en la UI:
  - Mostrar spinner antes de iniciar la solicitud.
  - Ocultar spinner al recibir la respuesta.
  - Si hay error: mostrar tarjeta de error amigable con botón de "Reintentar".
  - Si hay éxito: construir las tarjetas en el DOM dinámicamente (`document.createElement` o template literals seguros).
- [ ] Interactividad adicional:
  - Filtro por categoría o búsqueda por título en tiempo real (filtrado en memoria).
  - Modal o visualización de detalles al hacer clic en un producto/usuario.

### Fase 4: Documentación Teórica y Preguntas
- [ ] Redactar las respuestas completas en `docs/respuestas_teoria.md` vinculándolas con capturas o ejemplos del código desarrollado en la práctica.

### Fase 5: Pruebas y Validación
- [ ] Inspeccionar en las Developer Tools del navegador (F12):
  - Verificar la petición tipo `xhr` en la pestaña **Network (Red)**.
  - Verificar que no existan errores ni advertencias en la pestaña **Console (Consola)**.
  - Simular desconexión (modo Offline) para comprobar que el manejador de errores responde correctamente.

---

## 6. 👥 Sugerencia de Distribución para el Equipo

| Rol | Miembro Sugerido | Responsabilidades Principales |
|---|---|---|
| **Frontend & UI (HTML/CSS)** | Integrante 1 | Maquetar `index.html`, diseñar `styles.css`, animar loader y modal de detalles. |
| **Lógica AJAX & Red (JS)** | Integrante 2 | Desarrollar `ajax.js` con `XMLHttpRequest`, manejo de estados HTTP y parsing JSON. |
| **Integración DOM & Eventos (JS)** | Integrante 3 | Crear `app.js`, conectar datos con la vista, filtros y eventos de clic. |
| **Investigación & Documentación** | Integrante 4 | Redactar `docs/respuestas_teoria.md` contestando las preguntas de `task.md` y coordinar pruebas. |

*(Si el equipo tiene 2 o 3 integrantes, los roles de JavaScript o Frontend pueden unificarse).*

---

## 7. 🚀 Siguientes Pasos
Una vez revisado y aprobado este plan:
1. Crear el archivo de respuestas teóricas `docs/respuestas_teoria.md`.
2. Crear los archivos base de la aplicación (`index.html`, `css/styles.css`, `js/ajax.js`, `js/app.js`).
3. Probar la integración completa en el navegador.
