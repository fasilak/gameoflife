const Life = require('./Life')

module.exports = class Grid{

  constructor(rows){
    this.rows = rows.slice(0)
  }


  populateNeighbour(life, x, y){
    if(this.grid[x]){
      let checkLife = this.grid[x][y]
      if(checkLife){
        life.addNeighbour(checkLife)
      }
    }
  }



  output(){
    let currentOut=''
    for (let row of this.grid) {
      let newStage = ''
      for (let life of row) {
        newStage += life.output() + '&nbsp;'
      }
      currentOut+=newStage+'<br>'
    }
    return currentOut
  }

  addBoundary(){
    //generate boundaries
    if(this.rows.length>0){
      let columns = this.rows[0].length
      let topBoundary = []
      let bottomBoundary = []
      for( var i = 0 ; i < columns ; i++ ) {
        topBoundary.push('-')
        bottomBoundary.push('-')
      }

      this.rows.unshift(topBoundary)
      this.rows.push(bottomBoundary)

    }
  }


  removeBoundaries(){
    let columnsCount = this.grid[0].length
    let rowsCount = this.grid.length
    let removeTop = true
    let removeBottom = true

    for(let i=0; i<columnsCount; i++){
      if(this.grid[0][i].nextState){
        removeTop = false
      }

      if(this.grid[rowsCount-1][i].nextState){
        removeBottom = false
      }

    }

    if(removeTop){
      this.grid.splice(0, 1)
      this.rows.splice(0, 1)
    }

    if(removeBottom){
      this.grid.splice(this.grid.length-1, 1)
      this.rows.splice(this.rows.length-1, 1)
    }

    if(!removeTop || !removeBottom){
      this.generateAndTick()
    }

  }




  generateAndTick(){
    this.grid = []
    this.addBoundary()
    this.rows.forEach((row, rowIndex)=>{
      row.forEach((value, columnIndex)=>{
        let life = new Life(rowIndex, columnIndex, value)
        this.grid[rowIndex] ? this.grid[rowIndex].push(life) : this.grid[rowIndex] = [life]
      })
    })


    //loop through all lifes and assign neighbours
    for (let row of this.grid) {
      for (let life of row) {
        this.populateNeighbour(life, life.x + 1, life.y)
        this.populateNeighbour(life, life.x - 1, life.y)
        this.populateNeighbour(life, life.x, life.y + 1)
        this.populateNeighbour(life, life.x, life.y - 1)
        this.populateNeighbour(life, life.x + 1, life.y + 1)
        this.populateNeighbour(life, life.x - 1, life.y - 1)
        this.populateNeighbour(life, life.x - 1, life.y + 1)
        this.populateNeighbour(life, life.x + 1, life.y - 1)
        life.tick()
      }
    }

    this.removeBoundaries()



  }
}