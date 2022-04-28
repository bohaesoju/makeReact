
   
import { observable, observe } from './observer.js';

export default class Component2 {
  state; props; $el;

  constructor ($el, props) {
    this.$el = $el;
    this.props = props;
    this.setup();
  }

  setup() {
    this.state = observable(this.initState());
    observe(() => {
      this.render();
      this.setEvent();
      this.mounted();
    });
  }

  initState() { return {} }
  template () { return ''; }
  render () { this.$el.innerHTML = this.template(); }
  setEvent () {}
  mounted () {}
}