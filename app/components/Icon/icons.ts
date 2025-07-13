import {type FC} from 'react';
import type {SvgProps} from 'react-native-svg';

import ArrowLeftAsset from '@assets/icons/arrow-left.svg';
import ArrowRightAsset from '@assets/icons/arrow-right.svg';
import CheckAsset from '@assets/icons/check.svg';
import CompanyAsset from '@assets/icons/company.svg';
import EmailAsset from '@assets/icons/email.svg';
import ErrorAsset from '@assets/icons/error.svg';
import LinkAsset from '@assets/icons/link.svg';
import PlaceAsset from '@assets/icons/place.svg';
import SearchAsset from '@assets/icons/search.svg';
import SettingsAsset from '@assets/icons/settings.svg';
import StarEmptyAsset from '@assets/icons/star-empty.svg';
import StarFilledAsset from '@assets/icons/star-filled.svg';
import UsersAsset from '@assets/icons/users.svg';
import XAsset from '@assets/icons/x.svg';

export enum IconName {
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  Check = 'Check',
  Company = 'Company',
  Email = 'Email',
  Error = 'Error',
  Link = 'Link',
  Place = 'Place',
  Search = 'Search',
  Settings = 'Settings',
  StarEmpty = 'StarEmpty',
  StarFilled = 'StarFilled',
  Users = 'Users',
  X = 'X',
}

export const Icons: Record<IconName, FC<SvgProps>> = {
  [IconName.ArrowLeft]: ArrowLeftAsset,
  [IconName.ArrowRight]: ArrowRightAsset,
  [IconName.Check]: CheckAsset,
  [IconName.Company]: CompanyAsset,
  [IconName.Email]: EmailAsset,
  [IconName.Error]: ErrorAsset,
  [IconName.Link]: LinkAsset,
  [IconName.Place]: PlaceAsset,
  [IconName.Search]: SearchAsset,
  [IconName.Settings]: SettingsAsset,
  [IconName.StarEmpty]: StarEmptyAsset,
  [IconName.StarFilled]: StarFilledAsset,
  [IconName.Users]: UsersAsset,
  [IconName.X]: XAsset,
};
