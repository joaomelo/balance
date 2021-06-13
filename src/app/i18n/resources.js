export function bundleModulesMessages (modulesMessages) {
  return modulesMessages.reduce(includeModuleMessages, {});
}

function includeModuleMessages (bundleMessages, moduleMessages) {
  return Object
    .entries(moduleMessages)
    .reduce((newBundle, [locale, messages]) => {
      newBundle[locale] = {
        translation: {
          ...bundleMessages[locale]?.translation,
          ...messages
        }
      };
      return newBundle;
    }, {});
}
