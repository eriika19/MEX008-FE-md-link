# Sacbé

---

## Índice

- [Contexto](#contexto)
- [Definición del problema](#definición-del-problema)
- [Definición del producto](#definición-del-producto)
- [User Persona](#user-persona)
- [Diseño de UI](#diseño-de-ui)
- [Prototipo de baja fidelidad](#prototipo-de-baja-fidelidad)
- [Prototipo de alta fidelidad](#prototipo-de-alta-fidelidad)
- [Propuestas de valor](#propuestas-de-valor)
- [Historias de Usuario](#historias-de-usuario)
- [Testing de usabilidad](#testing-de-usabilidad)
- [Producto final](#producto-final)
- [Próximos alcances](#próximos-alcances)

---

## Contexto

En la Ciudad de México, donde hay poco más de dos millones de carros circulan a diario poco más de un millón. Con las ventajas de que es el transporte más barato y el que se desplaza a mayor velocidad en horas pico.

![bike-muppets](/src/img/readme/giphy-muppets.gif)

La mitad de los viajes en bicicleta en esta urbe son de menos de 8 kilómetros y duran menos de 20 minutos, y, en promedio, la bicicleta se usa entre 25 y 35 minutos.

En cuanto al clima, es propicio para el transporte en bicicleta: en época de calor. Cuando la temperatura no sobrepasa los 31 ó 32 °C; y, en época de frío, los días con menos de 11 grados centígrados no son muchos.

Y aunque la lluvia hace que disminuya el número de viajes en bicicleta, es predecible: en verano empieza a llover en la tarde. Así pues, quienes salen en bicicleta en la mañana, regresan a su casa un poco tarde, después de que la lluvia ya pasó.

Además, la mayor actividad laboral de la Ciudad de México (85%) se desarrolla en zonas sin altas pendientes.

Actualmente, del total de la movilidad vial en la Ciudad de México, el transporte en bicicleta representa 2.5% (poco menos de 300 mil viajes); hace 10 años representaba 1% (98 mil viajes). Con la duplicación de la infraestructura vial ciclista y una adecuada promoción se espera que los viajes en bicicleta se dupliquen en 2024.

![bike-cdmx](/src/img/image_16.jpeg)

La bicicleta es una opción viable, eficiente, de bajo costo y rápida en distancias cortas, que contribuye a mejorar la movilidad y a hacer de las ciudades espacios sustentables.

La disminución del uso del automóvil y del transporte público por el uso de la bicicleta (especialmente en viajes intermedios para ir a comer, hacer trámites…) tiene un efecto positivo sobre el medio ambiente. Y en la Ciudad de México, buena parte de los viajes se pueden hacer en bicicleta

## Definición de problema

Según el recuento no oficial realizado por grupos de activistas, en 2018 fallecieron 18 ciclistas en la CDMX por accidentes de tránsito.

Comúnmente tendemos a creer la idea, equivocada, de que los automóviles son la principal amenaza para las personas que usan la bicicleta para transportarse en grandes ciudades. La mala calidad del pavimento, los baches, las alcantarillas abiertas, grietas, las inundaciones y los topes mal hechos, son un riesgo constante para ellos.

## Definición del producto

La solución que proponemos para los ciclistas es: _Sacbé_ . Sacbé es un camino recto, elevado, sin desniveles y pavimentado construido por los mayas prehispánicos.

![bike-girl](/src/img/readme/giphy-bike-girl.gif)

_Sacbé_ una Red Social para el ciclista que busca mantenerse conectado, crear vínculos con otros ciclistas, mantenerse informado de eventos, rodadas, bloqueos, inundaciones, baches, etc...Y que además le permite solicitar ayuda de otros miembros de la comunidad en caso de algún incidente.

## User Persona

![Ramona](/src/img/RamonaDiaz.png)

## Diseño de UI

### Prototipo de baja fidelidad

Construimos un primer [prototipo](https://marvelapp.com/56f42d4/screen/59966204) de baja fidelidad en MarvelApp.

Los comentarios que obtuvimos acerca de este fueron:

- Necesitabamos diferenciar claramente las pantallas de "Iniciar sesión" y "Crear cuenta"
- No se entendía a que se refería la sección "Directorio"
- No se identificaba fácilmente el botón de agregar publicación en la primera ubicación que lo pusimos.

En consecuencia, decidimos dividir el directorio en dos secciones "Talleres" y "Tiendas" que eran más explicitas. De igual manera, decidimos cambiar la ubicación del botón de "Agreegar publicación" y mostrar dicho botón en el timeline

### Prototipo de alta fidelidad

Tomando en cuenta el feedback anterior, construimos un [prototipo](https://www.figma.com/proto/MMsy7ojEalu6q6QwTFCw5s/Red-social-bike?node-id=53%3A13&scaling=scale-down) de alta fidelidad en Figma.

Los comentarios que obtuvimos sobre este prototipo, fueron en general que era bastante intuitiva. Algunas observaciones fueron acerca de:
- No se intuía en todos los casos que la foto del usuario en la sección superior izquierda desplegaba un menú lateral.
- No resultaba intuitivo el botón de SOS, muchos los confundieron con notificaciones. Además no entendían cual era su función.

https://www.figma.com/proto/MMsy7ojEalu6q6QwTFCw5s/Red-social-bike?node-id=53%3A13&scaling=scale-down

## Historias de Usuario

### Primera
 Como usuario nuevo debo poder crear una cuenta con email y password para poder iniciar sesion. Por otro lado, necesito también tener la opción de iniciar sesión con mi cuenta de Google o Facebook.

#### `Criterios de aceptación`
- [ ] Si el mail o password no es válido, al momento de logearme, debo poder ver un mensaje de error.
- [ ] Debe ser visible si hay algún mensaje de error.
- [ ] Debo poder ver esta página de creación en Móviles y desktop (responsive).
- [ ] No debe necesitar recargar la página para crear una cuenta (SPA).

#### `Definición de terminado`
- La funcionalidad cumple/satisface los criterios de aceptación.
- La funcionalidad tiene test unitarios.
- El diseño visual corresponde al prototipo de alta fidelidad.
- El código de esta funcionalidad recibió code review.
- La funcionalidad esta desplegada y pública para ser probada.
- La funcionalidad fue probada manualmente.
- Se hicieron pruebas de usuabilidad y se implementó el feedback si se consideró necesario.

### Segunda
 Como usuario, una vez que ya ingrese con mi cuenta, quiero poder crear una publicación para invitar a los otros ciclistas a una rodada

#### `Criterios de aceptación`
- [ ] Si el input está vacío debo ver algún mensaje de error
- [ ] Si el input está vacío debo ver algún mensaje de error
- [ ] Debe ser Responsive
- [ ] Debe verificar que el usuario este logueado para poder publicar
- [ ] El mensaje debe mostrarse en el timeline sin necesidad de recargar la página

#### `Definición de terminado`
- La funcionalidad cumple/satisface los criterios de aceptación.
- La funcionalidad tiene test unitarios.
- El diseño visual corresponde al prototipo de alta fidelidad.
- El código de esta funcionalidad recibió code review.
- La funcionalidad esta desplegada y pública para ser probada.
- La funcionalidad fue probada manualmente.
- Se hicieron pruebas de usuabilidad y se implementó el feedback si se consideró necesario.

### Tercera
 Como usuario quiero poder editar una publicación, ya que me equivoqué al publicar la hora de la rodada y quiero corregir la hora.

#### `Criterios de aceptación`
- [ ] Al dar click para editar un post, debe cambiar el texto por un input
  que permita editar el texto y luego guardar los cambios.
- [ ] Al guardar los cambios debe cambiar de vuelta a un texto normal pero con la
  información editada.
- [ ] Debe ser responsive
- [ ] Se debe verificar que el usuario sea el creador de la publicación para poder editar
- [ ] El mensaje editado debe mostrarse en el timeline sin necesidad de recargar la página

#### `Definición de terminado`
- La funcionalidad cumple/satisface los criterios de aceptación.
- La funcionalidad tiene test unitarios.
- El diseño visual corresponde al prototipo de alta fidelidad.
- El código de esta funcionalidad recibió code review.
- La funcionalidad esta desplegada y pública para ser probada.
- La funcionalidad fue probada manualmente.
- Se hicieron pruebas de usuabilidad y se implementó el feedback si se consideró necesario.


### Cuarta
 Como usuario, quiero poder eliminar una publicación que hice porque me di cuenta que el evento que compartí ya pasó.

#### `Criterios de aceptación`
- [ ] Poder eliminar un post especifico
- [ ] Pedir confirmación antes de eliminar un post.

#### `Definición de terminado`
- La funcionalidad cumple/satisface los criterios de aceptación.
- La funcionalidad tiene test unitarios.
- El diseño visual corresponde al prototipo de alta fidelidad.
- El código de esta funcionalidad recibió code review.
- La funcionalidad esta desplegada y pública para ser probada.
- La funcionalidad fue probada manualmente.
- Se hicieron pruebas de usuabilidad y se implementó el feedback si se consideró necesario.

### Quinta
 Como usuario quiero poder darle like a una publicación de un evento que me gustó.

#### `Criterios de aceptación`
- [ ] Poder darle like a una publicación
- [ ] Poder quitarle like a una publicación
- [ ] Un usuario puede dar máximo un like en una publicación
- [ ] Llevar un conteo de los likes

#### `Definición de terminado`
- La funcionalidad cumple/satisface los criterios de aceptación.
- La funcionalidad tiene test unitarios.
- El diseño visual corresponde al prototipo de alta fidelidad.
- El código de esta funcionalidad recibió code review.
- La funcionalidad esta desplegada y pública para ser probada.
- La funcionalidad fue probada manualmente.
- Se hicieron pruebas de usuabilidad y se implementó el feedback si se consideró necesario.

## Testing de usabilidad

Con el producto ya desplegado, realizamos algunas [pruebas](https://drive.google.com/open?id=1uJEgWg4g4vBXwpnmU8r6FdViD6aVvzQt) con usuarios.

Las principales observaciones de los usuarios fueron:
- La página es rápida
- El fondo se pone obscuro como si el menú lateral siguiera abierto, y no se quita hasta hasta hacer scroll
- Al intentar editar a veces no aparece el texto de la publicación que se quiere modificar, en otras ocasiones aparece otro mensaje.
- Las publicaciones se ordenan aleatoriamente.

Planeamos tomar en cuenta estos comentarios para futuros alcances de nuestro proyecto.

## Producto final

## Próximos alcances








