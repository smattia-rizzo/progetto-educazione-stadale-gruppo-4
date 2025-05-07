function clear(){
    document.getElementById("pg1").style.display = "none";
    document.getElementById("pg2").style.display = "none";
    document.getElementById("pg3").style.display = "none";
    document.getElementById("pg4").style.display = "none";
    document.getElementById("pg5").style.display = "none";
    document.getElementById("pg6").style.display = "none";

  }

  document.getElementById("btn1").addEventListener("click", function(){
    clear();
    document.getElementById("pg1").style.display = "block";
  })

  document.getElementById("btn2").addEventListener("click", function(){
    clear();
    document.getElementById("pg2").style.display = "block";
  })

  document.getElementById("btn3").addEventListener("click", function(){
    clear();
    document.getElementById("pg3").style.display = "block";
  })

  document.getElementById("btn4").addEventListener("click", function(){
    clear();
    document.getElementById("pg4").style.display = "block";
  })

  document.getElementById("btn5").addEventListener("click", function(){
    clear();
    document.getElementById("pg5").style.display = "block";
  })

  document.getElementById("btn6").addEventListener("click", function(){
    clear();
    document.getElementById("pg6").style.display = "block";
  })