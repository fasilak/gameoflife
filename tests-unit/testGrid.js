let Grid = require('../build/test-tmp/server/controller/Grid')
let Life = require('../build/test-tmp/server/controller/Life')



describe("Grid initialization testing", () => {

  let sample1 = [[],[],[]]
  let outputSample1Rows = 3
  let outputSample1Columns = 0


  let sample2 = [[1,2,3],[2,2,2],[1,1,1],[3,3,3]]
  let outputSample2Rows = 4
  let outputSample2Columns = 3

  let sample3 = []
  let outputSample3Rows = 0

  let sample4 = null

  it("rows and columns mathces with what has been passed in", () => {

    try {

      let grid = new Grid(sample1)

      expect(grid.rows.length)
        .toEqual(outputSample1Rows)

      expect(grid.rows[0].length)
        .toEqual(outputSample1Columns)


      grid = new Grid(sample2)

      expect(grid.rows.length)
        .toEqual(outputSample2Rows)

      expect(grid.rows[0].length)
        .toEqual(outputSample2Columns)

      grid = new Grid(sample3)

      expect(grid.rows.length)
        .toEqual(outputSample3Rows)


      grid = new Grid(sample4)
      expect(grid['rows'])
        .toBeUndefined()

    } catch (err){
      console.log(err)
    }

  })

})

describe("check function generateAndTick", () => {



  it("check if boundaries are getting added as required addBoundary", () => {

    let grid = new Grid([['X','X'],['X','X']])

    expect(grid.rows.length)
      .toEqual(2)


    expect(grid.rows[0][0])
      .toEqual('X')
    expect(grid.rows[0][1])
      .toEqual('X')


    grid.addBoundary()


    expect(grid.rows.length)
      .toEqual(4)




    expect(grid.rows[0][0])
      .toEqual('-')
    expect(grid.rows[0][1])
      .toEqual('-')

    expect(grid.rows[grid.rows.length-1][0])
      .toEqual('-')
    expect(grid.rows[grid.rows.length-1][1])
      .toEqual('-')

  })

  it("check if added boundaries are getting removed removeBoundaries ", () => {
    let grid = new Grid([['X','X'],['X','X']])

    grid.addBoundary()

    grid.grid = [[new Life(0,0,'-'),new Life(0,0,'-')],[new Life(0,0,'X'),new Life(0,0,'X')],[new Life(0,0,'X'),new Life(0,0,'X')],[new Life(0,0,'-'),new Life(0,0,'-')]]

    grid.removeBoundaries()

    expect(grid.grid.length)
      .toEqual(2)

    expect(grid.rows.length)
      .toEqual(2)

    expect(grid.grid[0][0].isAlive)
      .toEqual(true)

    expect(grid.grid[0][1].isAlive)
      .toEqual(true)

    expect(grid.grid[1][0].isAlive)
      .toEqual(true)

    expect(grid.grid[1][1].isAlive)
      .toEqual(true)

  })


  it("Toad pattern dead boundary has come to ife removeBoundaries ", () => {
    let grid = new Grid([['X','X'],['X','X']])
    grid.addBoundary()

    grid.grid = [[new Life(0,0,'-'),new Life(0,0,'-')],[new Life(0,0,'X'),new Life(0,0,'X')],[new Life(0,0,'X'),new Life(0,0,'X')],[new Life(0,0,'-'),new Life(0,0,'-')]]

    

  })




})