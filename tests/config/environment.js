/*
  circumvent jest bug that prevents firestore tests with jsdom env
  https://github.com/firebase/firebase-js-sdk/issues/3096
  https://github.com/dconeybe/FirebaseJsBug3096
*/

const BrowserEnvironment = require('jest-environment-jsdom');

class CustomEnvironment extends BrowserEnvironment {
  constructor (config) {
    super(
      Object.assign({}, config, {
        globals: Object.assign({}, config.globals, {
          Uint32Array: Uint32Array,
          Uint8Array: Uint8Array,
          ArrayBuffer: ArrayBuffer
        })
      })
    );
  }

  async setup () {}
  async teardown () {}
}

module.exports = CustomEnvironment;
