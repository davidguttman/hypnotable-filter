module.exports = function(columns) {
  return new Filter(columns)
}

function Filter (columns) {
  this.el = document.createElement('div')
  this.el.addEventListener('change', this.filterChange.bind(this))

  this.columns = columns
  this.indexes = { '_ALL_': [] }

  this.filterControls = 

  this.add = this.add.bind(this)
  return this
}

Filter.prototype.filterChange = function(evt) {
  var self = this
  var filters = this.el.querySelectorAll('select')
  var criteria = [];
  
  [].forEach.call(filters, function(filter) {
    var group = filter.dataset.group
    var value = filter.value
    if (value !== '_ALL_') criteria.push([group, value])
  })
  
  this.indexes['_ALL_'].forEach(function(row) {
    var nVisible, visible
    var nVisible = 0
    
    criteria.forEach(function(group_val) {
      var group = group_val[0]
        , val = group_val[1]

      if (self.indexes[group].values[val].rows.indexOf(row) >= 0) {
        nVisible += 1
      }
    })
    
    var visible = (nVisible === criteria.length)

    if (visible) {
      return row.style.display = 'table-row'
    } else {
      return row.style.display = 'none'
    }
  })

}

Filter.prototype.add = function(obj, tr) {
  var self = this

  this.indexes['_ALL_'].push(tr)

  this.columns.forEach(function(col, i) {
    
    var title = col.title

    if (typeof col.property === 'function') {
      if (title == null) title = "Column " + (i + 1)
    } else {
      if (title == null) title = col.property
    }
    
    if (typeof col.property === 'function') {
      var val = col.property(obj)
    } else {
      var val = obj[col.property]
    }

    if (!self.indexes[title]) {
      var select = document.createElement('select')
      select.dataset.group = title
      self.el.appendChild(select)

      var anyOption = document.createElement('option')
      anyOption.innerHTML = '- ' + title + ' -'
      anyOption.value = '_ALL_'
      select.appendChild(anyOption)

      self.indexes[title] = {select: select, values: {}}
    }
    
    if (!self.indexes[title].values[val]) {
      var option = document.createElement('option')
      option.innerHTML = val
      self.indexes[title].select.appendChild(option)

      self.indexes[title].values[val] = {rows: [], option: option}
    }
    
    self.indexes[title].values[val].rows.push(tr)
  })
    
}