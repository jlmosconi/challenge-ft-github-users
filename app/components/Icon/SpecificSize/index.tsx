import {type FC} from 'react';
import type {SpecificSizeIconProps} from './types';
import {StyledIcon} from './styled';

const SpecificSizeIcon: FC<SpecificSizeIconProps> = ({size, ...props}) => <StyledIcon size={size} {...props} />;

export default SpecificSizeIcon;
