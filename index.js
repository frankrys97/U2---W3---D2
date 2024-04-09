// let users = []; l'array sarebbe potuto essere utile nel caso in cui gli user fossero stati
// molti di più e quindi avevamo bisogno di un contenitore in cui salvare i dati

// Prendo attraverso il dom tutti i nodi di nostro interesse
const form = document.querySelector("form");
const inputUsername = document.querySelector("#inputUsername");
const cancelBtn = document.querySelector("#cancelBtn");

// Applico sul nodo form un eventi di tipo subit che mi permetterà di triggerare il form
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Per fare in modo che il form non refreshi da solo la pagina

  // Dichiariamo una costante dove salviamo il valore testuale dell'input del nostro form
  const username = inputUsername.value;

  //   users.push(username); Passaggio possibile ma in questo caso non necessario

  // Salviamo la variabile contenente il valore testuale dell'input nel localStorage
  localStorage.setItem("user", username);

  // Richiamo al nodo soprastante all'input
  // con cui gli aggiungiamo il valore nel localStorage ogni volta che viene cambiato il log
  userMemory.innerHTML = `Sei loggato come ${username}`;

  form.reset(); // Per resettare il form
});

// Applichiamo al bottone di tipo button un evento di tipo click che ci permetterà di rimuovere
// il nome utente del localStorage

cancelBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  userMemory.innerHTML = ""; // Per rimuovere il contenuto dell'h3
  form.reset(); // Per resettare il form
});

// Prendo attraverso il metodo getItem il valore salvato nel localStorage
// questo valore non ha bisogno di un JSON stringify quando lo andiamo a salvare
// e nemmeno di un parse quando lo andiamo a prendere, poichè essendo esso
// proprio una stringa non ha bisogno di conversione
const savedUser = localStorage.getItem("user");

// Nodo che si riferisce all'h3 sopra al nostro input
const userMemory = document.querySelector("#userMemory");

// Per mostrare il contenuto del localStorage all'h3 sopra al nostro input
// ad ogni avvio della pagina e per far partire il contatore

window.addEventListener("DOMContentLoaded", () => {
    startCounter();
  if (savedUser) {
    userMemory.innerHTML = `Sei loggato come ${savedUser}`;
  }

});

// Esercizio 2:
// creazione di un counter che riparta da 0 ogni volta che la sessioneStorage finisce oppure
// riprenda il dato anche al refresh della pagina

// Riprendo il nodo in cui andremo ad inserire il nostro contatore
const counter = document.getElementById("counter");

// Creo una funzione che conta il tempo
const startCounter = () => {
  let sessionTime = sessionStorage.getItem("count"); // Prendo il valore dal session storage

  let count = null; // Imposto il counter come valore nullo

  // Imposto una condizione che mi permette di dire che se abbiamo un valore nella sessione
  // storage allora lo assegno al contatore, altrimenti lo inizializzo a 0
  if (sessionTime) {
    count = parseInt(sessionTime);
  } else {
    count = 0;
  }

  // Creo una funzione setInterval che ad ogni 1000 millisecondi, quindi un secondo,
  // incrementa il contatore e lo salva in session storage
  const interval = setInterval(() => {
    count++;
    sessionStorage.setItem("count", count);

    // Infine dico che il valore testuale del mio contenitore counter corrisponde alla formattazione
    // del tempo attraverso il richiamo della funzione che prende come paramentro proprio il tempo
    // totale

    counter.innerHTML = formatCount(count);
  }, 1000);
};

// Creo una funzione che formatta il tempo in ore, minuti  e secondi
const formatCount = (count) => {
  // Divido il contatore per il numero di secondi in un'ora ovvero 3600
  const hours = Math.floor(count / 3600);
  // Divido il resto della divisione tra i secondi ed i secondi in un'ora e la divido per
  // i secondi in un minuto, ovvero 60
  const minutes = Math.floor((count % 3600) / 60);

  // Per ottenre i secondi prendo il resto tra il tempo totale e i secondi in un minuto
  const seconds = count % 60;

  // Ritorno un template literal con il tempo formattato attraverso il metodo delle stringhe
  // padStart per inserire degli 0 all'inizio se il tempo è minore di 10
  // il metodo padStart accetta due valori, il primo corrisponde al numero di elementi che si
  // voglio avere nella stringa ed il secondo il valore da aggiungere qualora servisse per
  // raggiungere il numero desiderato
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};


