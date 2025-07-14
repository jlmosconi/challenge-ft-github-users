import styled, {css} from 'styled-components/native';
import {type TextProps} from 'react-native';

export enum Weight {
  REGULAR = 'regular',
  SEMI_BOLD = 'semi-bold',
  BOLD = 'bold',
}

export const WeightMap = {
  [Weight.REGULAR]: 'Mulish-Regular',
  [Weight.SEMI_BOLD]: 'Mulish-SemiBold',
  [Weight.BOLD]: 'Mulish-Bold',
};

interface ITypography {
  weight: Weight;
  size: number;
  height?: number;
}

export type TypographyType = (props: {weight: Weight}) => ReturnType<typeof css>;

export interface ITypographyText extends TextProps {
  weight?: Weight;
  type?: TypographyType;
}

const Typography = ({weight, size, height}: ITypography) => css`
  font-family: ${WeightMap[weight]};
  font-size: ${({theme}) => `${theme.size(size)}px`};
  line-height: ${({theme}) => `${theme.size(height || size)}px`};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const createTypography = (size: number, height: number, defaultWeight: Weight = Weight.REGULAR) => {
  return ({weight = defaultWeight}: {weight: Weight}) => css`
    ${Typography({weight, size, height})};
  `;
};

export const Body1 = createTypography(18, 24);
export const Body2 = createTypography(20, 24);
export const Overline = createTypography(12, 14);
export const Caption = createTypography(14, 16);

export const TypographyText = styled.Text<ITypographyText>`
  ${({weight = Weight.REGULAR, type = Caption}) => type({weight})};
`;
