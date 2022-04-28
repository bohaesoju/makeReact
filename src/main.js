const state = observable({
  a: 10,
  b: 20,
});

const $app = document.querySelector('#root');

const render = () => {
  $app.innerHTML = `
    <p>a + b = ${state.a + state.b}</p>
    <input id="stateA" value="${state.a}" />
    <input id="stateB" value="${state.b}" />
  `;

  $app.querySelector('#stateA').addEventListener('c')
}