
import '@material/textfield/dist/mdc.textfield.css'

import { MDCTextfieldFoundation } from '@material/textfield'
import classnames from 'classnames/dedupe'
import React, { Component } from 'react'
import pickby from 'lodash.pickby'
import PropTypes from 'prop-types'

const baseClasses = {
  'mdc-textfield': true
}

class TextField extends Component {
  static propTypes = {
    className: PropTypes.string,

    helptextPersistent: PropTypes.bool,
    placeholder: PropTypes.string,
    helptext: PropTypes.string,
    fullwidth: PropTypes.bool,
    multiline: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
  }

  static defaultProps = {
    disabled: false,
    type: 'text',
    id: ''
  }

  state = {
    helptextClasses: '',
    helptextAttrs: {},
    labelClasses: '',
    classes: '',
  }

  registerInputHandler(name, handler) {
    if (this.refs.input) {
      this.refs.input.addEventListener(name, handler)
    }
  }

  deregisterInputHandler(name, handler) {
    if (this.refs.input) {
      this.refs.input.removeEventListener(name, handler)
    }
  }

  foundation = new MDCTextfieldFoundation({
    addClass: className => this.setState(prevState => ({
      classes: classnames(prevState.classes, className)
    })),
    removeClass: className => this.setState(prevState => ({
      classes: classnames(prevState.classes, {
        [className]: false
      })
    })),
    addClassToLabel: className => this.setState(prevState => ({
      labelClasses: classnames(prevState.labelClasses, className)
    })),
    removeClassFromLabel: className => this.setState(prevState => ({
      labelClasses: classnames(prevState.labelClasses, {
        [className]: false
      })
    })),
    addClassToHelptext: className => this.setState(prevState => ({
      helptextClasses: classnames(prevState.helptextClasses, className)
    })),
    removeClassFromHelptext: className => this.setState(prevState => ({
      helptextClasses: classnames(prevState.helptextClasses, {
        [className]: false
      })
    })),
    helptextHasClass: className => {
      return !!(this.state.helptextClasses && this.state.helptextClasses.length)
    },
    registerInputFocusHandler: handler => {
      this.registerInputHandler('focus', handler)
    },
    deregisterInputFocusHandler: handler => {
      this.deregisterInputHandler('focus', handler)
    },
    registerInputBlurHandler: handler => {
      this.registerInputHandler('blur', handler)
    },
    deregisterInputBlurHandler: handler => {
      this.deregisterInputHandler('blur', handler)
    },
    registerInputInputHandler: handler => {
      this.registerInputHandler('input', handler)
    },
    deregisterInputInputHandler: handler => {
      this.deregisterInputHandler('input', handler)
    },
    registerInputKeydownHandler: handler => {
      this.registerInputHandler('keydown', handler)
    },
    deregisterInputKeydownHandler: handler => {
      this.deregisterInputHandler('keydown', handler)
    },
    setHelptextAttr: (name, value) => {
      this.setState(prevState => ({
        helptextAttrs: {
          ...prevState.helptextAttrs,
          [name]: value
        }
      }))
    },
    removeHelptextAttr: name => {
      this.setState(prevState => ({
        helptextAttrs: pickby(prevState.helptextAttrs, (_, k) => k !== name)
      }))
    },
    getNativeInput: () => this.refs.input,
  })

  componentDidMount() {
    this.foundation.init()
  }

  componentWillUnmount() {
    this.foundation.destroy()
  }

  render() {
    const {
      className,

      helptextPersistent,
      placeholder,
      fullwidth,
      multiline,
      disabled,
      helptext,
      label,
      type,
      id,

      ...props
    } = this.props

    const {
      helptextAttrs
    } = this.state

    const classes = classnames(baseClasses, this.state.calsses, {
      'mdc-textfield--fullwidth': fullwidth,
      'mdc-textfield--multiline': multiline,
      'mdc-textfield--disabled': disabled,
    }, className)

    const labelClasses = classnames('mdc-textfield__label', this.state.labelClasses)
    const helptextClasses = classnames('mdc-textfield-helptext',
      this.state.helptextClasses, {
        'mdc-textfield-helptext--persistent': helptextPersistent
      })

    return (
      <div>
        <div className={classes}>
          <input ref='input' id={id} type={type} className='mdc-textfield__input'
            placeholder={placeholder} disabled={disabled} />
          {
            !!label && (
              <label htmlFor={id} className={labelClasses}>
                {label}
              </label>
            )
          }
        </div>
        {
          !!helptext && (
            <p className={helptextClasses} {...helptextAttrs}>
              {helptext}
            </p>
          )
        }
      </div>
    )
  }
}

export default TextField
