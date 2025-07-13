import Toggle from '@components/Toggle';
import {ThemeMode, ThemePreference} from '@config/theme';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {selectThemeMode, setThemePreference} from '@store/slices/theme';
import {FC, useCallback} from 'react';
import {View, Text, Pressable} from 'react-native';

const ConfigurationScreen: FC = () => {
  const dispatch = useAppDispatch();
  const currentMode = useAppSelector(selectThemeMode);
  const onChangeAppearance = useCallback(() => {
    const preference = currentMode === ThemeMode.Dark ? ThemePreference.Light : ThemePreference.Dark;
    const mode = currentMode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark;

    dispatch(
      setThemePreference({
        preference,
        mode,
      }),
    );
  }, [dispatch, currentMode]);

  return (
    <View>
      <Pressable onPress={onChangeAppearance}>
        <Text style={{color: currentMode === ThemeMode.Dark ? 'white' : 'black'}}>ConfigurationScreen</Text>
        <Toggle testID="theme-toggle" checked={currentMode === ThemeMode.Dark} />
      </Pressable>
    </View>
  );
};
export default ConfigurationScreen;
