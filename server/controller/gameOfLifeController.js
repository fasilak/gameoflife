let Grid = require('./Grid')

module.exports = class GameOfLifeController{


  static index(req, res){
    //process your request
    let grid = new Grid(require('./../json/input4.json'))
    grid.generateAndTick()
    
    res.send(require('./../views/output.js.html').renderContent(grid))
    
    //res.send(grid.output())
  }
}




