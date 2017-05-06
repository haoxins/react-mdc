
import '@material/checkbox/dist/mdc.checkbox.css'

import classnames from 'classnames/dedupe'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class CheckboxLabel extends Component {
  static propTypes = {
    for: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }

  render() {
    const { id, children } = this.props
    const controlId = this.props['for']

    return (
      <label className='mdc-checkbox-label'
        id={id} htmlFor={controlId}>
        {children}
      </label>
    )
  }
}

export class Checkbox extends Component {
  static propTypes = {
    indeterminate: PropTypes.bool,
    labelId: PropTypes.string,
    checked: PropTypes.bool,
    id: PropTypes.string,
    onChange: PropTypes.func
  }

  static defaultProps = {
    indeterminate: false,
    checked: false,
    onChange: () => {}
  }

  state = {
    indeterminateInternal: false,
    checkedInternal: false,
    classes: ''
  }

  // TODO - foundation

  componentDidMount() {
    const {
      indeterminate,
      checked
    } = this.props

    if (indeterminate) {
      this.setState({
        indeterminateInternal: indeterminate
      })
    }

    if (checked) {
      this.setState({
        indeterminateInternal: false,
        checkedInternal: checked
      })
    }
  }

  componentWillReceiveProps(props) {
    if (props.indeterminate !== this.props.indeterminate) {
      this.setState({
        indeterminateInternal: props.indeterminate
      })
    }

    if (props.checked !== this.props.checked) {
      this.setState({
        checkedInternal: props.checked,
        indeterminateInternal: false
      })
    }
  }

  componentDidUpdate() {
    if (this.refs.nativeCb) {
      this.refs.nativeCb.indeterminate = this.state.indeterminateInternal
    }
  }

  render() {
    const {
      onChange,
      labelId,
      id
    } = this.props

    const {
      checkedInternal,
      classes
    } = this.state

    const className = classnames('mdc-checkbox', classes)

    return (
      <div ref='root' className={className}>
        <input ref='nativeCb' type='checkbox' id={id}
          className='mdc-checkbox__native-control'
          aria-labelledby={labelId}
          checked={checkedInternal}
          onChange={e => {
            const checked = this.refs.nativeCb.checked

            this.setState({
              indeterminateInternal: false,
              checkedInternal: checked
            })

            onChange(checked, e)
          }} />
        <div className='mdc-checkbox__background'>
          <svg version='1.1' xmlns='http://www.w3.org/2000/svg'
            className='mdc-checkbox__checkmark'
            viewBox='0 0 24 24'>
            <path className='mdc-checkbox__checkmark__path'
              fill='none' stroke='white'
              d='M1.73,12.91 8.1,19.28 22.79,4.59' />
          </svg>
          <div className='mdc-checkbox__mixedmark' />
        </div>
      </div>
    )
  }
}
