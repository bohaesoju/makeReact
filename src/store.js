import { observable } from './core/observer';

export const store = {
  state: observable({
    a: 10,
    b: 20,
  }),

  setState (newState) {
    // Object.entries 은 객체의 key, value 속성 리턴
    for (const [key, value] of Object.entries(newState)) {
      // continue 문은 명령문의 실행을 종료하고 반복문의 처음으로 돌아가 다음코드 실행
      if (!this.state[key]) continue;
      this.state[key] = value;
    }
  }
}