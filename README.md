# Encriptador de Texto con JavaScript | Challenge ONE - Principiante en Programación

¡Bienvenid@ al primer desafío del Programa ONE, correspondiente al nivel Principiante en Programación!

En éste se desarrolló una aplicación web que encripta y desencripta textos, con la cual vamos a poder intercambiar mensajes secretos con otras personas que posean la clave de encriptación utilizada.

## Tabla de contenidos

- [Resumen](#resumen)
  - [El desafío](#el-desafío)
  - [Enlaces](#enlaces)
- [Mi proceso](#mi-proceso)
  - [Construido con](#construido-con)
  - [Lo que aprendí](#lo-que-aprendí)
  - [Desarrollo continuo](#desarrollo-continuo)
- [Agradecimientos](#agradecimientos)

## Resumen

### El desafío

De acuerdo con las instrucciones proporcionadas por los instructores, los requerimientos mínimos aplicados al desafío fueron:

- Uso de HTML, CSS y JavaScript.
- No se utilizaron librerías o frameworks.
- Para la maquetación de la aplicación se usó como referencia el diseño proporcionado en formato Figma, aunque se tuvo la libertad de realizar las modificaciones necesarias.
- La aplicación es totalmente responsiva.
- Se aplicó una distribución estructurada de carpetas para la clasificación de archivos, para así tener un mejor control de los mismos. Para este caso los archivos .css, .js, y las imágenes se almacenan cada uno en su carpeta correspondiente, quedando únicamente el .html en la carpeta raíz del proyecto.

### Enlaces

A continuación dejo los enlaces para que puedan visualizar el repositorio en GitHub, así como el enlace a la aplicación web publicada en Netlify y puedan observar el funcionamiento de la misma.

- Repositorio en GitHub: [Click aquí para acceder](https://github.com/NelPascual/encriptador_texto_nelpascual)
- URL del sitio en directo: [Click aquí para acceder](https://encriptador-texto-nelpascual.netlify.app/)

## Mi proceso

### Construido con:

- Marcado con HTML5 semántico
- CSS (custom properties, flexbox, grid layout)
- Flujo de trabajo Mobile-first
- JavaScript

### Lo que aprendí

En éste challenge apliqué de forma práctica la teoría proporcionada por los instructores en cada uno de los cursos del módulo "Principiante en Programación G6 - ONE", de los cuales obtuve los conceptos básicos de HTML, CSS y JavaScript 

Debido a que la información obtenida de dichos cursos es muy básica, hubieron aspectos que se tuvieron que investigar de forma individual para poder resolver el challenge.

En el caso de JavaScript, para poder diseñar el funcionamiento del encriptador, me incliné por el CIFRADO DE CÉSAR.

En criptografía, el cifrado César, también conocido como Cifrado por Desplazamiento, Código de César o Desplazamiento de César, es una de las técnicas de cifrado más simples y más usadas. Es un tipo de cifrado por sustitución en el que una letra en el texto original es reemplazada por otra letra que se encuentra un número fijo de posiciones más adelante o atrás en el alfabeto. Por ejemplo, con un desplazamiento de 3, la A sería sustituida por la D (situada 3 lugares a la derecha de la A), la B sería reemplazada por la E, etc. Este método debe su nombre a Julio César, que lo usaba para comunicarse con sus generales.

Como todos los cifrados de sustitución alfabética simple, el cifrado César se descifra con facilidad y en la práctica no ofrece mucha seguridad en la comunicación.

Para que puedan tener una idea un poco clara de cómo realicé el funcionamiento del encriptador, voy a explicar de forma práctica las partes principales que realizan una acción en concreto.

- El ```textarea``` que recibe el texto a encriptar/desencriptar, está ligado con un evento ```onclick``` que poseen los botones.
- La primera función sirve para que podamos insertar de forma dinámica texto a algunos elementos específicos en el HTML. Los texto pueden definirse directamente en el HTML, pero para poner en práctica lo aprendido, decidí realizarlo a través de JavaScript, ésta función y la descrita en la tercera funcionan en conjunto para cumplir el objetivo.

```js
function assingTextElement(element, text) {
    let elementHTML = document.querySelector(element);
    elementHTML.innerHTML = text;
}
```
- La segunda función la utilicé para agregar el atributo ```placeholder``` al ```textarea```:

```js
function assingPlaceHolder() {
    document.querySelector('#text').setAttribute('placeholder', 'Ingrese el texto aquí...');
}
```
- La tercera función en conjunto con la primera insertan los textos deseados en los elementos definidos en el HTML, como repito, esto puede omitirse escribiendo directamente los textos en el archivo HTML: 
```js
function initialConditions() {
    assingTextElement('h1', 'Encriptador de Texto');
    assingTextElement('.indication', 'Puedes escribir texto usando mayúsculas, minúsculas y cualquier caracter especial.');
    assingTextElement('h2', 'Ningún mensaje fue encontrado');
    assingTextElement('.text-message', 'Ingresa el texto que deseas encriptar o desencriptar.');
    assingTextElement('.text1-footer', 'Challenge Encriptador de Texto - ONE | Alura');
    assingTextElement('.text2-footer', 'Desarrollado por <span>Nelson Enrique Pascual Martínez</span> &copy;');
    assingTextElement('.text3-footer', 'El Salvador - Febrero de 2024');
}
```
- La cuarta función oculta los elementos que contienen a la imagen, al h2 y al párrafo, así como también dan algún formato a otros elementos; ésto sucede cuando damos click, ya sea al botón encriptar o desencriptar, y nos muestra el texto correspondiente:
```js
function clear() {
    const outputPositioning = document.querySelector('.textOutput__message');
    outputPositioning.style.display = 'block';
    
    const hideImage = document.querySelector('.textOutput__message img');
    hideImage.style.display = 'none';
    
    const hideH2 = document.querySelector('.textOutput__message h2');
    hideH2.style.display = 'none';

    const showButtonCopy = document.querySelector('.textOutput__buttonCopy');
    showButtonCopy.style.display = 'flex';
}
```
- La quinta función es la que realiza la encriptación del texto y que se activa al momento de dar click al botón encriptar. Las dos primeras constantes nos sirven para obtener y guardar el texto contenido en el ```textarea```; la constante ```code``` nos sirve para almacenar cada uno de los valores numéricos de cada uno de los caracteres del texto ingresado en el ```textarea``` como un array, el cual obtenemos con el ciclo ```for```, el cual recorre todo el texto y va agregando cada uno de los caracteres el cual es convertido a su valor numérico con el método ```textEncrypt.charCodeAt```, y que a su vez le suma las posiones que deberá moverse (que en nuestro caso es 3), y el valor resultante es almacenado en el array denominado ```codes```. Luego en la constante ```encrypted``` y con el método ```String.fromCharCode``` convertimos los valores numericos del array ```codes``` a tipo caracter y lo almacenamos en dicha constante para luego insertarlos en el elemento correspondiente del HTML, lo cual se realiza con la línea ```assingTextElement('.text-message', encrypted);```. 
```js
function encrypt() {
    const textCapture = document.getElementById('text').value;
    const textEncrypt = textCapture;
    
    const codes = [];
    
    for(let i = 0; i < textEncrypt.length; i++) {
        codes.push((textEncrypt.charCodeAt(i) + 3));
    };
    
    const encrypted = String.fromCharCode(...codes);

    clear();

    assingTextElement('.text-message', encrypted);
}
```
- Para la funcionalidad de desencriptar, es prácticamente lo mismo que la función anterior, sólo cambiamos algunos nombres de constantes y en lugar de sumar 3, restamos 3.

- Para la función del botón copiar, utilicé la siguiente función, la cual a través de las dos constantes obtenemos el valor del texto del elemento a copiar, y con el método ```navigator.clipboard.writeText(text);``` colocamos el texto en el portapapeles del sistema operativo, y con eso a podemos pegar en nuestro ```textarea``` la copia:
```js
function copyText() {
    const paragraphCopy = document.querySelector('.textOutput__message .text-message');
    const text = paragraphCopy.textContent;
    navigator.clipboard.writeText(text);
}
```

### Desarrollo continuo

Tengo claro que el desarrollo de ésta aplicación es bastante básica y que puede ser mejorada de diferentes formas para hacerla más eficiente, pero estoy muy satisfecho por lo logrado, ya que me ha servido para practicar lo recibido en cada uno de los cursos, y sobre todo, que me ha motivado a realizar una investigación más amplia sobre aspectos que no tenía muy claro o que no conocía, así como la realización de prueba y error, lo cual cimenta mucho más los conocimientos adquiridos.

El reto que queda es de mejorar el rendimiento de la aplicación y hacer que el código sea más conciso y eficiente para un mejor rendimiento.

## Agradecimientos

Agradezco al programa ONE | Alura Latam por la oportunidad que nos brindan para desarrollarnos en éstas áreas de la tecnología.