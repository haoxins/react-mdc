
import '@material/switch/dist/mdc.switch.css'

import React, { Component, PropTypes } from 'react'
import classnames from 'classnames/dedupe'

export class SwitchLabel extends Component {
  static propTypes = {
    for: PropTypes.string.isRequired,
  }

  render() {
    const controlId = this.props['for']
    const { children } = this.props

    return (
      <label htmlFor={controlId} className='mdc-switch-label'>
        {children}
      </label>
    )
  }
}

export class Switch extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    id: PropTypes.string,
  }

  static defaultProps = {
    onChange: () => {}
  }

  render() {
    const {
      onChange,
      disabled,
      id
    } = this.props

    const classes = classnames('mdc-switch__native-control', {
      'mdc-switch--disabled': disabled
    })

    return (
      <div className='mdc-switch'>
        <input id={id} type='checkbox' className={classes}
          onChange={e => {
            onChange(e.target.checked, e)
          }} />
        <div className='mdc-switch__background'>
          <div className='mdc-switch__knob'></div>
        </div>
      </div>
    )
  }
}
