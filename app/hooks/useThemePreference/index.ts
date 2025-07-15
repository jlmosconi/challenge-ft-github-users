import {useCallback} from 'react';
import {ThemeMode, ThemePreference} from '@config/theme';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {selectThemeMode, setThemePreference} from '@store/slices/theme';

export const useThemePreference = () => {
  const dispatch = useAppDispatch();
  const currentMode = useAppSelector(selectThemeMode);

  const toggleTheme = useCallback(() => {
    const preference = currentMode === ThemeMode.Dark ? ThemePreference.Light : ThemePreference.Dark;
    const mode = currentMode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark;

    dispatch(
      setThemePreference({
        preference,
        mode,
      }),
    );
  }, [dispatch, currentMode]);

  return {
    currentMode,
    toggleTheme,
  };
};
