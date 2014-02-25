hypnotable-filter
=================

Filter hypnotable tables

    npm i hypnotable-filter

# Example #

```js

var htFilter = require('hypnotable-filter')
var hypnotable = require('hypnotable')

var data = require('./data.json') // [ { "date": ..., "browser": ... }, ...]

var columns = 
  [ {property: 'date'}
  , {property: 'browser'}
  , {property: 'browserVersion', title: 'Browser Version'}
  , {property: 'advanced', title: 'Advanced?'}
  ]

var filter = htFilter(columns)
var ht = hypnotable(columns, filter.add)

document.body.appendChild(filter.el)
document.body.appendChild(ht.el)

data.forEach(function(row) {
  ht.write(row)
})

```

# License #

MIT