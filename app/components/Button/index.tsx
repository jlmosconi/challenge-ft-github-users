import {type FC} from 'react';
import {TouchableOpacityProps} from 'react-native';
import {StyledButton, ButtonText} from './styled';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const Button: FC<ButtonProps> = ({title, ...props}) => {
  return (
    <StyledButton activeOpacity={0.7} {...props}>
      <ButtonText>{title}</ButtonText>
    </StyledButton>
  );
};

export default Button;
