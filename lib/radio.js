
import '@material/radio/dist/mdc.radio.css'

import { MDCRadioFoundation } from '@material/radio'

import classnames from 'classnames/dedupe'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const baseClasses = {
  'mdc-radio': true
}

class Radio extends Component {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    name: PropTypes.string,
    id: PropTypes.string,

    onChange: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {}
  }

  state = {
    classes: ''
  }

  // TODO: ripple

  foundation = new MDCRadioFoundation({
    addClass: className => this.setState(prevState => ({
      classes: classnames(prevState.classes, className)
    })),
    removeClass: className => this.setState(prevState => ({
      classes: classnames(prevState.classes, {
        [className]: false
      })
    })),
    getNativeControl: () => {
      if (!this.refs.radio) {
        throw new Error('native radio not exists')
      }

      return this.refs.radio
    }
  })

  componentDidMount() {
    const { disabled, checked } = this.props

    if (typeof checked === 'boolean') {
      this.foundation.setChecked(checked)
    }

    if (typeof disabled === 'boolean') {
      this.foundation.setDisabled(disabled)
    }
  }

  componentWillUnmount() {
    this.foundation.destroy()
  }

  componentWillReceiveProps(props) {
    const { disabled, checked } = props

    if (typeof checked === 'boolean') {
      this.foundation.setChecked(checked)
    }

    if (typeof disabled === 'boolean') {
      this.foundation.setDisabled(disabled)
    }
  }

  render() {
    const {
      className,
      disabled,
      checked,
      name,
      id,

      onChange,

      ...props
    } = this.props

    const classes = classnames(baseClasses, this.state.classes, {
      'mdc-radio--disabled': disabled
    }, className)

    return (
      <div className={classes}>
        <input {...props} ref='radio' className='mdc-radio__native-control' type='radio'
          id={id} name={name} checked={checked}
          onChange={e => onChange(e.target.checked, e)} />
        <div className='mdc-radio__background'>
          <div className='mdc-radio__outer-circle' />
          <div className='mdc-radio__inner-circle' />
        </div>
      </div>
    )
  }
}

export default Radio
