import type { NextPageContext } from 'next';
import { useTranslation } from 'react-i18next';

const Error = ({
  statusCode,
}: {
  statusCode: number | null;
}): React.ReactElement => {
  const { t } = useTranslation('common');

  return (
    <p>
      {statusCode
        ? t('error-with-status', { statusCode })
        : t('error-without-status')}
    </p>
  );
};

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

export default Error;
