import {type FC} from 'react';
import type {SvgProps} from 'react-native-svg';

import StarEmptyAsset from '@assets/icons/star-empty.svg';
import StarFilledAsset from '@assets/icons/star-filled.svg';
import UsersAsset from '@assets/icons/users.svg';

export enum IconName {
  StarEmpty = 'StarEmpty',
  StarFilled = 'StarFilled',
  Users = 'Users',
}

export const Icons: Record<IconName, FC<SvgProps>> = {
  [IconName.StarEmpty]: StarEmptyAsset,
  [IconName.StarFilled]: StarFilledAsset,
  [IconName.Users]: UsersAsset,
};
