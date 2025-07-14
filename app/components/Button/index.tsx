import {type FC} from 'react';
import {TouchableOpacityProps} from 'react-native';
import {StyledButton, ButtonText} from './styled';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  accessibilityLabel?: string;
}

const Button: FC<ButtonProps> = ({title, accessibilityLabel, ...props}) => {
  return (
    <StyledButton
      activeOpacity={0.7}
      accessible
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      {...props}>
      <ButtonText>{title}</ButtonText>
    </StyledButton>
  );
};

export default Button;
