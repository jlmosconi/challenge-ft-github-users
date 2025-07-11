import {type FC, useMemo} from 'react';
import type {IconProps} from './types';
import {Icons} from './icons';

const Icon: FC<IconProps> = ({name, color, ...props}) => {
  const Component = useMemo(() => Icons[name], [name]);

  if (!Component) return null;

  return <Component color={color} {...props} />;
};

export default Icon;
