# react-input
See https://github.com/facebook/react/issues/3926

## Usage


```shell
npm install lodash --save # for debounce util
```

```js
import React, { Component } from 'react'

import Input from './index'

class New extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      value: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }


  handleChange(value) {
    this.setState({value})
  }

  render() {
    return (
      <div>
        You type: {this.state.value}
        <br />
        <Input 
          value={this.state.value} 
          refc={c => {       // refc for ref
            this._input = c  // you can access input DOM node with this._input
          }}
          onChange={value => {
            this.handleChange(value)
          }}
        />
      </div>
    )
  }
}
```

