# Exgrid

[![NPM version](https://img.shields.io/npm/v/exgrid.svg?style=flat-square)](https://www.npmjs.com/package/exgrid)
[![Dependency Status](https://img.shields.io/david/chemzqm/exgrid.svg?style=flat-square)](https://david-dm.org/chemzqm/exgrid)
[![Build Status](https://img.shields.io/travis/chemzqm/exgrid/master.svg?style=flat-square)](http://travis-ci.org/chemzqm/exgrid)
[![Coverage Status](https://img.shields.io/coveralls/chemzqm/exgrid/master.svg?style=flat-square)](https://coveralls.io/github/chemzqm/exgrid?branch=master)

[Try it now](https://chemzqm.github.io/exgrid/)

Exgrid has rebuild with [reactive-lite](https://github.com/chemzqm/reactive-lite), beside flexable binding methods and binding resue for excellence performance, it can do:

* paging
* sorting
* filter
* local/remote mode
* custom formatter/render
* data change reactive
* event delegation

## Install

with npm

    npm install exgrid --save

## Usage

Define a template like this:
``` html
<table>
  <thead>
    <tr>
      <th class="sort" data-sort="name">name</th>
      <th class="sort" data-sort="age">age</th>
      <th>company</th>
      <th class="sort" data-sort="number">money</th>
      <th>active</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="left">{name}</td>
      <td style="width:30px;">{age}</td>
      <td class="left">{company}</td>
      <td class="money">¥{money | currency 2}</td>
      <td data-render="setActive" class="center"></td>
    </tr>
  </tbody>
```
_The last `tr` element in `tbody` is used as the template for repeat rendering._

Init the grid, render it to html and set data:
``` js
var grid = new Grid(template, {
  perpage: 10,
  // filters for reactive-lite
  filters: {
    percentage: function (val) {
      return (val*100).toFixed() + '%'
    }
  },
  // bindings for reactive-lite
  bindings: {
    react: function (prop) {
      this.bind('$stat', function (model, el) {
        ...
      })
    }
  },
  // delegate object for reactive-lite
  delegate: {
    setActive: function (model, el) {
      ...
    }
  }
})
// use local mode
grid.local()
// render element
placeholder.appendChild(pager.el)
grid.setData(data)
```
## Events

* `sort` emit with params when remote sort needed (including `sortField` `sortDirection`)
* `filter` emit with params when remote filter needed (including `filterField` `filterValud`)
* `page` emit with params when remote paging needed (including `curpage`, `perpage`)
* `change` emit after table row add or removed
* `remove` emit just before this component removed

##API

### Grid(el, [option])

* `el` table element or template string as root node
* `option` optional option for [list-render](https://github.com/chemzqm/list-render)
* `option.perpage` max page count perpage, works with [pager](https://github.com/chemzqm/pager) (need Object.definePropety support)
* `option.delegate` delegate object for [reactive](https://github.com/chemzqm/reactive-lite)
* `option.bindings` bindings object for [reactive](https://github.com/chemzqm/reactive-lite)
* `option.filters` filters object for [reactive](https://github.com/chemzqm/reactive-lite)
* `option.model` [model](https://github.com/chemzqm/model) class used for generate model
* `option.empty` String or Element rendered in parentNode when internal data list is empty
* `option.limit` the limit number for render when `setData()` (equal to perpage if not set)

Exgrid inherits all methods from [list-render](https://github.com/chemzqm/list-render), the extra methods are shown below

### .bind(type, selector, handler)

Delegate event `type` to `selector` with `handler`,
handler is called with event and a reactive model

### .local()

Make list works on local model, which means sort, filter and paging  only happens locally

### .sort(field, dir, [method])

Sort the data by field, direction or method, when it's remote mode(default mode), emit event only

### .filter(field, val|function)

Filter the data by field, val or function, when it's remote mode(default mode), emit event only

### .select(n)

Select page `n`, when it's remote mode(default mode), emit event only

### .setTotal(n)

Set total data count for paging, can not used for local mode

### .remove()

Unbind all events and remove the created elements

## License

The MIT License (MIT)

Copyright (c) 2015 Qiming Zhao <chemzqm@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
