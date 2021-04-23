const faker = require('faker-br');

function generateUser() {
    return {
        fullname: faker.name.findName(),
        birthday: faker.date.between('1950-01-01', '2020-01-01').toISOString(),
        civil_state: Math.floor(Math.random() * 5),
        cpf: faker.br.cpf(),
        city: faker.address.city(),
        state: faker.address.stateAbbr()
    }
}

var https = require('http'),
  querystring = require('querystring')

function a(){

var req = https.request({
  hostname: 'localhost',
  path: '/user/new',
  port: 4040,
  method: 'POST',
  headers: {'content-type' : 'application/json'},
}, (res) => {
  var str = ''

  res.on('data', function (chunk) {
    str += chunk
  })

  res.on('end', function () {
    console.log(str)
  })
})

req.write(JSON.stringify(generateUser()))
req.end()
}
for(let i = 0; i < 50 ; i++){
  a()
}