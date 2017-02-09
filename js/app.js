console.log('Connected to this site')


//Setup for when page loads
$(document).ready(function() {
    $ship = $('#spaceShip')
    $gameArea = $('#background')
    $buttonStart = $('#startButton').on('click', begin) //make sure this is correct
    $buttonReset = $('#resetButton').hide()
    fall = 1000
    gameState = 2
    score = 0
    obstacleGap = 200

//initial click function to run
   function begin() {

        //add a starting sound clip
        $buttonStart.remove()

    }


  // setup to create and update obstacles appearance
      var initialSetup = setInterval(function(){
        if (gameState === 1){
              obstacleFunctions()
              createObstacle()
              updateObstacle()
            }
          }, 1300)
//
//
//
// // setup to create and update ship position
    var shipSetup = setInterval(function(){
      if(gameState === 1){
        obstacleFunctions()
        currentShipPosition()
      }
    }, 10)


//Click for ship up movement

    $gameArea.mousedown(function(){
      shipUp()
      if(gameState === 2){
        gameState = 1
        removeInterval()
      }
    })

//spacebar for shup up movement

    $(window).keyup(function(bar){
      if(bar.keyCode === 32){
        shipUp()
        bar.preventDefault()
        if(gameState === 2){
          gameState = 1
          removeInterval()
        }
      }
    })

    //Setup interval for how obstacles should be removed

        function removeInterval(){
          setTimeout(function(){
            var initialSetup = setInterval(function(){
              if(gameState === 1){
                obstacleFunctions()
                removeObstacle()
              }
            }, 1300)
          }, 2000)
        }
  //function to make ship move up

    function shipUp(){
      if(gameState === 1 || gameState === 2){
        $ship.css('transform', 'rotate(-20deg)')
        $ship.stop().animate({
          bottom: '+=60px'
        }, 200, function(){

          $ship.css('transform', 'rotate(0deg)')
          $ship.stop().animate({
            bottom: '-=60px'
          }, 200, 'linear', function(){

            naturalFall()
          })
        })
      }
    }

//create fall for when click or bar is not pressed

  function naturalFall(){
      gravity = parseInt($ship.css('bottom')) / $gameArea.height()

      fullGravity = fall * gravity

      $ship.stop().animate({
        bottom: '0'
      }, fullGravity, 'linear')

      $ship.css('transform', 'rotate(30deg)')
  }





//obstacle functions and collision
function obstacleFunctions() {

  createObstacle = function(){
      score++
      var obstacleTopVisual = Math.floor(Math.random() * ($gameArea.height() - 250)) + 50

      var obstacleBottomVisual = $gameArea.height() - (obstacleTopVisual + obstacleGap)


      var obstacle = '<div class="alien" block-id="' + score + '"><div id="top" style="height: ' + obstacleTopVisual + 'px" ></div><div id="bottom" style="height:' + obstacleBottomVisual + 'px" ></div></div>'

      $gameArea.append(obstacle)
    }

  // function that deletes obstacles that have gone off left of screen
      removeObstacle = function(){
        $('.gameArea .alien').first().remove()
      }

      // Create a function to move obstacles across screen

        updateObstacle = function(){
          $('.alien').each(function(){
            $(this).animate({
              right: '+=300px'
            }, 2000, 'linear')
          })
      }

      // ship position function that says if ship is at bottom of screen then end game else run all other functions

      currentShipPosition = function() {
        //create offset variables here that represent ship and the top/bottom obstacles and obstacles as a whole

          console.log('works')
          if  (parseInt($ship.css('bottom')) === 0) {
            gameOver()
          }

         else if ( (($ship.offset().left + $ship.width()) >= (($('.alien').offset().left))) && (($ship.offset().top) <= ($('#top').offset().top))) {
            gameOver()
          }
          else if ( (($ship.offset().left + $ship.width()) >= (($('.alien').offset().left))) && (($ship.offset().top + $ship.height()) >= ($('#top').offset()).top )){
              gameOver()
            }
            else {

            }

}
}

//function to reset game

// function resetGame(){
//
// }

// function that tells game what to do if game ends

  function gameOver(){
    $('.alien').stop()
    clearInterval(shipSetup)
    $buttonReset = $('#resetButton').show() //fix reset button
    naturalFall()

    gameState=0
    console.log('Game Over')
  }

})
