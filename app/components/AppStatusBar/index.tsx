import {type ComponentProps, type Ref, forwardRef} from 'react';
import {StatusBar} from 'react-native';
import {useTheme} from 'styled-components/native';

type StatusBarRef = Ref<typeof StatusBar>;

type StatusBarProps = ComponentProps<typeof StatusBar> & {
  ref?: StatusBarRef;
};

const AppStatusBar = forwardRef<StatusBar, StatusBarProps>((props, ref) => {
  const theme = useTheme();
  const barStyle = theme.mode === 'dark' ? 'light-content' : 'dark-content';
  const backgroundColor = theme.colors.textPrimary;

  return (
    <StatusBar
      {...props}
      ref={ref}
      barStyle={props.barStyle ?? barStyle}
      backgroundColor={props.backgroundColor ?? backgroundColor}
    />
  );
});

export default AppStatusBar;
