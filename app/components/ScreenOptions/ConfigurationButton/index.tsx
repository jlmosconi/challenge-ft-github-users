import {type FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'styled-components/native';
import {IconName} from '@components/Icon/icons';
import SpacingBox from '@components/SpacingBox';
import SpecificSizeIcon from '@components/Icon/SpecificSize';

interface ConfigurationButtonProps {
  onPress?: () => void;
}

const ConfigurationButton: FC<ConfigurationButtonProps> = ({onPress}) => {
  const theme = useTheme();
  return (
    <SpacingBox mr={2}>
      <TouchableOpacity onPress={onPress} testID="configurationButton">
        <SpecificSizeIcon size={22} name={IconName.Settings} color={theme.colors.textPrimary} />
      </TouchableOpacity>
    </SpacingBox>
  );
};

export default ConfigurationButton;
