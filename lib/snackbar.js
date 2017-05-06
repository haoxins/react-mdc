
import '@material/snackbar/dist/mdc.snackbar.css'
import '@material/button/dist/mdc.button.css'

import { MDCSnackbarFoundation } from '@material/snackbar'
import { getCorrectEventName } from '@material/animation'
import classnames from 'classnames/dedupe'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const baseClasses = {
  'mdc-snackbar': true
}

class Snackbar extends Component {
  static propTypes = {
    hidden: PropTypes.bool.isRequired,
    actionOnBottom: PropTypes.bool,
    actionHandler: PropTypes.func,
    actionText: PropTypes.string,
    actionHidden: PropTypes.bool,

    message: PropTypes.string.isRequired,
    timeout: PropTypes.number,
    multiline: PropTypes.bool
  }

  static defaultProps = {
    actionOnBottom: false,
    multiline: false,
    timeout: 2750
  }

  state = {
    classes: ''
  }

  actionClickHandlers = []

  foundation = new MDCSnackbarFoundation({
    addClass: className => this.setState(prevState => ({
      classes: classnames(prevState.classes, className)
    })),
    removeClass: className => this.setState(prevState => ({
      classes: classnames(prevState.classes, {
        [className]: false
      })
    })),
    setAriaHidden: () => {
      this.setState({hidden: true})
    },
    unsetAriaHidden: () => {
      this.setState({hidden: false})
    },
    setMessageText: message => {
      this.setState({message})
    },
    setActionText: actionText => {
      this.setState({actionText})
    },
    setActionAriaHidden: () => {
      this.setState({actionHidden: true})
    },
    unsetActionAriaHidden: () => {
      this.setState({actionHidden: false})
    },
    registerActionClickHandler: handler => {
      this.actionClickHandlers.push(handler)
    },
    deregisterChangeHandler: handler => {
      const index = this.actionClickHandlers.indexOf(handler)
      if (index !== -1) {
        this.actionClickHandlers.splice(index, 1)
      }
    },
    registerTransitionEndHandler: handler => {
      const name = getCorrectEventName(window, 'transitionend')
      this.refs.root.addEventListener(name, handler)
    },
    deregisterTransitionEndHandler: handler => {
      const name = getCorrectEventName(window, 'transitionend')
      this.refs.root.removeEventListener(name, handler)
    }
  })

  componentDidMount() {
    this.foundation.init()

    const {
      actionHidden,
      hidden
    } = this.props

    if (typeof actionHidden === 'boolean') {
      this.setState({actionHidden})
    }

    this.setState({hidden})

    if (!hidden) {
      this.foundation.show({...this.props})
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      hidden: props.hidden
    })

    if (!props.hidden) {
      this.foundation.show({...props})
    }
  }

  componentWillUnmount() {
    this.foundation.destroy()
  }

  onActionClick = event => {
    this.actionClickHandlers.forEach(handler => handler(event))
  }

  render() {
    const {
      className
    } = this.props

    const {
      actionHidden,
      hidden,

      actionText,
      message,

      classes
    } = this.state

    const rootClasses = classnames(baseClasses, classes, className)

    return (
      <div ref='root' aria-live='assertive' aria-atomic='true'
        className={rootClasses} aria-hidden={hidden}>
        <div className='mdc-snackbar__text'>
          {message}
        </div>
        <div className='mdc-snackbar__action-wrapper'>
          <button className='mdc-button mdc-snackbar__action-button'
            aria-hidden={hidden && actionHidden}
            onClick={this.onActionClick}>
            {actionText}
          </button>
        </div>
      </div>
    )
  }
}

export default Snackbar
