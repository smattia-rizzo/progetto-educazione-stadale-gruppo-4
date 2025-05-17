/**
 * Una classe per gestire l'utente all'interno del sito web
 */
class Utente {
  /**
   * 
   * @param {string} nome Nome Utente
   * @param {Quiz} quizCorrente Quiz effettuato
   */
  constructor(nome, quizCorrente) {
    this.nome = nome;
    this.quizCorrente = quizCorrente;
  }
  /**
   * Ritorna il nome utente
   * @returns {string}
   */
  getNome(){
    return this.nome;
  }
  /**
   * Setta il nome utente
   * @param {*} nome Nome Utente
   */
  setNome(nome){
    this.nome = nome;
  }

  /**
   * Ritorna il Quiz corrente
   * @returns {Quiz}
   */
  getQuizCorrente(){
    return this.quizCorrente;
  }

  /**
   * Setta il Quiz corrente
   * @param {Quiz} quizCorrente 
   */
  setQuizCorrente(quizCorrente){
    this.quizCorrente = quizCorrente;
  }
}

/**
 * Classe per gestire il Quiz del sito web
 */
class Quiz {
  /**
   * Crea il Quiz con le domande e il timer
   * @param {Domanda[]} domande Array di domande
   * @param {Timer} timer Timer
   */
  constructor(domande, timer) {
    this.domande = domande;
    this.timer = timer;
  }

  /**
   * Ritorna la lista di domande per il Quiz
   * @returns {Domanda[]}
   */
  getDomande(){
    return this.domande;
  }
  /**
   * Setta le domande
   * @param {Domanda[]} domande Array di domande
   */
  setDomande(domande){
    this.domande = domande;
  }

  /**
   * Ritorna il Timer del Quiz
   * @returns {Timer}
   */
  getTimer(){
    return this.timer;
  }
  /**
   * Setta il Timer del Quiz
   * @param {Timer} timer Timer
   */
  setTimer(timer){
    this.timer = timer;
  }
}

/**
 * Classe adibita per le domande e la loro logica
 */
class Domanda {
  constructor(testo, img, indice, risposta) {
    this.testo = testo;
    this.img = img;
    this.indice = indice;
    this.risposta = risposta;
    this.rispUtente = null;
  }

  getTesto(){
    return this.testo;
  }
  setTesto(testo){
    this.testo = testo;
  }

  getImg(){
    return this.img;
  }
  setImg(img){
    this.img = img;
  }
  
  getIndice(){
    return this.indice;
  }
  setIndice(indice){
    this.indice = indice;
  }

  getRisposta(){
    return this.risposta;
  }
  setRisposta(risposta){
    this.risposta = risposta;
  }

  getRispUtente(){
    return this.rispUtente;
  }
  setRispUtente(rispUtente){
    this.rispUtente = rispUtente;
  }
}

class Timer {
  constructor(secondi) {
    this.secondi = secondi;
    this.tempoRimasto = secondi;
    this.timerElement = document.getElementById('timer');
    this.aggiornaTimer();
    this.timerInterval = setInterval(this.aggiornaTimer.bind(this), 1000)
  }

  aggiornaTimer() {
    const minuti = Math.floor(this.tempoRimasto / 60);
    const secondi = this.tempoRimasto % 60;

    // Formatta in mm:ss (esempio 05:09)
    this.timerElement.textContent = `Tempo rimasto: ${minuti.toString().padStart(2, '0')}:${secondi.toString().padStart(2, '0')}`;

    if (this.tempoRimasto === 0) {
      clearInterval(this.timerInterval);
      // Tempo scaduto, azioni da fare
      alert('Il tempo è scaduto!');
      // Per esempio puoi bloccare i bottoni o terminare il quiz
      document.getElementById('btnTrue').disabled = true;
      document.getElementById('btnFalse').disabled = true;
    } else {
      this.tempoRimasto--;
    }
    //this.timerInterval = setInterval(this.aggiornaTimer(), 1000);
    //timerInterval = setInterval(aggiornaTimer(), 1000);
  }
}

let timer = null;
const titoloSito = "Educazione Stradale";

/**
 * Funzione per cambiare la pagina in base all'hash dell'url
*/
function cambiaPagina() {
      //Recupero informazioni necessarie per il cambio pagina
      const nome_pagina = location.hash || "#pgHomepage";
      const pagine = document.querySelectorAll(".pagina"); //Seleziona tutti gli elementi pagina

      //Gestione logica del cambio pagina
      pagine.forEach(pagina => {
        pagina.classList.remove("attiva");  //Deseleziona le pagine attualmente attive
        if ("#" + pagina.id === nome_pagina) {
          pagina.classList.add("attiva");   //Rende attiva solamente la pagina selezionata
        }
      });
      
      //Gestione del titolo del Sito
      document.title = titoloSito;
      switch (nome_pagina) {
        case "#pgHomepage":
          document.title += " - Homepage"
          break;
        case "#pg1":
          document.title += " - definizioni-generali-doveri-strada"
          break;
        case "#pg2":
          document.title += " - segnali stradali e di pericolo"
          break;
        case "#pg3":
          document.title += " - limiti di velocità, pericolo e intralcio alla circolazione"
          break;
        case "#pg4":
          document.title += " - esempi di precedenza"
          break;
        case "#pg5":
          document.title += " - arresto, fermata e sosta"
          break;
        case "#pgQuizFinale":
          document.title += " - Quiz Patente"
          break;
      }
      
      //Gestione Timer se la pagina è giusta
      if(location.hash == "#pgQuizFinale"){
        if (timer == null) {
          timer = new Timer(20*60);
        }
    }
  } 

// Pagina al caricamento del documento html
window.addEventListener("load", cambiaPagina);
// Cambia pagina ad ogni cambio dell'id di redirect nell'url
window.addEventListener("hashchange", cambiaPagina);


let domandeSelezionate = [];
let indiceDomandaCorrente = 0;
//cambiare indice corrente in base alla domnada selezionata
//richiamare function mostraDOmanda con l'idece corrente

/**
 * Link raw del GitHub dove prendiamo le informazioni per il quiz
 */
const rawUrlGitHubQuiz = "https://raw.githubusercontent.com/Ed0ardo/QuizPatenteB/refs/heads/main/"

/**
 * @todo Gestione in classi del Quiz e logica del quiz.
 * @todo ProgressBar
 * @todo Randomizzazione della pesca delle domande per il test finale
 * @todo Il Quiz Finale comprenderà tutti gli argomenti trattati, mentre quelli relativi alle pagine solo l'argomento stesso
 */
  fetch(rawUrlGitHubQuiz + "quizPatenteB2023.json")
    .then(response => response.json())
    .then(data => {
      const tutteDomande = [];

      for (const categoria in data) {
        for (const sottoCategoria in data[categoria]) {
          const domande = data[categoria][sottoCategoria];
          if (Array.isArray(domande)) {
            const domandeFiltrate = domande.filter(d => d.q && typeof d.a !== "undefined");
            tutteDomande.push(...domandeFiltrate);
          }
        }
      }

      // Mescola le domande e prendi le prime 30
      domandeSelezionate = tutteDomande.sort(() => 0.5 - Math.random()).slice(0, 30);

      // Mostra la prima domanda
      mostraDomanda(indiceDomandaCorrente);
    })
    .catch(error => {
      console.error('Errore nel caricare il file JSON:', error);
      document.getElementById('questionText').textContent = 'Errore nel caricamento delle domande.';
    });

  function mostraDomanda(indice) {
    if (indice < 0 || indice >= domandeSelezionate.length) return;

    const domanda = domandeSelezionate[indice];
    const img = document.getElementById('questionImage');
    const testo = document.getElementById('questionText');

    testo.textContent = `Domanda ${indice + 1}: ${domanda.q}`;
    
    if (domanda.img) {
      img.src = rawUrlGitHubQuiz + domanda.img;
      img.style.maxHeight = "400px"
      img.style.display = 'block';
      img.alt = 'Immagine domanda';
    } else {
      img.style.display = 'none'; // Nasconde immagine se non presente
    }
  }

  // Event listeners per i bottoni
  document.getElementById('btnTrue').addEventListener('click', () => {
    // Qui puoi eventualmente gestire la risposta "Vero" (domanda[indice].a)
    // Per ora solo passo alla domanda successiva
    nextQuestion();
  });

  document.getElementById('btnFalse').addEventListener('click', () => {
    // Qui puoi eventualmente gestire la risposta "Falso"
    nextQuestion();
  });

  function nextQuestion() {
    indiceDomandaCorrente++;
    if (indiceDomandaCorrente >= domandeSelezionate.length) {
      // Fine quiz, puoi mostrare un messaggio o resettare
      alert('Hai completato il quiz!');
      indiceDomandaCorrente = 0; // Torna alla prima domanda (opzionale)
    }
    mostraDomanda(indiceDomandaCorrente);
  }