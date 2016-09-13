import React, { Component } from 'react'
import debounce from 'lodash/debounce'

class Input extends Component {
  constructor(props){
    super(props)

    this.state={
      value: props.value,
    }

    this.onComposition = false
    this.handleComposition = this.handleComposition.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.propsHandleChange = (
      props.debounce ? 
      debounce(props.onChange, props.debounce) :
      props.onChange
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({value: nextProps.value})
    }
  }

  handleComposition(e) {
    if (e.type === 'compositionend') {
      this.onComposition = false
    } else {
      this.onComposition = true
    }
  }

  handleChange(value) {
    this.setState({
      value: value,
    }, () => {
      if (this.onComposition) return
      this.propsHandleChange(value)
    })
  }

  render() {
    const {                     // eslint-disable-next-line
      tagName, debounce, refc, 
      ...other,
    } = this.props
    const Tag = tagName   
    return (
      <Tag 
        {...other}
        onCompositionStart={this.handleComposition} 
        onCompositionUpdate={this.handleComposition} 
        onCompositionEnd={this.handleComposition}
        ref={c => {
          refc(c)
          return c
        }} 
        onChange={(e) => {
          this.handleChange(e.target.value)
        }} 
        value={this.state.value}
      />
    )
  }
}

Input.defaultProps = {
  tagName: 'input',
  type: 'text',
  value: '',
  onChange: function(value){},
  refc: function(c) {},
}

export default Input