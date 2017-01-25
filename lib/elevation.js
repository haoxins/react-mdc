
import '@material/elevation/dist/mdc.elevation.css'

import React, { Component, PropTypes } from 'react'
import classnames from 'classnames/dedupe'

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
