class Quiz {
  constructor() {
      let argomenti = {
        "alcool-droga-primo-soccorso" : ["arg1", "arg2", "arg3"],
      }
  }

  getArgomenti(){
    return this.argomenti;
  }
}

//nuova gestione cambio pagina
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



//Prova per il Quiz sul Json
fetch('./quiz/quizPatenteB2023.json')
  .then(response => response.json())  // Converte la risposta in JSON
  .then(data => {
    console.log(data);
    // Verifica se 'data' è definito e se contiene 'definizioni-generali-doveri-strada'
    if (data && data["definizioni-generali-doveri-strada"]) {
      const domandaRisposte = data["definizioni-generali-doveri-strada"]["carreggiata-doppio-senso"];
      domandaRisposte.forEach(item => {
        console.log(`Domanda: ${item.q}`);
        console.log(`Risposta: ${item.a}`);
      });
      
      const keys = Object.keys(data);
      const keys2 = Object.keys(data[keys[0]]);
      console.log(keys[0]);
      console.log(keys2);
    } else {
      console.error("La proprietà 'definizioni-generali-doveri-strada' non è stata trovata nel file JSON.");
    }
  })
  .catch(error => {
    console.error('Errore nel caricare il file JSON:', error);
  });