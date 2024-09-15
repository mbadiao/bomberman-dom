export default class State {
  constructor(initial) {
    this.current = initial || {};
    this.subscribers = [];
  }

  get(state) {
    return this.current[state];
  }

  set(newState, callback = () => {}) {
    this.current = {...this.current, ...newState};
    this.notify();
    callback()
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter(subscriber => subscriber !== callback);
  }

  notify() {
    this.subscribers.forEach(callback => callback(this.current));
  }
}