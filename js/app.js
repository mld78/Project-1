console.log('Connected to this site')

$().ready(function() {
    ship = $('#spaceShip')
    area = $('#gameArea').
    start()
}
)
function start() {
    gameState = obstaclesCleared = score = 0
    currentShipPosition = { x: 80, y:100, h:40, w:50 }
    ship.css({left:currentShipPosition.x, top:currentShipPosition.y, width:currentShipPosition.w, height:currentShipPosition.h, rotate:0})
    $('.obstacles').remove()
    $('#instructions').show()
}
