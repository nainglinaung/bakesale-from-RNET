import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import ajax from '../ajax';
import Dealist from './Dealist';
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
  },
});

export default function App() {
  const [deals, setDeals] = useState([]);
  const width = Dimensions.get('window').width / 2 - 75;
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [dealsFromSearch, setDealsFromSearch] = useState([]);
  const [currentDealId, setCurrentDealId] = useState(null);
  const showDeals = dealsFromSearch.length > 0 ? dealsFromSearch : deals;
  const [titleXposition, setTitleXposition] = useState(new Animated.Value(0));
  const handleSearch = searchText => {
    if (searchText) {
      ajax.fetchDealSearchResult(searchText).then(data => {
        setDealsFromSearch(data);
        setActiveSearchTerm(searchText);
      });
    } else {
      setDealsFromSearch([]);
    }
  };

  const animateTitle = (direction = 1) => {
    Animated.timing(titleXposition, {
      toValue: width * direction,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start(({finished}) => {
      if (finished) {
        animateTitle(-1 * direction);
      }
    });
  };

  useEffect(() => {
    animateTitle();
    ajax.fetchInitialDeal().then(data => {
      setDeals(data);
    });
  }, []);

  if (currentDealId) {
    return (
      <View>
        <DealDetail
          setCurrentDealId={setCurrentDealId}
          initalDeal={deals[deals.findIndex(({key}) => key == currentDealId)]}
        />
      </View>
    );
  }

  if (deals.length > 0) {
    return (
      <View style={style.container}>
        <SearchBar
          handleSearch={handleSearch}
          initialSearchTerm={activeSearchTerm}
        />
        <Dealist deals={showDeals} setCurrentDealId={setCurrentDealId} />
      </View>
    );
  }

  return (
    <Animated.View style={[style.container, {left: titleXposition}]}>
      <Text style={style.header}>Bakesale</Text>
    </Animated.View>
  );
}
