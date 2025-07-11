import {type FC} from 'react';
import type {SvgProps} from 'react-native-svg';

import StarEmptyAsset from '@assets/icons/star-empty.svg';
import StarFilledAsset from '@assets/icons/star-filled.svg';

export enum IconName {
  StarEmpty = 'StarEmpty',
  StarFilled = 'StarFilled',
}

export const Icons: Record<IconName, FC<SvgProps>> = {
  [IconName.StarEmpty]: StarEmptyAsset,
  [IconName.StarFilled]: StarFilledAsset,
};
