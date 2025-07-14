import {type FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'styled-components/native';
import SpacingBox from '@components/SpacingBox';
import SpecificSizeIcon from '@components/Icon/SpecificSize';
import {IconName} from '@components/Icon/icons';

interface BackButtonProps {
  onPress: () => void;
}

const BackButton: FC<BackButtonProps> = ({onPress}) => {
  const theme = useTheme();
  return (
    <SpacingBox ml={2}>
      <TouchableOpacity onPress={onPress} testID="backButton">
        <SpecificSizeIcon size={22} name={IconName.ArrowLeft} color={theme.colors.textPrimary} />
      </TouchableOpacity>
    </SpacingBox>
  );
};

export default BackButton;
