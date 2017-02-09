console.log('Connected to this site')


//Setup for when page loads
$(document).ready(function() {
    $ship = $('#spaceShip')
    $gameArea = $('#background')
    $buttonStart = $('#startButton').on('click', begin) //make sure this is correct
    $buttonReset = $('#resetButton').hide()
    beforeGameStart = 2
    gameRunning = 1
    gameEnd = 0
    fall = 1000
    gameState = beforeGameStart
    score = 0
    $startScore = $('#gameScore')
    $finalScore = $('#finalScore').hide()
    obstacleGap = 200

//initial click function to run
   function begin() {

      setInterval(function(){
          if (gameState === gameRunning){
        obstacleFunctions()
        createObstacle()
        updateObstacle()
      }
    }, 1300)


        //add a starting sound clip
        $buttonStart.remove()

    }

// // setup to create and update ship position
    // var shipSetup = setInterval(function(){
    //   if(gameState === gameRunning){
    //     obstacleFunctions()
    //     currentShipPosition()
    //   }
    // }, 10)


//Click for ship up movement

    $gameArea.mousedown(function(){
      shipUp()
      if(gameState === beforeGameStart){
        gameState = gameRunning
        removeInterval()
      }
    })

//spacebar for shup up movement

    $(window).keyup(function(bar){
      if(bar.keyCode === 32){
        shipUp()
        bar.preventDefault()
        if(gameState === beforeGameStart){
          gameState = gameRunning
          removeInterval()
        }
      }
    })

    //Setup interval for how obstacles should be removed

        function removeInterval(){
          setTimeout(function(){
            var initialSetup = setInterval(function(){
              if(gameState === gameRunning){
                obstacleFunctions()
                removeObstacle()
              }
            }, 1300)
          }, 2000)
        }
  //function to make ship move up

    function shipUp(){
      if(gameState === gameRunning){
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

      $ship.css('transform', 'rotate(10deg)')
  }





//obstacle functions and collision
function obstacleFunctions() {

  shipSetup = setInterval(function(){
    if(gameState === gameRunning){
      // obstacleFunctions()
      currentShipPosition()
    }
  }, 10)

  createObstacle = function(){

      var obstacleTopVisual = Math.floor(Math.random() * ($gameArea.height() - 250)) + 50

      var obstacleBottomVisual = $gameArea.height() - (obstacleTopVisual + obstacleGap)

      score++
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
      // alienFullObstacle = ($('.alien').offset())
      // console.log(alienFullObstacle)

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
              $('#gameScore').html(score-3)
            }

}
}

//function to reset game

function resetGame(){
  location.reload()
}

// function that tells game what to do if game ends

  function gameOver(){
    $('.alien').stop()
    clearInterval(shipSetup)
    $buttonReset = $('#resetButton').show().on('click', resetGame) //fix reset button
    naturalFall()
    $finalScore = $('#finalScore').show().html("BRRRRRRRRRP that's pathetic isn't it Morty? " +  score-3)
    $startScore = $('#gameScore').hide()
    gameState= gameEnd
    console.log('Game Over')
  }

})
