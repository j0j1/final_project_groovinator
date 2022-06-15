const express = require("express");
const morgan = require("morgan");
// const app = express();

const {
    saveSynth,
    saveSequence,
    getSynths,
    getSequences
    } = require ('./handlers')

express()
  .use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  .post('/synth/post', saveSynth)
  .post('/sequence/post',saveSequence)
  .get('/synth/getsynths', getSynths)
  .get('/sequence/get-sequences', getSequences)
  //handle 404s
  .use((req, res) => res.status(404).type('txt').send("something went wrong, endpoint not found"))
  .listen(8000, () => console.log('Listening on port 8000'));

