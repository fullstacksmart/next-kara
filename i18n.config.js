const NextI18Next = require('next-i18next').default;
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig;
const path = require('path');

module.exports = new NextI18Next({
  defaultLanguage: 'de',
  otherLanguages: ['en'],
  fallbackLng: 'de',
  defaultNS: 'common',
  localeSubpaths,
  browserLanguageDetection: false,
  localePath: path.resolve('./public/static/locales'),
});
