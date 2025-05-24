//SEZIONE: Richiesta alla API di Wikipedia

function richiestaAPIWikipedia(url, idTesto){
   fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(url)) //Usiamo una API Proxy per evitare problemi derivati da CORS
    .then(response => response.json())
    .then(data => JSON.parse(data.contents))
    .then(data => {
      let pagine = data.query.pages;
      let testo = pagine[Object.keys(pagine)[0]].extract;
      //console.log(encodeURIComponent(url), pagine)
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
      await new Promise(resolve => setTimeout(resolve, 1500));  //Funzione per non sovraccaricare le richieste
    });
  })