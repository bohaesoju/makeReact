/* @jsx createElement */

import { createElement, renderRealDOM, updateElement } from './react';

const oldState = [
  { id: 1, completed: false, content: 'todo list item 1' },
  { id: 2, completed: true, content: 'todo list item 2' },
];

const newState = [
  { id: 1, completed: true, content: 'todo list item 1' },
  { id: 2, completed: true, content: 'todo list item 2' },
  { id: 3, completed: false, content: 'todo list item 3' },
];

const render = (state) => (
  <ul id="container">
    { state.map(({ completed, content }) => (
        <li class={completed ? 'completed' : null}>
          <input type="checkbox" class="toggle" checked={completed} />
          { content }
          <button class="remove">삭제</button>
        </li>
      )) }
  </ul>
)

const oldNode = render(oldState);
const newNode = render(newState);

const $root = document.createElement('div');

document.body.appendChild($root);

updateElement($root, oldNode);

setTimeout(() => 
  updateElement($root, newNode, oldNode),
  3000
); // 1초 뒤에 DOM 변경

// document
//   .querySelector('#root')
//   .appendChild(renderRealDOM(jsxDom))



