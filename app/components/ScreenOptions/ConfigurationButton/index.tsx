import {type FC} from 'react';
import HeaderButton from '@components/ScreenOptions/HeaderButton';
import {IconName} from '@components/Icon/icons';

interface ConfigurationButtonProps {
  onPress?: () => void;
  accessibilityLabel?: string;
}

const ConfigurationButton: FC<ConfigurationButtonProps> = ({onPress, accessibilityLabel}) => (
  <HeaderButton
    iconName={IconName.Settings}
    spacingRight={2}
    testID="configurationButton"
    onPress={onPress}
    accessibilityLabel={accessibilityLabel}
  />
);

export default ConfigurationButton;
