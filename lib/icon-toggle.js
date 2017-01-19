
import '@material/icon-toggle/dist/mdc.icon-toggle.css'

import { MDCIconToggleFoundation } from '@material/icon-toggle'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames/dedupe'
import pickby from 'lodash.pickby'

const baseClasses = {
  'mdc-icon-toggle': true,
  'material-icons': true
}

class IconToggle extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    pressed: PropTypes.bool
  }

  static defaultProps = {
    onChange: () => {},
    pressed: false
  }

  state = {
    pressedInternal: false,
    tabIndex: 0,
    classes: '',
    attrs: {},
    text: ''
  }

  // TODO: ripple

  foundation = new MDCIconToggleFoundation({
    addClass: className => this.setState(prevState => ({
      classes: classnames(prevState.classes, className)
    })),
    removeClass: className => this.setState(prevState => ({
      classes: classnames(prevState.classes, {
        [className]: false
      })
    })),
    registerInteractionHandler: (type, handler) => {
      if (this.refs.root) {
        this.refs.root.addEventListener(type, handler)
      }
    },
    deregisterInteractionHandler: (type, handler) => {
      if (this.refs.root) {
        this.refs.root.removeEventListener(type, handler)
      }
    },
    setText: text => this.setState({text}),
    getTabIndex: () => this.state.tabIndex,
    setTabIndex: tabIndex => this.setState({tabIndex}),
    getAttr: name => {
      const value = this.props[name]
      if (typeof value === 'object') {
        return JSON.stringify(value)
      }

      return value
    },
    setAttr: (name, value) => {
      const { attrs } = this.state

      this.setState({
        attrs: {
          ...attrs,
          [name]: value
        }
      })
    },
    rmAttr: name => this.setState(prevState => ({
      attrs: pickby(prevState.attrs, (_, k) => k !== name)
    })),
    notifyChange: e => {
      this.setState({pressedInternal: e.isOn})
      this.props.onChange(e.isOn, e)
    }
  })

  componentDidMount() {
    this.foundation.init()

    let isOn = false

    const { disabled, pressed } = this.props

    if (disabled) {
      this.foundation.setDisabled(true)
    }

    if (pressed) {
      this.setState({
        pressedInternal: true
      })
      isOn = true
    }

    this.foundation.toggle(isOn)

    const data = (isOn ? this.props['data-toggle-on'] : this.props['data-toggle-off']) || {}

    if (data.content) {
      this.setState({
        text: data.content
      })
    }
  }

  componentWillUnmount() {
    this.foundation.destroy()
  }

  componentWillReceiveProps(props) {
    if (props.pressed !== this.props.pressed) {
      this.setState({
        pressedInternal: props.pressed
      })
    }

    if (props.disabled !== this.props.disabled) {
      this.foundation.setDisabled(props.disabled)
    }
  }

  render() {
    const {
      className
    } = this.props

    const {
      pressedInternal,
      tabIndex,
      attrs,
      text
    } = this.state

    const classes = classnames(baseClasses, className, this.state.classes)

    return (
      <i className={classes} ref='root' role='button' {...attrs}
        aria-pressed={String(pressedInternal)}
        tabIndex={String(tabIndex)}>
        {text}
      </i>
    )
  }
}

export default IconToggle
