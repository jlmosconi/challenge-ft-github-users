import styled from 'styled-components/native';
import SpacingBox from '@components/SpacingBox';
import {Weight} from '@components/Text/TypographyText';

export const InfoContainer = styled.View`
  text-align: center;
  justify-content: center;
  align-items: center;
  gap: ${({theme}) => theme.size(theme.spacing(1))}px;
`;

export const NameContainer = styled.View`
  text-align: center;
  gap: ${({theme}) => theme.size(2)}px;
`;

export const UserName = styled.Text`
  text-align: center;
  ${({theme}) => theme.typography.body1({weight: Weight.BOLD})};
`;

export const Login = styled.Text`
  text-align: center;
  ${({theme}) => theme.typography.caption({weight: Weight.SEMI_BOLD})};
  color: ${({theme}) => theme.colors.grey.dark};
`;

export const Bio = styled.Text`
  text-align: center;
  ${({theme}) => theme.typography.caption({weight: Weight.SEMI_BOLD})};
  opacity: 0.8;
`;

export const BoxesContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${({theme}) => theme.size(theme.spacing(1))}px;
`;

export const InfoBox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({theme}) => theme.size(theme.spacing(1))}px;
  background-color: ${({theme}) => theme.colors.surface};
  border-radius: ${({theme}) => theme.size(theme.spacing(1))}px;
`;

export const InfoBoxTitle = styled.Text`
  text-align: center;
  ${({theme}) => theme.typography.overline({weight: Weight.REGULAR})};
`;

export const InfoBoxValue = styled.Text`
  text-align: center;
  ${({theme}) => theme.typography.body2({weight: Weight.BOLD})};
`;

export const DataListContainer = styled(SpacingBox)`
  background-color: ${({theme}) => theme.colors.grey.light};
  padding: ${({theme}) => theme.size(theme.spacing(1))}px;
  gap: ${({theme}) => theme.size(theme.spacing(1.5))}px;
  border-radius: ${({theme}) => theme.size(theme.spacing(1))}px;
`;

export const DataListItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${({theme}) => theme.size(theme.spacing(1))}px;
  width: 100%;
`;

export const InfoListText = styled.Text`
  ${({theme}) => theme.typography.caption({weight: Weight.REGULAR})};
  flex: 1;
  opacity: 0.8;
`;
