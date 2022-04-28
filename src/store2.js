import { createStore } from './core/Store';

const initState = {
  a: 10,
  b: 20,
};

// dispatch 에서 사용될 type 들을 정의해준다.
export const SET_A = 'SET_A';
export const SET_B = 'SET_B';

// reducer 를 정의하여 store 에 넘겨준다.
export const store = createStore((state = initState, action = {}) => {
  switch (action.type) {
    case 'SET_A':
      return { ...state, a: action.payload }
    case 'SET_B':
      return { ...state, b: action.payload }
    default:
      return state;  
  }
});

// reducer 에서 사용될 action 을 정의해준다.
export const setA = (payload) => ({ type: SET_A, payload });
export const setB = (payload) => ({ type: SET_B, payload });