import React from 'react';
import propTypes from 'prop-types';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import DealItem from './DealItem';
function Dealist({deals, setCurrentDealId}) {
  return (
    <View style={styles.list}>
      <FlatList
        data={deals}
        renderItem={({item}) => (
          <DealItem deal={item} setCurrentDealId={setCurrentDealId} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eee',
    flex: 1,
    width: '100%',
    paddingTop: 30,
  },
});

Dealist.propTypes = {
  deals: propTypes.array.isRequired,
  setCurrentDealId: propTypes.func.isRequired,
};

export default Dealist;
