import Unauthorized from 'components/PageComponents/Unauthorized/Unauthorized';
import React, { FC } from 'react';

const withAuthorization =
  <Props extends Record<string, unknown>>(
    Page: React.ComponentType<Props>,
  ): React.ComponentType<Props> =>
  (props, context) => {
    if (context.user === null) return Unauthorized;
    return Unauthorized;
  };
