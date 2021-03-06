var maxIntentos;
var intentos = 0;
var pares = 0;

$('#easy').on('click', function(){
  if ($("#name").val() == ""){
    var required = $('#required');
    required.removeClass("hidden");
  } else {
      $('.board').removeClass('hidden')
      $('.first').addClass('hidden')
      var name = $('#name').val();
      $('#required').append(name);
      $('#repeatname').append(name);
      maxIntentos = 18;
      $('#totallifes').append(maxIntentos);
      var level = 'Fácil';
      $('#level').append(level);
  }
})
  
$('#intermediate').on('click', function(){
  if ($("#name").val() == ""){
    var required = $('#required');
    required.removeClass("hidden");
  } else {
    $('.board').removeClass('hidden')
    $('.first').addClass('hidden')
    var name = $('#name').val();
    $('#required').append(name);
    $('#repeatname').append(name);
    maxIntentos = 12;
    $('#totallifes').append(maxIntentos);
    var level = 'Intermedio';
    $('#level').append(level);
  }
})
  
$('#hard').on('click', function(){
  if ($("#name").val() == ""){
    var required = $('#required');
    required.removeClass("hidden");
  } else {
    $('.board').removeClass('hidden')
    $('.first').addClass('hidden')
    var name = $('#name').val();
    $('#required').append(name);
    $('#repeatname').append(name);
    maxIntentos = 9;
    $('#totallifes').append(maxIntentos);
    var level = 'Difícil';
    $('#level').append(level);
  }
})

var divContainer = $('#cardscontainer');
var cards = [
  {id: 1, dataid:"1", img: './img/mano.jpg'},
  {id: 2, dataid:"2", img: './img/lagrimas.jpg'},
  {id: 3, dataid:"3", img: './img/molotov.jpg'},
  {id: 4, dataid:"4", img: './img/miso.jpg'},
  {id: 5, dataid:"5", img: './img/boca.jpg'},
  {id: 6, dataid:"6", img: './img/llave.jpg'},
  {id: 7, dataid:"1", img: './img/mano.jpg'},
  {id: 8, dataid:"2", img: './img/lagrimas.jpg'},
  {id: 9, dataid:"3", img: './img/molotov.jpg'},
  {id: 10, dataid:"4", img: './img/miso.jpg'},
  {id: 11, dataid:"5", img: './img/boca.jpg'},
  {id: 12, dataid:"6", img: './img/llave.jpg'},
];

const desordenado = shuffle(cards)

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

$('img').on('click', function(e) {
  const imgId = e.target.id
  const id = $('#' + imgId).attr('data-id')
  $('#' + imgId).attr('src', desordenado[id - 1])
})

// generar el tablero
function setBoard(){
for ( i = 0; i < cards.length; i++) {
  let cardImg = cards[i].img;    
  var CardDiv = $('<div class="card"><span><img data-id="'+cards[i].dataid+'"id="'+cards[i].id+'" src="'+cards[i].img+'"></span></div>');
  $('.boardcard').append(CardDiv);
  } 
}

// contador de clicks de 0 a 2 para cada jugada
var clicks = 0;
var primerClick

function jugada(){ 
  // funcion seleccionar y comparar
  $(".card").on('click', function (){
     clicks = clicks + 1
     
     $(this).toggleClass('flipped');
     $(this).addClass('show');
      
      if (intentos >= maxIntentos) {
        $('#finalModal').removeClass('hidden')
        $('#gameover').removeClass('hidden')
        var lost = $('<span id="loser">' + intentos + '</span>');
        $('#loser').html(lost);
      } else if (clicks == 1 ) {
      // Primer click que guarda datos
          var id = $(this).children().children().attr('id')
          var dataId = $(this).children().children().attr('data-id')
          primerClick = {
            id: id,
            dataId: dataId
          }
        } else {
          // Si no es el primer click ya puede comparar
          // si son iguales
           dataId = $(this).children().children().attr('data-id')
          
          if (primerClick.dataId == dataId ) {
              setTimeout(function(){
              $('#correct').removeClass('hidden');
              },150);
              $('#' + primerClick.id).addClass('gray');
              $(this).children().children().addClass('gray');
              setTimeout(function(){
                $('#correct').addClass('hidden');
                },2000);
              pares++
              if (pares == 6){
                $('#finalModal').removeClass('hidden')
                $('#winner').removeClass('hidden')
                var win = $('<span id="win">' + intentos + '</span>');
                $('#win').html(win);
                guardarJugador();
                armarRanking();
              }
          } else {
            setTimeout(function(){
              $('#wrong').removeClass('hidden');
              },150);
              var that = this
              // si no son iguales son distintas
              setTimeout(function(){
              // se dan vuelta las cartas del primer click
              $('#'+ primerClick.id).parent().parent().removeClass('show flipped')
              // se dan vuelta las cartas del segundo click
              $(that).removeClass('show flipped') },1500);
              setTimeout(function(){
                $('#wrong').addClass('hidden');
                },1500);
              intentos++
              }
              clicks = 0
      }
      var lifes = $('<span id="lifes">' + intentos + '</span>');
      $('#lifes').html(lifes);   
    })   
}

$('.close').on('click', function(){
  $('#finalModal').addClass('hidden')
  $('#gameover').addClass('hidden')
  $('#winner').addClass('hidden')
})

$('.retry').on('click', function(){
  window.location.reload(true);
})

 function guardarJugador() {
    var winners = [];
    var jugador = {
        name: $("#name").val(),
        level: $("#level").html(),
        intentos: $("#win").html()
    }
    var data = localStorage.getItem('winners') //null
    if (data == null) {
        data = []
    } else {
      data = JSON.parse(data)
      }
    data.push(jugador);  
    localStorage.setItem('winners', JSON.stringify(data))
}

function armarTabla() {
  var tablaJugadores = $('<table id="tablaRanking"></table>')
  var cabecera = '<th>Nombre</th><th>Nivel</th><th>Intentos</th>'
  tablaJugadores.append(cabecera)
  var container = $('.scores');
  container.append(tablaJugadores);
}

 function armarRanking() {
  var infoPlayer = JSON.parse(localStorage.getItem('winners'));
  var tablaJugadores = $('#tablaRanking');
  for (var i = 0; i < infoPlayer.length; i++) {
    var namedata = "<td>" + infoPlayer[i].name + "</td>";
    var leveldata = "<td>" + infoPlayer[i].level + "</td>";
    var lifesdata = "<td>" + infoPlayer[i].intentos + "</td>";
    var fila = $('<tr class="fila"></tr>');
    fila.append(namedata);
    fila.append(leveldata);
    fila.append(lifesdata);   
    tablaJugadores.append(fila);
  }
}  
 
setBoard();
jugada();
armarTabla()