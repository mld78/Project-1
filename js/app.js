console.log('Connected to this site')


//Setup for when page loads
$(document).ready(function() {
    ship = $('#spaceShip')
    area = $('#gameArea')
    button = $('#startButton').on('click', start)
    fall = 1000
    gameState = 2
    obstacle = 0
    obstacleGap = 120

//initial click function to run
  function start() {

        startShipPosition = { x: 10, y:100, h:40, w:50 }
        ship.css({left:startShipPosition.x, top:startShipPosition.y, width:startShipPosition.w, height:startShipPosition.h, rotate:0})
        $('.obstacles').remove()

    }

// setup to create and update ship position
    var shipSetup = setInterval(function(){
      if(gameState === 1){
        currentShipPosition()
      }
    }, 10)



// setup to create and update obstacles appearance
      var initialSetup = setInterval(function(){
        if (gameState === 1){
          createObstacle()
          updateObstacle()
        }
      }, 1000)

//Click for ship up movement

    $(window).mousedown(function(){
      shipUp()
      if(gameState === 2){
        gameState = 1
        removeInterval()
      }
    })

//spacebar for shup up movement

    $(window).keypress(function(bar){
      if(bar.keyCode === 32){

      }
    })


    console.log('hello')





})















//
// initialSpeed = 0;
//
// function onClick() {
//     if (gameState > 1)
//     return
//     if (gameState === 0) {
//         gameState = 1
//         $('#instructions').hide()
//         spaceshipStep = window.setInterval(shipStep, 30)
//     }
//     currentSpeed = initialSpeed
// }
//
//
// function shipStep() {
//
//     gravity = -1;
//     currentSpeed += gravity
//     currentShipPosition.y = Math.max(currentShipPosition.y + currentSpeed, 0)
//     var dodge = area.height()-currentShipPosition.h, margin = -12, low = 0, actPillar = $('.obstacles');
//     ship.css({top: currentShipPosition.y})
//
// }
// })
