// start slingin' some d3 here.


var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};


var gameStats = {
  score: 0,
  bestScore: 0
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
  d3.select('.current').text(gameStats.score.toString());
};

updateBestScore = function() {
  gameStats.bestScore = Math.max(gameStats.bestScore, gameStats.score);

  d3.select('.high').text(gameStats.bestScore.toString());
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