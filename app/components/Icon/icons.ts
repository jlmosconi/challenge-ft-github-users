import {type FC} from 'react';
import type {SvgProps} from 'react-native-svg';

import StarEmptyAsset from '@assets/icons/star-empty.svg';
import StarFullAsset from '@assets/icons/star-full.svg';

export enum IconName {
  StarEmpty = 'StarEmpty',
  StarFull = 'StarFull',
}

export const Icons: Record<IconName, FC<SvgProps>> = {
  [IconName.StarEmpty]: StarEmptyAsset,
  [IconName.StarFull]: StarFullAsset,
};
