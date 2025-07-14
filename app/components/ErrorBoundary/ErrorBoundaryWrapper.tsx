import type {ReactNode, FC} from 'react';
import ErrorBoundary from '.';
import {useLanguage} from '@hooks/useLanguage';

const ErrorBoundaryWrapper: FC<{children: ReactNode}> = ({children}) => {
  const {t} = useLanguage();

  return (
    <ErrorBoundary errorTitle={t('error_boundary.title')} ctaLabel={t('error_boundary.cta')}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
