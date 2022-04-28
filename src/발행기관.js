export default class 발행기관 {
  #state;
  #observers = new Set();

  constructor (state) {
    this.#state = state;
    Object.keys(state).forEach(key => Object.defineProperty(this, key, {
      get: () => this.#state[key]
    }));
  }

  내부에_변화가_생김 (newState) {
    this.#state = { ...this.#state, ...newState };
    this.구독자에게_알림();
  }

  구독자_등록 (subscriber) {
    this.#observers.add(subscriber);
  }

  구독자에게_알림 () {
    this.#observers.forEach(fn => fn());
  }
}