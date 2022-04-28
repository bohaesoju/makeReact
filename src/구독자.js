export default class 구독자 {
  #fn;

  constructor (발행기관에_변화가_생길_때_하는_일) {
    this.#fn = 발행기관에_변화가_생길_때_하는_일;
  }

  구독 (publisher) {
    publisher.구독자_등록(this.#fn);
  }
}
