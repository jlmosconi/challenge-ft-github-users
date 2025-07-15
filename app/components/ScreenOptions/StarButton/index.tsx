import {type FC} from 'react';
import HeaderButton from '@components/ScreenOptions/HeaderButton';
import {IconName} from '@components/Icon/icons';

interface StarButtonProps {
  onPress?: () => void;
  accessibilityLabel?: string;
}

const StarButton: FC<StarButtonProps> = ({onPress, accessibilityLabel}) => (
  <HeaderButton
    iconName={IconName.StarFilled}
    spacingRight={2}
    testID="starButton"
    onPress={onPress}
    accessibilityLabel={accessibilityLabel}
  />
);

export default StarButton;
