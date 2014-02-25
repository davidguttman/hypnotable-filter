var htFilter = require('../')
var hypnotable = require('hypnotable')

var columns = require('./columns')
var data = require('./data.json')

var filter = htFilter(columns)
var ht = hypnotable(columns, filter.add)

document.body.appendChild(filter.el)
document.body.appendChild(ht.el)

data.forEach(function(row) {
  ht.write(row)
})