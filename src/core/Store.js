import { observable } from './observable';

export const createStore = (reducer) => {

  // reducer 가 실행될 때 반환하는 객체(state) 를 observable 로 만들어야 한다.
  const state = observable(reducer());

  // getState 가 실제 state 를 반환하는 것이 아니라 frozenState 를 반환하도록 만들어야 한다.
  const frozenState = {};

  // Object.keys 는 객체의 키 값을 배열로 반환한다.
  Object.keys(state).forEach(key => {
    Object.defineProperty(frozenState, key, {
      get: () => state[key],
    })
  });

  // dispatch 로만 state 의 값을 변경할 수 있다.
  const dispatch = (action) => {
    const newState = reducer(state, action);

    for (const [key, value] of Object.entries(newState)) {
      // state 의 key 가 아닐 경우 변경 생략
      if (!state[key]) continue;
      state[key] = value;
    }
  }

  const getState = () => frozenState;

  // subscribe 는 observe 로 대체한다.
  return { getState, dispatch }
}