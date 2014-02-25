var test = require('tape')

var htFilter = require('../')
var hypnotable = require('hypnotable')

var data = 
    [ {strField: 'b', numField: 1}
    , {strField: 'a', numField: 3}
    , {strField: 'c', numField: 2}
    ]

var columns = 
  [ {property: 'strField', template: function(v) {return 't'+v}}
  , {property: 'numField'}
  ]

var filter = htFilter(columns)
var ht = hypnotable(columns, filter.add)

data.forEach(function(item) { ht.write(item) })

window.document.body.appendChild(filter.el)
window.document.body.appendChild(ht.el)

test('table should filter', function(t) {
  var cell1 = ht.el.querySelector('tbody tr td')
  t.ok(cell1.innerHTML === 'tb', 'should start with insertion order')
  
  var select = window.document.querySelector('select')
  select.value = 'a'
  eventFire(select, 'change')

  var row1 = ht.el.querySelector('tbody tr')
  t.ok(row1.style.display === 'none', 'should be hidden')
  
  t.end()
})
  
function eventFire(el, etype){
  if (el.fireEvent) {
    (el.fireEvent('on' + etype));
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}