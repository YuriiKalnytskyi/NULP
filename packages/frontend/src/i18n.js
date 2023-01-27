import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import uk from './translations/uk.json';
import en from './translations/en.json';

const resources = {
  uk: { translation: uk },
  en: { translation: en }
};

// export const availableLanguages = Object.keys(resources);

// i18n.use(initReactI18next).use(LanguageDetector).init({
//   resources,
//   defaultNS: 'common',
//   fallbackLng: 'de',
// });

// i18n.use(initReactI18next).init({
//   resources,
//   defaultNS: 'common',
//   fallbackLng: 'uk',
// });

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'uk',
    supportedLngs: ['uk', 'en', 'tr', 'es'],
    detection: {
      checkWhitelist: true
    },

    whitelist: ['en', 'uk', 'tr', 'es'],

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
