import { withTranslation } from '../i18n';
import type { NextPageContext } from 'next';
import { TFunction } from 'next-i18next';

const Error = ({
  statusCode,
  t,
}: {
  statusCode: number | null;
  t: TFunction;
}): React.ReactElement => (
  <p>
    {statusCode
      ? t('error-with-status', { statusCode })
      : t('error-without-status')}
  </p>
);

Error.getInitialProps = async ({ res, err }: NextPageContext) => {
  let statusCode = null;
  if (res) {
    ({ statusCode } = res);
  } else if (err) {
    ({ statusCode } = err);
  }
  return {
    namespacesRequired: ['common'],
    statusCode,
  };
};

Error.defaultProps = {
  statusCode: null,
};

export default withTranslation('common')(Error);
