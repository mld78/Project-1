console.log('Connected to this site')


//Setup for when page loads
$(document).ready(function() {
    $ship = $('#spaceShip')
    $gameArea = $('#background')
    $button = $('#startButton').on('click', start)
    fall = 1000
    gameState = 2
    score = 0
    obstacleGap = 150

//initial click function to run
  function start() {

        //add a starting sound clip
        $('#startButton').remove()

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

  //function to make ship move up

    function shipUp(){
      if(gameState === 1 || gameState === 2){
        $ship.css('transform', 'rotate(-20deg)')
        $ship.stop().animate({
          bottom: '+=60px'
        }, 200, function(){
          currentShipPosition()
          $ship.css('transform', 'rotate(0deg)')
          $ship.stop().animate({
            bottom: '-=60px'
          }, 300, 'linear', function(){
            currentShipPosition()
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

// ship position function that says if ship is at bottom of screen then end game else run all other functions

  function currentShipPosition() {
    if (parseInt($ship.css('bottom')) === 0){
      gameOver()
    }
  }

//Setup interval for how obstacles should be removed

    function removeInterval(){
      setTimeout(function(){
        var initialSetup = setInterval(function(){
          if(gameState === 1){
            removeObstacle()
          }
        }, 1300)
      }, 2000)
    }


//Create both top and bottom obstacle

    function createObstacle(){
      score++

      obstacleTop = Math.floor(Math.random() * ($gameArea.height() - 250)) + 100

      obstacleBottom = $gameArea.height() - (obstacleTop + obstacleGap)

      obstacle = '<div class="alien" id="' + score + '"><div id="top" style="height: ' + obstacleTop + 'px"></div><div id="bottom" style="height:' + obstacleBottom + 'px" ></div></div>'

      $gameArea.append(obstacle)
    }


// Create a function to move obstacles across screen

  function updateObstacle(){
    $('.alien').each(function(){
      $(this).animate({
        right: '+=300px'
      }, 1300, 'linear')
    })
  }

// function that deletes obstacles that have gone off left of screen

function removeObstacle(){
  $('.gameArea .alien').first().remove()
}



console.log('hello')

})
