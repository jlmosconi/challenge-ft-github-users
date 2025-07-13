import {render} from '@testing-library/react-native';
import FavoriteButton from '../FavoriteButton';
import {ThemeProvider} from 'styled-components/native';
import {lightTheme} from '@config/theme';
import {IconName} from '@components/Icon/icons';

// Mock SpecificSizeIcon as a <View> with testID
jest.mock('@components/Icon/SpecificSize', () => {
  const {View} = require('react-native');
  //   Mock implementation of SpecificSizeIcon and return a simple View with testID
  return (props: import('@components/Icon/SpecificSize/types').SpecificSizeIconProps) => {
    return <View testID="mockSpecificSizeIcon" {...props} />;
  };
});

describe('FavoriteButton', () => {
  // FavoriteButton uses `useTheme()` from styled-components internally,
  // so we need to wrap it with ThemeProvider to avoid errors in tests.
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
  };

  it('renders the empty star icon when not favorite', () => {
    const {getByTestId} = renderWithTheme(<FavoriteButton isFavorite={false} />);

    expect(getByTestId('mockSpecificSizeIcon').props.name).toBe(IconName.StarEmpty);
  });

  it('renders the filled star icon when favorite', () => {
    const {getByTestId} = renderWithTheme(<FavoriteButton isFavorite={true} />);

    expect(getByTestId('mockSpecificSizeIcon').props.name).toBe(IconName.StarFilled);
  });
});
