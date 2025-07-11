import {FC} from 'react';
import SpacingBox from '@components/SpacingBox';
import {Container, EmptyIcon, Text} from './styled';
import {IconName} from '@components/Icon/icons';

interface ListEmptyProps {
  loading: boolean;
  text: string;
  spacing?: number;
}

const ListEmpty: FC<ListEmptyProps> = ({loading, text, spacing = 10}) => {
  if (loading) return null;

  return (
    <Container mt={spacing}>
      <SpacingBox testID="nUsersImage" mb={1}>
        <EmptyIcon size={100} name={IconName.Users} />
      </SpacingBox>
      <Text testID="noUsersTitle">{text}</Text>
    </Container>
  );
};
export default ListEmpty;
