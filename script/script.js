

//SEZIONE: Gestione cambio pagina

/**
 * Funzione per cambiare pagina
 * @returns {void}
 */
function cambiaPagina() {
  const nome_pagina = location.hash || "#pgHomepage"; // Prende il nome della pagina dall'URL hash
  let  pagine = document.querySelectorAll(".pagina"); // Tutte le sezioni "pagina"

  // Nasconde tutte le pagine e mostra solo quella richiesta
  pagine.forEach(pagina => {
    pagina.classList.remove("attiva");
    if ("#" + pagina.id === nome_pagina) {
      pagina.classList.add("attiva");
    }
  });

  // Cambia il titolo del sito a seconda della pagina e avvia il Quiz nella pagina del Quiz
  document.title = titoloSito;
  switch (nome_pagina) {
    case "#pgHomepage":
      document.title += " - Homepage";
      break;
    case "#pg1":
      document.title += " - definizioni-generali-doveri-strada";
      break;
    case "#pg2":
      document.title += " - segnali stradali e di pericolo";
      break;
    case "#pg3":
      document.title += " - limiti di velocità, pericolo e intralcio alla circolazione";
      break;
    case "#pg4":
      document.title += " - esempi di precedenza";
      break;
    case "#pg5":
      document.title += " - arresto, fermata e sosta";
      break;
    case "#pgQuizFinale":
      document.title += " - Quiz Patente";
      // Avvia quiz se non è già stato fatto
      if(utenteCorrente == null) {
        Quiz.generaNuovoQuiz();
      } else if (utenteCorrente.getQuizCorrente() == null) {
        Quiz.generaNuovoQuiz();
      }
      break;
  }
}

//Collegamento con gli EventListener
window.addEventListener("load", cambiaPagina);
window.addEventListener("hashchange", cambiaPagina);







//SEZIONE: Variabili

//Variabili statiche
const titoloSito = "Educazione Stradale";

/**
 * La variabile che esprime l'utente corrente
 * @type {Utente}
 */
let utenteCorrente = null;





//EventListener per il bottone btnRicomincia, indipendente dalla classe istanziata
document.getElementById("btnRicomincia").addEventListener("click", () => {
  Quiz.generaNuovoQuiz();
})

