
import '@material/elevation/dist/mdc.elevation.css'

import classnames from 'classnames/dedupe'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Elevation extends Component {
  static propTypes = {
    z: PropTypes.number.isRequired,
    className: PropTypes.string,
    translate: PropTypes.bool
  }

  static defaultProps = {
    translate: false
  }

  render() {
    const {
      translate,
      className,
      children,
      z,

      ...props
    } = this.props

    const classes = classnames({
      'mdc-elevation-transition': translate,
      [`mdc-elevation--z${z}`]: true
    }, className)

    return (
      <div {...props} className={classes}>
        {children}
      </div>
    )
  }
}

export default Elevation
