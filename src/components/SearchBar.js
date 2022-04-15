import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import debounce from 'lodash.debounce';
import propTypes from 'prop-types';
function SearchBar({handleSearch, initialSearchTerm}) {
  const [searchText, setSearchText] = useState(initialSearchTerm);

  const handleChange = text => {
    setSearchText(text);
    //
    // console.log(searchText);
  };

  const SearchAndBlur = searchText => {
    handleSearch(searchText);
    inputEle.current.blur();
  };

  const inputEle = useRef();

  const debounceCall = debounce(SearchAndBlur, 300);
  useEffect(() => {
    console.log('searchText', searchText);

    debounceCall(searchText);
  }, [searchText]);

  return (
    <View>
      <TextInput
        style={styles.input}
        ref={inputEle}
        value={searchText}
        placeholder="Something to type"
        onChangeText={handleChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 12,
  },
});

SearchBar.propTypes = {
  handleSearch: propTypes.func.isRequired,
  initialSearchTerm: propTypes.string.isRequired,
};

export default SearchBar;
