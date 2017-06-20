
module.exports = (app, express) => {
  app.get('/', require('./controller/gameOfLifeController').index)
}
