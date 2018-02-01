
import '@material/form-field/dist/mdc.form-field.css'

import classnames from 'classnames/dedupe'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const baseClasses = {
  'mdc-form-field': true
}

class FormField extends Component {
  static propTypes = {
    className: PropTypes.string,
    alignEnd: PropTypes.bool
  }

  render() {
    const {
      className,
      children,

      alignEnd,

      ...props
    } = this.props

    const classes = classnames(baseClasses, {
      'mdc-form-field--align-end': alignEnd
    }, className)

    return (
      <div {...props} className={classes}>
        {children}
      </div>
    )
  }
}

export default FormField
