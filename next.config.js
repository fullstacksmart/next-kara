const { nextI18NextRewrites } = require('next-i18next/rewrites');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const localeSubpaths = {
  de: 'de',
  en: 'en',
};

module.exports = (phase) => {
  let uid;
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    uid = 'fUl2uRrJV4hzg2r077loNCLDajL2';
  }
  return {
    rewrites: async () => nextI18NextRewrites(localeSubpaths),
    publicRuntimeConfig: {
      localeSubpaths,
    },
    env: {
      uid,
    },
  };
};
