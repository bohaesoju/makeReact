import Component2 from "./core/Component2.js";
import { store, setA, setB } from './store2.js';

const InputA = () => `<input id ="stateA" value="${store.getState().a}" size="5" />`
const InputB = () => `<input id ="stateB" value="${store.getState().b}" size="5" />`
const Calculator = () => `<p>a + b = ${store.getState().a + store.getState().b}</p>`

export default class AppComponent3 extends Component2 {
  template () {
    return `
      ${InputA()}
      ${InputB()}
      ${Calculator()}
    `;
  }

  setEvent () {
    const { $el } = this;

    $el.querySelector('#stateA').addEventListener('change', ({ target }) => {
      // commit 을 통해서 값을 변경시킨다.
      store.dispatch(setA(Number(target.value)));
    })

    $el.querySelector('#stateB').addEventListener('change', ({ target }) => {
      store.setState(setB(Number(target.value)));
    })
  }

}