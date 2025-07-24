import {render, fireEvent} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';
import {lightTheme} from '@config/theme';
import Button from '.';

describe('Button', () => {
  // Helper function to render the Button with the light theme
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
  };

  it('renders the button with the given title', () => {
    const {getByText} = renderWithTheme(<Button title="Click me" />);
    expect(getByText('Click me23')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = renderWithTheme(<Button title="Press here" onPress={onPressMock} />);

    fireEvent.press(getByText('Press here'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress if disabled', () => {
    const onPressMock = jest.fn();
    const {getByText} = renderWithTheme(<Button title="Disabled" onPress={onPressMock} disabled />);

    fireEvent.press(getByText('Disabled'));
    expect(onPressMock).toHaveBeenCalledTimes(0);
  });
});
