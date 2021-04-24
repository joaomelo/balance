export function disableFireauthConsoleWarning () {
  jest.spyOn(global.console, 'info').mockImplementation(message => {
    // disabling noisy firebase auth warning messages
    // https://github.com/firebase/firebase-tools/issues/2773
    if (message.includes('Auth Emulator')) return;

    // eslint-disable-next-line no-console
    return console.log(message);
  });
}
