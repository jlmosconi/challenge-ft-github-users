import {type FC} from 'react';
import HeaderButton from '@components/ScreenOptions/HeaderButton';
import {IconName} from '@components/Icon/icons';

interface BackButtonButtonProps {
  onPress?: () => void;
  accessibilityLabel?: string;
}

const BackButton: FC<BackButtonButtonProps> = ({onPress, accessibilityLabel}) => (
  <HeaderButton
    iconName={IconName.ArrowLeft}
    spacingLeft={2}
    testID="backButton"
    onPress={onPress}
    accessibilityLabel={accessibilityLabel}
  />
);

export default BackButton;
