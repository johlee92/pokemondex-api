require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

console.log(process.env.API_TOKEN);

const app = express();

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganSetting));


const PORT = process.env.PORT || 8000;


app.use((error,req, res, next) => {
  let response;

  if (process.env.NODE_ENV === 'production') {
    response = { error: { message:'server error' }}
  } else {
    resposne = { error }
  };

  res.status(500).json(response)
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
});

app.use(function validateBearerToken(req, res, next) {
  // console.log('validate bearer token middleware')
  // move to the next middleware
  next()
})

const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`];

function handleGetTypes(req, res) {
  res.json(validTypes);
}

app.get('/types',handleGetTypes)

function handleGetPokemon(req, res) {
   res.send('Hello, Pokemon!')
}

app.get('/pokemon', handleGetPokemon)