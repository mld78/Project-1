console.log('Connected to this site')


//Setup for when page loads
$(document).ready(function() {
  $ship = $('#spaceShip')
  $gameArea = $('#background')
  $buttonStart = $('#startButton') // .on('click', begin) //make sure this is correct
  $buttonReset = $('#resetButton').hide()
  beforeGameStart = 2
  gameRunning = 1
  gameEnd = 0

  gameState = beforeGameStart
  score = 0
  $startScore = $('#gameScore')
  $finalScore = $('#finalScore').hide()
  obstacleGap = 200
  $introAudio = $('#openingLine')[0]

  //initial click function to run
  $buttonStart.on('click', begin())

  function begin() {

    setInterval(function() {
      if (gameState === gameRunning) {
        obstacleFunctions()
        createObstacle()
        updateObstacle()
      }
    }, 1500)


    //add a starting sound clip

    $buttonStart.on('click', function() {
      $introAudio.play()
      $buttonStart.remove()
    })

  }

  // // setup to create and update ship position
  // var shipSetup = setInterval(function(){
  //   if(gameState === gameRunning){
  //     obstacleFunctions()
  //     currentShipPosition()
  //   }
  // }, 10)


  //Click for ship up movement

  $gameArea.mousedown(function(event) {
    obstacleFunctions()
    shipUp()
    event.preventDefault()
    if (gameState === beforeGameStart) {
      gameState = gameRunning
    }
  })

  //spacebar for shup up movement

  $(window).keyup(function(event) {
    if (event.keyCode === 32) {
      obstacleFunctions()
      shipUp()

      if (gameState === beforeGameStart) {
        gameState = gameRunning
      }
    }
  })

  $(window).keydown(function(event) {
    if (event.keyCode === 32) {
      event.preventDefault()
    }
  })

  //function to make ship move up

  // function shipUp() {
  //   if (gameState === gameRunning) {
  //     $ship.css('transform', 'rotate(-20deg)')
  //     $ship.stop().animate({
  //       bottom: '+=60px'
  //     }, 200, function() {
  //       $ship.css('transform', 'rotate(0deg)')
  //       $ship.stop().animate({
  //         bottom: '-=60px'
  //       }, 200, 'linear', function() {
  //         obstacleFunctions()
  //         // currentShipPosition()
  //         naturalFall()
  //       })
  //     })
  //   }
  // }

  //create fall for when click or bar is not pressed
  fall = 750

  function naturalFall() {
    gravity = parseInt($ship.css('bottom')) / $gameArea.height()

    fullGravity = fall * gravity
    $ship.css('transform', 'rotate(20deg)')
    $ship.stop().animate({
      bottom: '0'
    }, fullGravity, 'linear')

    //$ship.css('transform', 'rotate(10deg)')
  }



  //obstacle functions and collision
  function obstacleFunctions() {



    createObstacle = function() {

      var obstacleTopVisual = Math.floor(Math.random() * ($gameArea.height() - 250)) + 50

      var obstacleBottomVisual = $gameArea.height() - (obstacleTopVisual + obstacleGap)

      score++
      var obstacle = '<div class="alien" block-id="' + score + '"><div id="top" style="height: ' + obstacleTopVisual + 'px" ></div><div id="bottom" style="height:' + obstacleBottomVisual + 'px" ></div></div>'

      $gameArea.append(obstacle)
    }

    // Create a function to move obstacles across screen

    updateObstacle = function() {
      $('.alien').each(function() {
        $(this).animate({
          right: '+=700px'
        }, 2000, 'linear', function() {
          $(this).remove()
        })
      })
    }

    // ship position function that says if ship is at bottom of screen then end game else run all other functions

    // setTimeout(function(){
    //   console.log($alienTopObstacle.left)
    // }, 1500)
    // //setTimeout(function(){console.log($alienBottomObstacle.top)}, 1500)
    //
    // $testship = ($ship.offset().left + $ship.width())
    // console.log($testship)


    $alienTopObstacle = $('#top').offset()
    $alienBottomObstacle = $('#bottom').offset()

      setTimeout(function currentShipPosition() {
      //create offset variables here that represent ship and the top/bottom obstacles and obstacles as a whole
      if(parseInt($ship.css('bottom')) === 0){
        console.log('you hit the floor and died')
        gameOver()
      } else if (($ship.offset().left + $ship.width()) >= (($alienTopObstacle.left)) && ($ship.offset().top + 45) < $alienTopObstacle.top + 170) {
         console.log('This collided with the top obstacle')
        gameOver()

      } else if (($ship.offset().left + $ship.width()) > (($alienBottomObstacle.left)) && (($ship.offset().top + $ship.height() - 10) >= ($alienBottomObstacle.top))) {
        console.log('This collided with the bottom obstacle')
        gameOver()

      } else {
        $('#gameScore').html(score-1) //do not touch this, is timed with updateObstacle
      }


    }, 1550)

    shipUp = function() {
      if (gameState === gameRunning) {
        $ship.css('transform', 'rotate(-20deg)')
        $ship.stop().animate({
          bottom: '+=60px'
        }, 200, function() {

          $ship.css('transform', 'rotate(0deg)')
          $ship.stop().animate({
            bottom: '-=60px'
          }, 300, 'linear', function() {

            naturalFall()
          })
        })
      }
    }


  }

  //function to reset game

  function resetGame() {
    location.reload()
  }

  // function that tells game what to do if game ends

  function gameOver() {
    $('.alien').stop()
    $buttonReset.show().on('click', resetGame) //fix reset button
    naturalFall()
    $finalScore.show().html(`Morty look at this joker: ${score-1}`)
    $startScore.hide()
    gameState = gameEnd
    console.log('Game Over')
  }

})
