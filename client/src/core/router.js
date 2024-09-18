import ErrorPage from '../components/templates/error.js'

class Router {
  constructor() {
    this.routes = {};
    window.onload = this.#navigate.bind(this);
    window.onhashchange = this.#navigate.bind(this);
  }

  // Register a new route with its associated handler.
  add(route, handler) {
    this.routes[route] = handler;
  }

  // Triggered whenever the address link is changed.
  #navigate() {
    this.currentRoute = window.location.hash.slice(1) || '/';
    this.#handle(this.currentRoute);
  }

  // The handler is supposed to trigger
  // components re-rendering depending on the state.
  #handle(route) {
    this.routes[route]
      ? this.routes[route]()
      : this.#error();
  }

  #error() {
    document.body.innerHTML = '',
    document.body.appendChild(new ErrorPage('404', 'Not Found !').render())
  }
}

export default new Router();