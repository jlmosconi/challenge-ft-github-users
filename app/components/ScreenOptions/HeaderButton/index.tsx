import type {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'styled-components/native';
import SpacingBox from '@components/SpacingBox';
import SpecificSizeIcon from '@components/Icon/SpecificSize';
import type {HeaderButtonProps} from './types';

const HeaderButton: FC<HeaderButtonProps> = ({
  iconName,
  iconSize = 22,
  color,
  spacingRight,
  spacingLeft,
  testID,
  accessibilityLabel,
  onPress,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <SpacingBox mr={spacingRight} ml={spacingLeft}>
      <TouchableOpacity onPress={onPress} testID={testID} {...rest}>
        <SpecificSizeIcon
          size={iconSize}
          name={iconName}
          color={color ?? theme.colors.textPrimary}
          accessible
          accessibilityLabel={accessibilityLabel}
          accessibilityRole="button"
        />
      </TouchableOpacity>
    </SpacingBox>
  );
};

export default HeaderButton;
