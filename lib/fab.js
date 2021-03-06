
import '@material/fab/dist/mdc.fab.css'

import classnames from 'classnames/dedupe'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const baseClasses = {
  'material-icons': true,
  'mdc-fab': true
}

class Fab extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    plain: PropTypes.bool,
    mini: PropTypes.bool
  }

  static defaultProps = {
    plain: false,
    mini: false
  }

  render() {
    const {
      className,
      plain,
      mini,
      icon,

      ...props
    } = this.props

    const classes = classnames(baseClasses, {
      'mdc-fab--plain': plain,
      'mdc-fab--mini': mini
    }, className)

    return (
      <button {...props} className={classes} aria-label={icon}>
        <span className='mdc-fab__icon'>
          {icon}
        </span>
      </button>
    )
  }
}

export default Fab
