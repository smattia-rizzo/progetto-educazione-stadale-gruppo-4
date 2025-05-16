/**
 * Funzione per cambiare la pagina in base all'hash dell'url
 */
function cambiaPagina() {
      const nome_pagina = location.hash || "#pg0";
      const pagine = document.querySelectorAll(".pagina"); //Seleziona tutti gli elementi pagina

      pagine.forEach(pagina => {
        pagina.classList.remove("attiva");  //Deseleziona le pagine attualmente attive
        if ("#" + pagina.id === nome_pagina) {
          pagina.classList.add("attiva");   //Rende attiva solamente la pagina selezionata
        }
      });
    }

// Pagina al caricamento del documento html
window.addEventListener("load", cambiaPagina);
// Cambia pagina ad ogni cambio dell'id di redirect nell'url
window.addEventListener("hashchange", cambiaPagina);


let domandeSelezionate = [];
let indiceDomandaCorrente = 0;
/**
 * Link raw del GitHub dove prendiamo le informazioni per il quiz
 */
const rawUrlGitHubQuiz = "https://raw.githubusercontent.com/Ed0ardo/QuizPatenteB/refs/heads/main/"

/**
 * @todo Gestione in classi del Quiz e logica del quiz.
 * @todo ProgressBar
 * @todo Randomizzazione della pesca delle domande per il test finale
 * @todo Il Quiz Finale comprenderà tutti gli argomenti trattati, mentre quelli relativi alle pagine solo l'argomento stesso
 * @error Il Quiz viene avviato al caricamento generale invece del caricamento del div relativo al quiz
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

      const durataTimer = 20 * 60; // 20 minuti in secondi
      let tempoRimasto = durataTimer;

      const timerElement = document.getElementById('timer');

      function aggiornaTimer() {
        const minuti = Math.floor(tempoRimasto / 60);
        const secondi = tempoRimasto % 60;

        // Formatta in mm:ss (esempio 05:09)
        timerElement.textContent = `Tempo rimasto: ${minuti.toString().padStart(2, '0')}:${secondi.toString().padStart(2, '0')}`;

        if (tempoRimasto === 0) {
          clearInterval(timerInterval);
          // Tempo scaduto, azioni da fare
          alert('Il tempo è scaduto!');
          // Per esempio puoi bloccare i bottoni o terminare il quiz
          document.getElementById('btnTrue').disabled = true;
          document.getElementById('btnFalse').disabled = true;
        } else {
          tempoRimasto--;
        }
      }

      const timerInterval = setInterval(aggiornaTimer, 1000);

      // Avvia subito l'aggiornamento per mostrare subito 20:00 (invece di 19:59)
      aggiornaTimer();


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