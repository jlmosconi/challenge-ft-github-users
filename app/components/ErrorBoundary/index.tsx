import {Component, type ErrorInfo, type ReactNode} from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import {navigate} from '@utils/navigation';
import {MainScreen} from '@navigators/screenRoutes';
import Button from '@components/Button';
import SafeArea from '@components/SafeArea';
import EmptyState from '@components/EmptyState';
import {IconName} from '@components/Icon/icons';
import {CTAWrapper, Wrapper} from './styled';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface Props {
  children: ReactNode;
  errorTitle?: string;
  ctaLabel?: string;
}

class ErrorBoundary extends Component<Props, ErrorBoundaryState> {
  constructor(props: Props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    crashlytics().recordError(error);
    console.error('Error from ErrorBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({hasError: false});
    navigate(MainScreen.Home);
  };

  render() {
    if (this.state.hasError) {
      return this.props.children;
    }

    return (
      <SafeArea>
        <Wrapper>
          <EmptyState
            iconName={IconName.Error}
            text={this.props.errorTitle || 'An unexpected error occurred.'}
            iconTestID="errorImage"
            textTestID="errorTitle"
          />
          <CTAWrapper>
            <Button title={this.props.ctaLabel || 'Retry'} onPress={this.handleRetry} />
          </CTAWrapper>
        </Wrapper>
      </SafeArea>
    );
  }
}

export default ErrorBoundary;
