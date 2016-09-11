const fs = require('fs')
var H = require('hylar')

const mimeType = 'application/ld+json'

const catsOnto = fs.readFileSync('./cats-and-humans.json', 'utf8')

const hylarLoadTest = function (jsonld) {
  var Hylar = new H()
  Hylar.load(jsonld, mimeType)
    .then(function (response) {
      return Hylar.getStorage()
    })
    .then(function (results) {
      const ntriples = results.replace(/,/g, '')
      console.log('#OK#')
      console.log(ntriples)
    })
    .catch(function (err) {
      console.log('#ERR#', err)
    })
}

hylarLoadTest(catsOnto)

