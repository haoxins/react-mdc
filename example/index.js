
import React, { Component } from 'react'
import { render } from 'react-dom'

import {
  CheckboxLabel,
  SwitchLabel,
  IconToggle,
  Elevation,
  Checkbox,
  Snackbar,
  Switch,
  Button,
  Radio,
  Fab
} from '../'

class App extends Component {

  state = {
    indeterminate: false,
    checked: true,

    snackbar2Hidden: true,
    snackbarHidden: true,

    togglePressed: true,

    checkedRadio: ''
  }

  render() {
    const {
      indeterminate,
      checked,

      snackbar2Hidden,
      snackbarHidden,

      togglePressed,

      checkedRadio
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
          <Radio name='radio' checked={checkedRadio === 'radio-01'}
            onChange={checked => {
              if (checked) {
                this.setState({checkedRadio: 'radio-01'})
              }
            }} />
          <Radio name='radio' checked={checkedRadio === 'radio-02'}
            onChange={checked => {
              if (checked) {
                this.setState({checkedRadio: 'radio-02'})
              }
            }} />
          <Radio name='radio' checked={checkedRadio === 'radio-03'}
            onChange={checked => {
              if (checked) {
                this.setState({checkedRadio: 'radio-03'})
              }
            }} />
          <Radio name='disabled-radio' disabled />
          <Radio name='disabled-radio' checked disabled />
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
          <div>
            <Switch id='switch-example' />
            <SwitchLabel for='switch-example'>
              switch example
            </SwitchLabel>
          </div>
          <div>
            <Switch disabled />
          </div>
        </section>

        <section>
          <Fab icon='favorite' />
          <Fab icon='star' mini />
          <Fab icon='star' plain />
          <Fab icon='star' plain mini />
          <Fab icon='star' disabled />
        </section>
        <section>
          <IconToggle data-toggle-on={{label: 'Remove from favorites', content: 'favorite'}}
            data-toggle-off={{label: 'Add to favorites', content: 'favorite_border'}}
            pressed={togglePressed}
            onChange={isOn => this.setState({togglePressed: isOn})} />
          <IconToggle data-toggle-on={{label: 'Remove from favorites', content: 'favorite'}}
            data-toggle-off={{label: 'Add to favorites', content: 'favorite_border'}}
            pressed={true} disabled />
        </section>
        <section>
          <Snackbar hidden={snackbarHidden} message='hello snackbar 1' />
          <Snackbar hidden={snackbar2Hidden} message='hello snackbar 2'
            actionText='DONE' actionHidden={false} multiline
            actionHandler={() => console.info('action handler done')} />
          <button onClick={() => {
            this.setState({snackbarHidden: false})
            setTimeout(() => {
              this.setState({snackbarHidden: true})
            }, 1000)
          }}>show snackbar</button>
          <button onClick={() => {
            this.setState({snackbar2Hidden: false})
            setTimeout(() => {
              this.setState({snackbar2Hidden: true})
            }, 1000)
          }}>show snackbar with action</button>
        </section>
        <section>
          <Elevation z={12}>
            <Button>12dp</Button>
          </Elevation>
          <Elevation z={12} translate>
            <Button>12dp</Button>
          </Elevation>
        </section>
      </article>
    )
  }
}

window.init = () => {
  render(<App />, document.querySelector('body > main'))
}
