export default class Router {
  constructor() {
    this.routes = {};
    window.onhashchange = this.navigate.bind(this);
  }

  // Register a new route with its associated handler.
  add(route, handler) {
    this.routes[route] = handler;
  }

  // Triggered whenever the address link is changed.
  navigate() {
    this.currentRoute = window.location.hash.slice(1) || "/";
    this.#handle(this.currentRoute);
  }

  // The handler is supposed to trigger
  // components re-rendering depending on the state.
  #handle(route) {
    this.routes[route]
      ? this.routes[route]()
      : console.error("404 - Not Found");
  }
}
