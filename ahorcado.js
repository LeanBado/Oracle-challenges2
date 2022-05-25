const wordE1 = document.getElementById("word");
const wrongLettersE1 = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts= document.querySelectorAll(".figure-part");
const addword = document.getElementById ("addword");
const btnañadir = document.getElementById ("botonañadir");
const btnotrapalabra = document.getElementById ("otrapalabra");
const btnletra = document.getElementById ("btn-letter");
let boolrepetida= false;



var words = ["HARDWARE","JAVASCRIPT", "SOFTWARE", "REACT", "BACKEND", "FRONTEND", "LINUX", "MICROSOFT"];



var selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//va muestrando la palabra escondida - elegida, de a letras, una vez que se completa, la mustra toda junta en un cartel
function displayWord(){
    wordE1.innerHTML = `
    ${selectedWord
    .split("")
    .map(
        letter =>`
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ""}
        </span>
        `
    )
    .join("")}
    `;

    const innerWord = wordE1.innerText.replace(/\n/g, "");

    if(innerWord === selectedWord){
        finalMessage.innerText = "GANASTE, la palabra era " + " "+selectedWord+"";
        popup.style.display= "flex";
    }
}

//actualiza las letras equivocadas, una vez que se alcanza a formar el cuerpo del ahorcado, tira cartel de PERDISTE
function updateWrongLetterE1(){
    //con esto se muestra en la pagina las palabras que se van eligiendo y son equivocadas
    wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //muestra el cuerpo del ahorcado
    figureParts.forEach((part,index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = "block"
        }
        else{
            part.style.display = "none";
        }
    });

    
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = "PERDISTE, la palabra era "+ " "+ selectedWord+"";
        popup.style.display = "flex";
    }
}

//lógica de cartel de notificación
function showNotification(){
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 2000);
}

/* lógica de cuando se apreta una tecla del teclado (sólo permite el abecedario), la pasa a mayuscula y la compara con las letras de la palabra
elegida al azar*/

function functionletter () {

    if (boolrepetida === false) {
    window.addEventListener("keydown", e =>{
        if(e.keyCode >= 65 && e.keyCode <=90){
            var letter = e.key;
            letter = letter.toUpperCase ();
    
            if(selectedWord.includes(letter)){
                if(!correctLetters.includes(letter)){
                    correctLetters.push(letter);
    
                    displayWord();
                } else{
                    showNotification();
                }
            } else{
                if(!wrongLetters.includes(letter)){
                    wrongLetters.push(letter);
    
                    updateWrongLetterE1();
                } else{
                    showNotification();
                }
            }
        }
    });
    }
    boolrepetida = true;

}




//reinicia juego
playAgainBtn.addEventListener("click", () => {
    //limpia los arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLetterE1();

    popup.style.display = "none";
});

displayWord();

function añadirpalabra() {
    var addword2 = document.getElementById("addword").value;
    addword2 = addword2.toUpperCase();
    if (addword2 !== "") {
        words.push(addword2);
    }
}
function otrapalabra(){
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord()
}