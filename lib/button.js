
import '@material/button/dist/mdc.button.css'

import classnames from 'classnames/dedupe'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const baseClasses = {
  'mdc-button': true
}

class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    compact: PropTypes.bool,
    primary: PropTypes.bool,
    accent: PropTypes.bool,
    raised: PropTypes.bool,
    dense: PropTypes.bool
  }

  render() {
    const {
      className,
      children,

      compact,
      primary,
      accent,
      raised,
      dense,

      ...props
    } = this.props

    const classes = classnames(baseClasses, {
      'mdc-button--compact': compact,
      'mdc-button--primary': primary,
      'mdc-button--accent': accent,
      'mdc-button--raised': raised,
      'mdc-button--dense': dense
    }, className)

    return (
      <button {...props} className={classes}>
        {children}
      </button>
    )
  }
}

export default Button
