const opn = require('opn')
const express = require('express')
const chalk = require('chalk')
const argv = require('minimist')(process.argv.slice(2))

const PORT = argv.port || 4815
const CLIENT_ID = argv.clientId || 'ab3795d4bb1a4a20bbb82b9326732911'
const SHOW_DIALOG = argv.showDialog || false
const SCOPES = argv.scopes ? argv.scopes.split(',').join('%20') : [
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-modify-private',
  'streaming',
  'ugc-image-upload',
  'user-follow-modify',
  'user-follow-read',
  'user-library-read',
  'user-library-modify',
  'user-read-private',
  'user-read-birthdate',
  'user-read-email',
  'user-top-read',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played'
].join('%20')

const REDIRECT_URI = 'http://localhost:' + PORT + '/callback'

const URL =
  'https://accounts.spotify.com/authorize'
  + '?client_id=' + CLIENT_ID
  + '&response_type=token'
  + '&scope=' + SCOPES
  + '&show_dialog=' + SHOW_DIALOG
  + '&redirect_uri=' + REDIRECT_URI

const app = express()

app.get('/callback', (req, res) => {
  res.sendFile(__dirname + '/callback.html')
  if (req.query.error) {
    console.log(chalk.red('Something went wrong. Error: '), req.query.error)
  }
})

app.get('/token', (req, res) => {
  res.sendStatus(200)
  if (req.query.access_token) {
    console.log(chalk.green('Your token is: '), chalk.bold(req.query.access_token))
  }

  process.exit()
})

const main = () => {
  app.listen(PORT, () => {
    console.log(chalk.blue('Opening the Spotify Login Dialog in your browser...'))
    opn(URL)
  })
}

module.exports = main
