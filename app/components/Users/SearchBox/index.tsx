import {type FC, useState, useEffect} from 'react';
import SearchBar from '@components/SearchBar';
import {useDebounce} from '@hooks/useDebounce';

interface SearchBoxProps {
  placeholder?: string;
  isSearching?: boolean;
  testID?: string;
  onSearch: (name: string) => void;
}

const SearchBox: FC<SearchBoxProps> = ({placeholder, isSearching, testID = 'userSearchBar', onSearch}) => {
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <SearchBar
      placeholder={placeholder}
      value={search}
      onChangeText={setSearch}
      isSearching={isSearching}
      testID={testID}
    />
  );
};

export default SearchBox;
