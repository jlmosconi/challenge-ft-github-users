import {type FC} from 'react';
import type {SvgProps} from 'react-native-svg';

import ArrowLeftAsset from '@assets/icons/arrow-left.svg';
import ArrowRightAsset from '@assets/icons/arrow-right.svg';
import CheckAsset from '@assets/icons/check.svg';
import SearchAsset from '@assets/icons/search.svg';
import StarEmptyAsset from '@assets/icons/star-empty.svg';
import StarFilledAsset from '@assets/icons/star-filled.svg';
import UsersAsset from '@assets/icons/users.svg';

export enum IconName {
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  Check = 'Check',
  Search = 'Search',
  StarEmpty = 'StarEmpty',
  StarFilled = 'StarFilled',
  Users = 'Users',
}

export const Icons: Record<IconName, FC<SvgProps>> = {
  [IconName.ArrowLeft]: ArrowLeftAsset,
  [IconName.ArrowRight]: ArrowRightAsset,
  [IconName.Check]: CheckAsset,
  [IconName.Search]: SearchAsset,
  [IconName.StarEmpty]: StarEmptyAsset,
  [IconName.StarFilled]: StarFilledAsset,
  [IconName.Users]: UsersAsset,
};
