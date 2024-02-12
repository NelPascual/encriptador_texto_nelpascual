function assingTextElement(element, text) {
    let elementHTML = document.querySelector(element);
    elementHTML.innerHTML = text;
}

function assingPlaceHolder() {
    document.querySelector('#text').setAttribute('placeholder', 'Ingrese el texto aquí...');
}

function initialConditions() {
    assingTextElement('h1', 'Encriptador de Texto');
    assingTextElement('.indication', 'Puedes escribir texto usando mayúsculas, minúsculas y cualquier caracter especial.');
    assingTextElement('h2', 'Ningún mensaje fue encontrado');
    assingTextElement('.text-message', 'Ingresa el texto que deseas encriptar o desencriptar.');
    assingTextElement('.text1-footer', 'Challenge Encriptador de Texto - ONE | Alura');
    assingTextElement('.text2-footer', 'Desarrollado por <span>Nelson Enrique Pascual Martínez</span> &copy;');
    assingTextElement('.text3-footer', 'El Salvador - Febrero de 2024');
}

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

function decrypt() {
    const textCapture = document.getElementById('text').value;
    const textDecrypt = textCapture;

    const codes = [];

    for(let i = 0; i < textDecrypt.length; i++) {
        codes.push((textDecrypt.charCodeAt(i) - 3));
    };

    const decrypt = String.fromCharCode(...codes);
    
    clear();

    assingTextElement('.text-message', decrypt);
}

function copyText() {
    const paragraphCopy = document.querySelector('.textOutput__message .text-message');
    const text = paragraphCopy.textContent;
    navigator.clipboard.writeText(text);
}

initialConditions();
assingPlaceHolder();