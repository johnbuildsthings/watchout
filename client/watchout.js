// start slingin' some d3 here.


var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20,
  r: 15,
};


var gameStats = {
  score: 0,
  bestScore: 0,
  collisionCount: 0
};

var axes = {};
axes.x = d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]);
axes.y = d3.scale.linear().domain([0, 100]).range([0, gameOptions.height]);

var player = {x: axes.x(50), y: axes.y(50)}

var gameBoard = d3.select('.container').style({
  width: gameOptions.width+'px',
  height: gameOptions.height+'px',
})

var updateScore = function() {
  var score = d3.select('.current').select('span');
  var highscore = d3.select('.high').select('span');
  var collision = d3.select('.collisions').select('span');
  score.text(gameStats.score.toString());
  highscore.text(gameStats.bestScore.toString());
  collision.text(gameStats.collisionCount);
};


// Player class
d3.select('.player').style({
  top: function(){return axes.y(50)+'px'},
  left: function(){return axes.x(50)+'px'},
  width: 25+'px',
  height: 25+'px',
  'border-radius': 25+'px',
  'background-color': 'blue'
});



//enemies



var enemy = gameBoard.selectAll('.enemies')
  .data(d3.range(gameOptions.nEnemies))
  .enter()
  .append('div')
  .attr('class', 'enemies')
  .style({
    top: function(){return axes.y(Math.random()*100)+'px'},
    left: function(){return axes.x(Math.random()*100)+'px'},
    height: 15+'px',
    width: 15+'px'
  });

gameBoard.on('mousemove', function(){
  var loc = d3.mouse(this);
  player = {x: loc[0], y:loc[1]}
  d3.select('.player').style({
    top: function(){return player.y-12+'px'},
    left: function(){return player.x-12+'px'},
  })
});

var move = function(element){
  element.transition().duration(1500).style({
    top: function(){return axes.y(Math.random()*100)+'px'},
    left: function(){return axes.x(Math.random()*100)+'px'},
  }).each('end', function(){
    move(d3.select(this));
  });
}

move(enemy);

var scoreCount = function(){
  gameStats.score++;
  gameStats.bestScore = (gameStats.bestScore > gameStats.score) ? gameStats.bestScore : gameStats.score;
  updateScore();
}

setInterval(scoreCount, 100);

var previousCollision = false;

var detectCollision = function(){
  var collision = false;

  enemy.each(function(){
    var cx = this.offsetLeft + gameOptions.r;
    var cy = this.offsetTop + gameOptions.r;

    var x = cx - player.x;
    var y = cy - player.y;

    if(Math.sqrt(x*x + y*y) < gameOptions.r*2){
      collision = true;
    }

  });

  if(collision){
    gameStats.score = 0;
    if( previousCollision !== collision){
      gameStats.collisionCount = gameStats.collisionCount+1;
    }
  }
  previousCollision = collision;
}

d3.timer(detectCollision);