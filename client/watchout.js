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
  // triangle shaped 
  // x,y position on gameBoard
  // need follow mouse around the gameBoard
// var drag = d3.behavior.drag()
//   .origin(function(d){return d;})
//   .on("drag", function(d, i) {
//     d.x += d3.event.dx;
//     d.y += d3.event.dy;
//     d3.select(this).attr("transform", function(d,i){
//       return "translate(" + [d.x, d.y] + ")"
//     });
//   });


// var Player = function(){
//   this.x = gameOptions.width * .5;
//   this.y = gameOptions.height * .5;
// };

// Player.prototype.render = function(){
//   gameBoard
//     .append('circle')
//     .data({x:this.x, y:this.y})
//     .attr('cx', function(data){return this.x;})
//     .attr('cy', function(data){return this.y;})
//     .attr('r', 25)
//     .style('fill', 'orange')
//     .call(drag);
// };


// var player1 = new Player();
// player1.render();
// // debugger;

var dragmove = function(d){
  d3.select(this)
    .attr('cx', d.x = d3.event.x)
    .attr('cy', d.y = d3.event.y);
};

var drag = d3.behavior.drag()
  .origin(function(d){return d;})
  .on('drag', dragmove);

var gameBoard = gameBoard
  .append('circle')
  .attr('cx', 500)
  .attr('cy', 500)
  .attr('r', 25)
  .style('fill', 'orange')
  .call(drag);

var data = [{
  x : 50,
  y : 2,
  r : 5,
  c : 'orange'
}];

// var circle = gameBoard
//   .selectAll('circle')
//   .data(data);

d3.select('circle')
  .data(data)
  .transition()
  .attr('cx', function(d){return d.x})
  .attr('cy', function(d){return d.y});




// debugger;
// d3.select('circle')
//   .data(data)
//   .append()
//   .attr('cx', function(d){return d.x})
//   .attr('cy', function(d){return d.y})
//   .attr('fill', function(d){return d.c})
//   .attr('r', 0)
//   .transition()
//   .attr('r', function(d){return d.r})

