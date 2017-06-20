module.exports = class Life{
  constructor(x, y, state){
    this.x = x
    this.y = y
    this.isAlive = state === 'X'
    this.nextState = this.isAlive
    this.neighbours = []
  }

  addNeighbour(life){
    this.neighbours.push(life)
  }



  tick(){
    let aliveNeighbours = this._getAliveNeighbours()

    //Any live cell with fewer than two live neighbours dies, as if by loneliness.
    //Any live cell with more than three live neighbours dies, as if by overcrowding.
    if(this.isAlive){
      if(aliveNeighbours < 2 || aliveNeighbours > 3){
        this.nextState = false
      }
    } else {
      //Any dead cell with exactly three live neighbours comes to life.
      if(aliveNeighbours === 3){
        this.nextState = true
      }
    }
  }

  output(){
    return this.nextState ? 'X' : '-'
  }

  _getAliveNeighbours(){
    let counter = 0;
    for (let life of this.neighbours) {
      if(life.isAlive){
        counter+=1
      }
    }
    return counter
  }





}