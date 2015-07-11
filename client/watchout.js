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

var gameBoard = d3.select('.container').append('svg:svg')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height);


var updateScore = function() {
  d3.select('.current').text(gameStats.score.toString());
};

updateBestScore = function() {
  gameStats.bestScore = Math.max(gameStats.bestScore, gameStats.score);

  d3.select('.high').text(gameStats.bestScore.toString());
};


// Player class

var Player = function(){
  this.x = gameOptions.width * .5;
  this.y = gameOptions.height * .5;
};
var dragmove = function(d){
  d3.select(this)
    .attr('cx', d.x = d3.event.x)
    .attr('cy', d.y = d3.event.y);
};

var drag = d3.behavior.drag()
  .origin(function(d){return d;})
  .on('drag', dragmove);

Player.prototype.render = function(){
  gameBoard
    .data([{x: this.x, y: this.y}])
    .append('circle')
    .attr('cx', this.x)
    .attr('cy', this.y)
    .attr('r', 25)
    .style('fill', 'orange')
    .call(drag);
};


var player1 = new Player();
player1.render();

//enemies

var Enemy = function(id){
  this.x = Math.random()*100;
  this.y = Math.random()*100;
  this.id = id;
}


var enemies = [];
for(var i=0;i<gameOptions.nEnemies;i++){
  enemies.push(new Enemy(i))
}

gameBoard
  .data(enemies)
  .enter()
  .append('circle')
  .attr('cx', function(d){return d.x})
  .attr('cy', function(d){return d.y})
  .attr('r', 15)
  .style('fill', 'green')
// d3.select('circle')
//   .transition()
//   .attr('cx', function(d){return d.x})
//   .attr('cy', function(d){return d.y});

