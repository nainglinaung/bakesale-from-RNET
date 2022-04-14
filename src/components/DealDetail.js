import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Button,
  Linking,
  Animated,
  Dimensions,
} from 'react-native';
import propTypes from 'prop-types';
import {priceDisplay} from '../util';
import ajax from '../ajax';
function DealDetail({initalDeal, setCurrentDealId}) {
  const [deal, setDeal] = useState(initalDeal);
  const [imageIndex, setImageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [imageXPosition, setImageXPosition] = useState(new Animated.Value(0));
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const openDealURL = () => {
    Linking.openURL(deal.url);
  };
  const ImagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      imageXPosition.setValue(gesture.dx);
    },
    onPanResponderRelease: (event, gesture) => {
      const direction = Math.sign(gesture.dx);

      if (Math.abs(gesture.dx) > width * 0.4) {
        setDirection(direction);
        Animated.timing(imageXPosition, {
          toValue: direction * width,
          duration: 250,
          useNativeDriver: false,
        }).start(handleSwipe(-1 * direction));
      } else {
        Animated.spring(imageXPosition, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const handleSwipe = direction => {
    // console.log('direction is ', direction);
    // console.log(deal.media[imageIndex + direction]);
    if (deal.media[imageIndex + direction]) {
      console.log('if');
      setImageIndex(imageIndex + direction);
    } else {
      console.log('else');
      Animated.spring(imageXPosition, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  useEffect(() => {
    imageXPosition.setValue(width * direction);
    Animated.spring(imageXPosition, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  }, [imageIndex]);

  useEffect(() => {
    ajax.fetchDealDetail(deal.key).then(data => {
      setDeal(data);
    });
  }, []);

  const handlePress = () => {
    setCurrentDealId(null);
  };

  return (
    <View style={styles.deal}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>
      <Animated.Image
        style={[styles.image, {left: imageXPosition}]}
        source={{uri: deal.media[imageIndex]}}
        {...ImagePanResponder.panHandlers}
      />
      <View style={styles.detail}>
        <View>
          <Text style={styles.title}>{deal.title}</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.info}>
            <Text style={styles.cause}>{deal.cause.name}</Text>
            <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
          </View>
          {deal.user && (
            <View>
              <Image style={styles.avatar} source={{uri: deal.user.avatar}} />
              <Text>{deal.user.name}</Text>
            </View>
          )}
        </View>
        <View style={styles.description}>
          <Text>{deal.description}</Text>
        </View>
        <Button title="Buy this deal" onPress={openDealURL} />
      </View>
    </View>
  );
}

DealDetail.prototype = {
  deal: propTypes.object.isRequired,
  setCurrentDealId: propTypes.func.isRequired,
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  back: {
    marginBottom: 5,
    color: '#22f',
    marginLeft: 10,
  },
  description: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderStartColor: 'dotted',
    margin: 10,
    padding: 10,
  },

  user: {
    alignItems: 'center',
  },
  info: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: `rgba(237,149,45,0.4)`,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
  cause: {
    marginVertical: 10,
    // textAlign: 'left',
  },
  price: {
    fontWeight: 'bold',
  },
});

export default DealDetail;
