#Exgrid

[![NPM version](https://badge.fury.io/js/exgrid.png)](http://badge.fury.io/js/exgrid)
[![Dependency Status](https://david-dm.org/chemzqm/exgrid.png)](https://david-dm.org/chemzqm/exgrid)
[![Build Status](https://secure.travis-ci.org/chemzqm/exgrid.png)](http://travis-ci.org/chemzqm/exgrid)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Exgrid is built on simple [components](https://component.github.io), yet including all the features for daily usage, ie:

* paging
* sorting
* filter
* local/remote mode
* custom formatter/render
* data change reactive
* event delegation

The api is straightforward and magic is limited to make it quite easy to work with.

## Usage

Define a template like this:
``` html
<table>
  <thead>
    <tr>
      <th data-sort="string">name</th>
      <th data-sort="number">age</th>
      <th data-sort="number">score</th>
      <th data-sort="number">percentage</th>
      <th data-sort="number">money</th>
      <th>active</th>
      <th>action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="left">{name}</td>
      <td>{age}</td>
      <td data-format="integer">{score}</td>
      <td data-render="percentage"></td>
      <td class="money" data-format="chineseMoney">{money}</td>
      <td data-render="setActive" class="center"></td>
      <td data-react="stat" data-render="renderAction"></td>
    </tr>
  </tbody>
</table>
```
_The last `tr` element in `tbody` is used as the template for repeat rendering the rows._

Init the grid, render it to html and set data:
``` js
var grid = new Grid(template, {
  perpage: 10,
  formatters: {
    chineseMoney: function (money) {
      return '¥' + money.toFixed(2)
    }
  },
  renders: {
    percentage: function (model, el) {
      el.textContent = (model.percent * 100).toFixed() + '%'
    },
    setActive: function (model, el) {
      var cb = document.createElement('input')
      cb.type = 'checkbox'
      cb.checked = model.isActive
      el.innerHTML = ''
      cb.addEventListener('change', function () {
        // save value to model
        model.isActive = cb.checked
      }, false)
      el.appendChild(cb)
    },
    renderAction: function (model, el) {
      el.innerHTML = '<button class="save" ' + (model.changed() ? '' : 'disabled') + '>save</button>'
    }
  }
})

document.body.appendChild(grid.el)
//data is array of plain javascript object
grid.setData(data)
```


##API

### Grid(string | element, [options])

options including :

  * perpage (Number) the max count of rows for rendering
  * [paging] (Boolean: false) using paging
  * [remote] (Boolean: false) set this to true to make the grid works on remote mode
  * [formatters] (Object) user defined formatter functions
  * [renders] (Object) user defined render functions, called with `model` and the binded node

### .setData(Array)

Set the data with Object array, should always be called after remote request.

### .prepend(Object)

Render the object to the first row.

### .setPage(n)

Set page number to n (0 based).

### setTotal(n)

Set total count for pager to work properly.

### prepend(obj, [element])

Create row with obj and prepend to el (default: frist child of tbody)

### .sort(field, direction, method)

Sort grid with field name and direction (-1 or 1) or with the given sort method (value cound be `string` `number` or a sort function)

### .filter(field, val)

Filter data with field and val (optional filter function), then redirect to first page and show data
no data would be filtered when the val is null or empty string

### .refresh()

Trigger the refresh event for data receiving.

### .remove()

Unbind all events and remove the created elements

## Events

* `construct` emitted on grid created with `params` as parameter
* `sort` emitted on sorting with `params` as parameter (only emit on remote mode)
* `page` emitted on paging with `params` as parameter (only emit on remote mode)
* `empty` emitted when no data could be shown
* `refresh` emitted when `refresh` is called
* `click` emitted with `event` and `row` on body click
* `destroy` emitted when grid is removed

## License

The MIT License (MIT)

Copyright (c) 2015 Qiming Zhao <chemzqm@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
