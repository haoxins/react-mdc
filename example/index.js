
import { render } from 'react-dom'
import React, { Component } from 'react'

import { Button } from '../'

class App extends Component {

  render() {
    return (
      <article>
        <section>
          <Button disabled compact>compact</Button>
          <Button compact>compact</Button>
          <Button primary>primary</Button>
          <Button accent>accent</Button>
          <Button raised>raised</Button>
          <Button dense onClick={
            () => console.info('dense')
          }>dense</Button>
        </section>
      </article>
    )
  }
}

window.init = () => {
  render(<App />, document.querySelector('body > main'))
}
