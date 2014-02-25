hypnotable-filter
=================

Filter [hypnotable](https://github.com/davidguttman/hypnotable) tables 

[![browser support](https://ci.testling.com/davidguttman/hypnotable-filter.png)
](https://ci.testling.com/davidguttman/hypnotable-filter)

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

To see a bit more look at `/example/index.js` or locally run:

    npm run-script example

# License #

MIT