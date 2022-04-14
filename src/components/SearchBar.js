import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import debounce from 'lodash.debounce';
import propTypes from 'prop-types';
function SearchBar({handleSearch}) {
  const [searchText, setSearchText] = useState('');

  const handleChange = text => {
    setSearchText(text);
    // console.log(searchText);
  };

  const debounceCall = debounce(handleSearch, 300);
  useEffect(() => {
    console.log('searchText', searchText);
    debounceCall(searchText);
  }, [searchText]);

  return (
    <View>
      <TextInput
        style={styles.input}
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
};

export default SearchBar;
