import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import { bundleModulesMessages } from './resources';

export async function initI18nProvider (modules) {
  const resources = bundleModulesMessages(modules);
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      }
    });

  return useTranslation;
}
