console.log('Connected to this site')

$(document).ready(function() {
    ship = $('#spaceShip')
    area = $('#gameArea').
    start()
})

function start() {
    gameState = obstaclesCleared = score = 0
    currentShipPosition = { x: 80, y:100, h:40, w:50 }
    ship.css({left:cPos.x, top:cPos.y, width:cPos.w, height:cPos.h, rotate:0})
    $('.obstacles').remove()
    $('#instructions').show()
}
