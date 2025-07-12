import {type FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'styled-components/native';
import {IconName} from '@components/Icon/icons';
import SpacingBox from '@components/SpacingBox';
import SpecificSizeIcon from '@components/Icon/SpecificSize';

interface StarButtonProps {
  onPress?: () => void;
}

const StarButton: FC<StarButtonProps> = ({onPress}) => {
  const theme = useTheme();
  return (
    <SpacingBox mr={2}>
      <TouchableOpacity onPress={onPress} testID="star-button">
        <SpecificSizeIcon size={22} name={IconName.StarFilled} color={theme.colors.textPrimary} />
      </TouchableOpacity>
    </SpacingBox>
  );
};

export default StarButton;
