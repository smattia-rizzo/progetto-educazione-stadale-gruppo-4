/**
 * Classe per gestire l'utente
 */
class Utente {
  /**
   * Costruttore per un Utente
   * @param {string} nome Nome dell'utente
   * @param {Quiz} quizCorrente Istanza del quiz che sta affrontando
   */
  constructor(nome, quizCorrente) {
    this.nome = nome;
    this.quizCorrente = quizCorrente;
  }

  // Getter e setter per nome e quizCorrente
  getNome() { return this.nome; }
  setNome(nome) { this.nome = nome; }
  getQuizCorrente() { return this.quizCorrente; }
  setQuizCorrente(quizCorrente) { this.quizCorrente = quizCorrente; }
}

/**
 * Classe per rappresentare un quiz
 */
class Quiz {
  /**
   * Costruttore per un Quiz
   * @param {Domanda[]} domande Lista delle domande
   * @param {Timer} timer Istanza del Timer
   */
  constructor(domande, timer) {
    this.domande = domande; // Array delle 30 domande casuali
    this.timer = timer;
    this.indiceDomandaCorrente = 0; // Indice della domanda attuale

    //Bindo gli eventListener ai bottoni
    //P.S. Rimpiazzo i bottoni con una loro coppia per evitare doppi riferimenti di EventListener

    // Pulsante "domandaSucc"
    let vecchio = document.getElementById("domandaSucc");
    let clonato = vecchio.cloneNode(true);
    vecchio.parentNode.replaceChild(clonato, vecchio);
    clonato.addEventListener("click", () => {
      this.nextQuestion();
    });

    // Pulsante "domandaPrec"
    vecchio = document.getElementById("domandaPrec");
    clonato = vecchio.cloneNode(true);
    vecchio.parentNode.replaceChild(clonato, vecchio);
    clonato.addEventListener("click", () => {
      this.previousQuestion();
    });

    // Pulsante "btnTrue"
    vecchio = document.getElementById("btnTrue");
    clonato = vecchio.cloneNode(true);
    vecchio.parentNode.replaceChild(clonato, vecchio);
    clonato.addEventListener("click", () => {
      this.getDomande()[this.indiceDomandaCorrente].setRispUtente(true);
      this.nextQuestion();
    });

    // Pulsante "btnFalse"
    vecchio = document.getElementById("btnFalse");
    clonato = vecchio.cloneNode(true);
    vecchio.parentNode.replaceChild(clonato, vecchio);
    clonato.addEventListener("click", () => {
      this.getDomande()[this.indiceDomandaCorrente].setRispUtente(false);;
      this.nextQuestion();
    });
    
  }

  // Getter e setter per domande e timer
  getDomande() { return this.domande; }
  setDomande(domande) { this.domande = domande; }
  getTimer() { return this.timer; }
  setTimer(timer) { this.timer = timer; }

  //Metodi

  /**
   * Crea un nuovo quiz e sostituisce quello esistente se presente
   */
  static generaNuovoQuiz() {
    //controllo se timer esiste
    if (utenteCorrente != null) {
      if (utenteCorrente.getQuizCorrente() != null) {
        if (utenteCorrente.getQuizCorrente().getTimer() && utenteCorrente.getQuizCorrente().getTimer().getTimerInterval()) {
          clearInterval(utenteCorrente.getQuizCorrente().getTimer().getTimerInterval());
        }
      }
    }

    document.getElementById("domandaPrec").style.display = "block";
    document.getElementById("domandaSucc").style.display = "block";

    // Nascondi risultati e mostra quiz
    document.getElementById('quizResultsContainer').classList.add('d-none');
    document.querySelector('#pgQuizFinale .card').classList.remove('d-none');
    document.querySelector('#pgQuizFinale .d-flex.justify-content-between').classList.remove('d-none');

    // Disabilita bottoni durante il caricamento
    document.getElementById('btnTrue').disabled = true;
    document.getElementById('btnFalse').disabled = true;

    // Carica le domande
    fetch(rawUrlGitHubQuiz + "quizPatenteB2023.json")
        .then(response => response.json())
        .then(data => {
            const tutteDomande = [];
            
            for (const categoria in data) {
                for (const sottoCategoria in data[categoria]) {
                    const domande = data[categoria][sottoCategoria];
                    if (Array.isArray(domande)) {
                        tutteDomande.push(...domande.filter(d => d.q && typeof d.a !== "undefined")
                            .map(d => new Domanda(d.q, d.img, d.id, d.a)));
                    }
                }
            }
            
            //estraggo un numero casuale positivo o negativo, e ordina la lista in base all'ordine di quei numeri estratti
            //poi prendo le prime 30 domande
            let domandeSelezionate = tutteDomande.sort(() => 0.5 - Math.random()).slice(0, 30);
            
            // Inizializzazione Timer e Quiz
            utenteCorrente = new Utente("Ospite", new Quiz(domandeSelezionate, new Timer(20 * 60)));

            // Resetta la progress bar
            document.getElementById('quizProgress').style.width = '0%';
            document.getElementById('quizProgress').classList.remove('bg-warning', 'bg-danger');
            document.getElementById('quizProgress').classList.add('bg-success');

            // Mostra la prima domanda e abilita bottoni
            utenteCorrente.getQuizCorrente().mostraDomanda(0);
            document.getElementById('btnTrue').disabled = false;
            document.getElementById('btnFalse').disabled = false;
        })
        //qui catturo gli errori restituiti nel caso non sia possibile effettiare un fetch sull'URL inserito
        .catch(error => {
            console.error('Errore nel caricare il file JSON:', error);
            document.getElementById('questionText').textContent = 'Errore nel caricamento delle domande.';
        });
  }
  /**
   * Aggiorna i progressi nella progress bar
   * @returns {void}
   */
  updateProgressBar() {
    //numero domanda / 30 * 100
    const progress = ((this.indiceDomandaCorrente + 1) / this.domande.length) * 100;
    const progressBar = document.getElementById('quizProgress');
    
    progressBar.style.width = `${progress}%`;
    progressBar.innerHTML = `${this.indiceDomandaCorrente + 1}/${this.domande.length}`
  }

  /**
   * Mostra la domanda ad un indice
   * @param {*} indice indice scelto
   * @returns {void}
   */
  mostraDomanda(indice) {
    if (indice < 0 || indice >= this.domande.length) return;

    const domanda = this.domande[indice];
    const img = document.getElementById('questionImage');
    const testo = document.getElementById('questionText');

    document.getElementById('questionCounter').textContent = 
      `Domanda ${indice + 1} di ${this.domande.length}`;
    testo.textContent = domanda.getTesto();

    //se la domanda esiste la rendo visibile
    if (domanda.getImg()) {
      img.src = rawUrlGitHubQuiz + domanda.getImg();
      img.style.display = 'block';
    } else {
      img.style.display = 'none';
    }
    
    this.updateProgressBar();
  }

  /**
   * Mostra la prossima domanda
   * @returns {void}
   */
  nextQuestion() {
    
    this.indiceDomandaCorrente++;
    
    if (this.indiceDomandaCorrente >= this.domande.length) {
      this.showQuizResults();
    } else {
      this.mostraDomanda(this.indiceDomandaCorrente);
    }
  }

  /**
   * Mostra la domanda precedente
   * @returns {void}
   */
  previousQuestion() {
    if (this.indiceDomandaCorrente > 0) {
      this.indiceDomandaCorrente--;
      this.mostraDomanda(this.indiceDomandaCorrente);
    }
  }
  
  /**
   * Metodo per mostrare i risultati delle domande del Quiz
   * @returns {void}
   */
  showQuizResults() {
    let correctAnswers = 0;
    this.domande.forEach(domanda => {
      if (domanda.getRispUtente() == domanda.getRisposta()) {
        correctAnswers += 1;
      }
    });
    const errori = this.domande.length - correctAnswers;
    const isPassato = errori <= 3;

    // Nascondi elementi del quiz
    document.querySelector('#pgQuizFinale .card').classList.add('d-none');
    document.querySelector('#pgQuizFinale .d-flex.justify-content-between').classList.add('d-none');
    document.getElementById("domandaPrec").style.display = "none";
    document.getElementById("domandaSucc").style.display = "none";
    
    // Mostra container risultati
    const resultsContainer = document.getElementById('quizResultsContainer');
    resultsContainer.classList.remove('d-none');
    
    // Aggiorna stato passaggio
    const passStatus = document.getElementById('passStatus');
    passStatus.innerHTML = `
        <h4 class="alert-heading">${isPassato ? '🎉 Complimenti! Sei passato!' : '❌ Riprova!'}</h4>
        <p>Risposte corrette: <strong>${correctAnswers}</strong><br>
        Errori commessi: <strong>${errori}</strong></p>
    `;
    passStatus.classList.remove('alert-danger', 'alert-success');
    passStatus.classList.add(isPassato ? 'alert-success' : 'alert-danger');

    // Genera lista domande
    const questionsList = document.getElementById('questionsList');
    questionsList.innerHTML = '';
    
    this.domande.forEach((domanda, index) => {
      const isCorrect = domanda.getRispUtente() === domanda.getRisposta();
      const questionElement = document.createElement('div');
      questionElement.className = `list-group-item ${isCorrect ? 'list-group-item-success' : 'list-group-item-danger'}`;
      questionElement.innerHTML = `
          <div class="d-flex justify-content-between align-items-center">
              <div>
                  <h5 class="mb-1">Domanda ${index + 1}</h5>
                  <p class="mb-1">${domanda.getTesto()}</p>
                  <small>La tua risposta: ${domanda.getRispUtente() != null ? (domanda.getRispUtente() ? "Vero" : "Falso" ): 'Non Data'} - 
                          Risposta corretta: ${domanda.getRisposta() ? 'Vero' : 'Falso'}</small>
              </div>
              <span class="badge ${isCorrect ? 'bg-success' : 'bg-danger'} rounded-pill">
                  ${isCorrect ? '✓' : '✗'}
              </span>
          </div>
      `;
      questionsList.appendChild(questionElement);
    });
  }
}

/**
 * Classe per rappresentare una domanda
 */
class Domanda {
  /**
   * Costrutture di una domanda
   * @param {string} testo Testo della domanda
   * @param {string} img Percorso dell'immagine associata
   * @param {int} indice ID univoco o indice della domanda
   * @param {boolean} risposta Risposta corretta (booleano)
   */
  constructor(testo, img, indice, risposta) {
    this.testo = testo;
    this.img = img;
    this.indice = indice;
    this.risposta = risposta;
    this.rispUtente = null;       // Risposta data dall'utente (inizialmente nulla)
  }

  // Getter e setter per tutti gli attributi
  getTesto() { return this.testo; }
  setTesto(testo) { this.testo = testo; }
  getImg() { return this.img; }
  setImg(img) { this.img = img; }
  getIndice() { return this.indice; }
  setIndice(indice) { this.indice = indice; }
  getRisposta() { return this.risposta; }
  setRisposta(risposta) { this.risposta = risposta; }
  getRispUtente() { return this.rispUtente; }
  setRispUtente(rispUtente) { this.rispUtente = rispUtente; }
}

/**
 * Classe per gestire il timer
 */
class Timer {
  /**
   * Costruttore della classe Timer
   * @param {int} secondi Secondi totali impostati
   */
  constructor(secondi) {
    this.secondi = secondi;
    this.tempoRimasto = secondi;          // Tempo rimasto
    this.timerElement = document.getElementById('timer'); // Elemento HTML del timer
    this.timerInterval = setInterval(this.aggiornaTimer.bind(this), 1000); // Timer aggiornato ogni secondo
    this.aggiornaTimer(); //Sincronizzazione del Testo 
  }

  /**
   * Metodo per aggiornare visivamente il timer e gestire la fine del tempo
   * @returns {void}
   */
  aggiornaTimer() {
    const minuti = Math.floor(this.tempoRimasto / 60);
    const secondi = this.tempoRimasto % 60;
    this.timerElement.textContent = `Tempo rimasto: ${minuti.toString().padStart(2, '0')}:${secondi.toString().padStart(2, '0')}`;

    if (this.tempoRimasto === 0) {
      clearInterval(this.timerInterval); // Ferma il timer
      document.getElementById('btnTrue').disabled = true;
      document.getElementById('btnFalse').disabled = true;
      alert('Il tempo è scaduto!');
      utenteCorrente.getQuizCorrente().showQuizResults();
    } else {
      this.tempoRimasto--;
    }
  }
  getTimerInterval() { return this.timerInterval; }
}

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

//SEZIONE: Richiesta alla API di Wikipedia

function richiestaAPIWikipedia(url, idTesto){
   fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(url))
    .then(response => response.json())
    .then(data => JSON.parse(data.contents))
    .then(data => {
      let pagine = data.query.pages;
      let testo = pagine[Object.keys(pagine)[0]].extract;
      console.log(encodeURIComponent(url), pagine)
      let definizione = testo.split("\n")[0]; // prima riga
      document.getElementById(idTesto).innerHTML = definizione;
    })
}

//Argomenti
fetch("pagine//pagina1_argomenti.json")
  .then(response => response.json())
  .then(data => {
    data.forEach(async argomento => {
      
      richiestaAPIWikipedia(`https://it.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=true&redirects=1&titles=${argomento.titolo_argomento}&format=json`, argomento.id_componente)
      await new Promise(resolve => setTimeout(resolve, 1000));  //Funzione per non sovraccaricare le richieste
    });
  })





//SEZIONE: Variabili

//Variabili statiche
const titoloSito = "Educazione Stradale";
const rawUrlGitHubQuiz = "https://raw.githubusercontent.com/Ed0ardo/QuizPatenteB/refs/heads/main/"

/**
 * La variabile che esprime l'utente corrente
 * @type {Utente}
 */
let utenteCorrente = null;





//EventListener per il bottone btnRicomincia, indipendente dalla classe istanziata
document.getElementById("btnRicomincia").addEventListener("click", () => {
  Quiz.generaNuovoQuiz();
})

