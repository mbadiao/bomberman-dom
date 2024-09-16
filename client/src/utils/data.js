
class websock {
  constructor(url) {
    this.ws = null;
  }

  init(url) {
    this.ws = new WebSocket(url);
    this.ws.onopen = this.onopen;
    this.ws.onmessage = this.onmessage;
    this.ws.onclose = this.onclose;
    this.ws.onerror = this.onerror;
  }

  onopen() {
    console.log('websocket open');
  }

  onmessage(e) {
    console.log('websocket message', e.data);
  }

  onclose() {
    console.log('websocket close');
  }

  onerror() {
    console.log('websocket error');
  }

  send(data) {
    this.ws.send(data);
  }
}