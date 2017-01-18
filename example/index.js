
import React, { Component } from 'react'
import { render } from 'react-dom'

import {
  CheckboxLabel,
  Checkbox,
  Button,
  Fab
} from '../'

class App extends Component {

  state = {
    indeterminate: false,
    checked: true
  }

  render() {
    const {
      indeterminate,
      checked
    } = this.state

    return (
      <article>
        <section>
          <Button disabled compact>compact</Button>
          <Button raised primary>raised</Button>
          <Button compact>compact</Button>
          <Button primary>primary</Button>
          <Button accent>accent</Button>
          <Button raised>raised</Button>
          <Button dense onClick={
            () => console.info('dense')
          }>dense</Button>
        </section>

        <section>
          <div>
            <Checkbox id='checkbox-01' labelId='checkbox-label-01'
              indeterminate={indeterminate} checked={checked}
              onChange={checked => this.setState({checked})} />
            <CheckboxLabel id='checkbox-label-01' for='checkbox-01'>
              The checkbox is {checked ? 'checked' : 'not checked'}
            </CheckboxLabel>
          </div>
          <div>
            <button onClick={() => this.setState({indeterminate: true})}>
              make indeterminate
            </button>
            <button onClick={() => this.setState({checked: false})}>
              uncheck
            </button>
            <button onClick={() => this.setState({checked: true})}>
              check
            </button>
          </div>
        </section>
        <section>
          <Fab icon='favorite' />
          <Fab icon='star' mini />
          <Fab icon='star' plain />
          <Fab icon='star' plain mini />
          <Fab icon='star' disabled />
        </section>
      </article>
    )
  }
}

window.init = () => {
  render(<App />, document.querySelector('body > main'))
}
