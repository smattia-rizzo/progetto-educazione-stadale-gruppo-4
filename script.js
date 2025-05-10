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

function clear(){
  document.getElementById("pg0").style.display = "none";
  document.getElementById("pg1").style.display = "none";
  document.getElementById("pg2").style.display = "none";
  document.getElementById("pg3").style.display = "none";
  document.getElementById("pg4").style.display = "none";
  document.getElementById("pg5").style.display = "none";
  document.getElementById("pg6").style.display = "none";

}


//Pagina 1
function pg1() {
  clear();
  document.getElementById("pg1").style.display = "block";
}

document.getElementById("btn1").addEventListener("click", function(){
  pg1();
})
document.getElementById("indice1").addEventListener("click", function(){
  pg1();
})


//Pagina 2
function pg2() {
  clear();
  document.getElementById("pg2").style.display = "block";
}
document.getElementById("btn2").addEventListener("click", function(){
  pg2();
})
document.getElementById("indice2").addEventListener("click", function(){
  pg2();
})


//Pagina 3
function pg3() {
  clear();
  document.getElementById("pg3").style.display = "block";
}
document.getElementById("btn3").addEventListener("click", function(){
  pg3();
})
document.getElementById("indice3").addEventListener("click", function(){
  pg3();
})


//Pagina 4
function pg4() {
  clear();
  document.getElementById("pg4").style.display = "block";
}
document.getElementById("btn4").addEventListener("click", function(){
  pg4();
})
document.getElementById("indice4").addEventListener("click", function(){
  pg4();
})


//Pagina 5
function pg5() {
  clear();
  document.getElementById("pg5").style.display = "block";
}
document.getElementById("btn5").addEventListener("click", function(){
  pg5();
})
document.getElementById("indice5").addEventListener("click", function(){
  pg5();
})


//Pagina 6
function pg6() {
  clear();
  document.getElementById("pg6").style.display = "block";
}
document.getElementById("btn6").addEventListener("click", function(){
  pg6();
})
document.getElementById("indice6").addEventListener("click", function(){
  pg6();
})

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