import {type FC} from 'react';
import Skeleton from './Skeleton';

interface ListFooterProps {
  loading: boolean;
  elementsToDisplay?: number;
}

const ListFooter: FC<ListFooterProps> = ({loading, elementsToDisplay}) => {
  if (!loading) return null;

  return <Skeleton elementsToDisplay={elementsToDisplay} />;
};

export default ListFooter;
