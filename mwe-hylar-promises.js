const fs = require('fs')
var Promise = require('bluebird')
var H = require('hylar')

const mimeType = 'application/ld+json'

const catsOnto = fs.readFileSync('./cats-and-humans.json', 'utf8')

const hylarLoadTest = function (jsonld) {
  return new Promise(
    function (resolve, reject) {
      var Hylar = new H()
      Hylar.load(jsonld, mimeType)
        .then(function (response) {
          return Hylar.getStorage()
        })
        .then(function (results) {
          const ntriples = results.replace(/,/g, '')
          console.log('#OK#')
          resolve(ntriples)
        })
        .then(function () {
          Hylar.query('construct {?t ?s ?r .}  where {?t ?s ?r .}')
            .then(function (results) {
              console.log(results)
            })
        })
        .catch(function (err) {
          console.log('#ERR#', err)
          reject(err)
        })
    }
  )
}

hylarLoadTest(catsOnto)
  .then(function (res) {
    console.log(res)
  })

