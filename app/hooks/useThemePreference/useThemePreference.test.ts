import {renderHook, act} from '@testing-library/react-hooks';
import {useThemePreference} from '../useThemePreference';
import {ThemeMode, ThemePreference} from '@config/theme';
import {setThemePreference, selectThemeMode} from '@store/slices/theme';

jest.mock('@store/slices/theme', () => ({
  setThemePreference: jest.fn(payload => ({
    type: 'theme/setThemePreference',
    payload,
  })),
  selectThemeMode: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockUseAppSelector = jest.fn();

jest.mock('@store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (fn: any) => mockUseAppSelector(fn),
}));

describe('useThemePreference', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setupSelectors = (currentMode: ThemeMode) => {
    mockUseAppSelector.mockImplementation(selector => {
      if (selector === selectThemeMode) return currentMode;
    });
  };

  it('should return the current theme mode from selector', () => {
    setupSelectors(ThemeMode.Light);

    const {result} = renderHook(() => useThemePreference());

    expect(result.current.currentMode).toBe(ThemeMode.Light);
  });

  it('should dispatch setThemePreference to dark mode when current mode is light', () => {
    setupSelectors(ThemeMode.Light);

    const {result} = renderHook(() => useThemePreference());

    act(() => {
      result.current.toggleTheme();
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setThemePreference({
        preference: ThemePreference.Dark,
        mode: ThemeMode.Dark,
      }),
    );
  });

  it('should dispatch setThemePreference to light mode when current mode is dark', () => {
    setupSelectors(ThemeMode.Dark);

    const {result} = renderHook(() => useThemePreference());

    act(() => {
      result.current.toggleTheme();
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setThemePreference({
        preference: ThemePreference.Light,
        mode: ThemeMode.Light,
      }),
    );
  });
});
