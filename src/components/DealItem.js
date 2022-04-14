import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import propTypes from 'prop-types';
import {priceDisplay} from '../util';
function DealItem({deal, setCurrentDealId}) {
  const handlePress = () => {
    setCurrentDealId(deal.key);
  };
  return (
    <TouchableOpacity style={styles.deal} onPress={handlePress}>
      <Image style={styles.image} source={{uri: deal.media[0]}} />
      <View style={styles.info}>
        <Text style={styles.title}>{deal.title}</Text>
        <View style={styles.footer}>
          <Text style={styles.cause}>{deal.cause.name}</Text>
          <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

DealItem.prototype = {
  deal: propTypes.object.isRequired,
  setCurrentDealId: propTypes.func.isRequired,
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
  },
  deal: {
    marginHorizontal: 12,
    marginTop: 12,
  },
  info: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#bbb',
    borderWidth: 1,
    borderTopWidth: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
  },
  cause: {
    flex: 2,
    // textAlign: 'left',
  },
  price: {
    flex: 1,
    textAlign: 'right',
  },
});

export default DealItem;
