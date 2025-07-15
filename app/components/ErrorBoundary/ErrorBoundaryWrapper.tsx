import type {FC, PropsWithChildren} from 'react';
import ErrorBoundary from '.';
import {useLanguage} from '@hooks/useLanguage';

const ErrorBoundaryWrapper: FC<PropsWithChildren> = ({children}) => {
  const {t} = useLanguage();

  return (
    <ErrorBoundary errorTitle={t('error_boundary.title')} ctaLabel={t('error_boundary.cta')}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
