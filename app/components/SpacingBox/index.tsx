import {type FC} from 'react';
import type {ISpacingBox} from './types';
import {Box} from './styled';

const SpacingBox: FC<ISpacingBox> = ({children, ...rest}) => <Box {...rest}>{children}</Box>;

export default SpacingBox;
