const { nextI18NextRewrites } = require('next-i18next/rewrites');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const localeSubpaths = {
  de: 'de',
  en: 'en',
};

module.exports = (phase) => {
  let DEV_USER_UID;
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    DEV_USER_UID = 'fUl2uRrJV4hzg2r077loNCLDajL2';
  }
  return {
    rewrites: async () => nextI18NextRewrites(localeSubpaths),
    publicRuntimeConfig: {
      localeSubpaths,
    },
    env: {
      DEV_USER_UID,
    },
  };
};
