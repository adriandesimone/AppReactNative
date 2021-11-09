import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CiudadVerClima from '../../components/CiudadVerClima';
import Loading from '../../components/Loading';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const Home = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    setLoadingText('Recuperando ciudades');
    setLoading(true);
    try {
      let cities = [];
      const storage = await AsyncStorage.getItem('cities');
      if (storage) {
        cities = JSON.parse(storage);
        setCityList(cities);
        console.log(cities);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
    setLoading(false);
  };

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <CiudadVerClima
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
        onIconPress={() => {
          setSelectedId(item.id);
          navigation.navigate('Weather', item);
        }}
        onDelete={() => console.log('Borrar ciudad')}
      />
    );
  };

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#664479"
        barStyle="light-content"
      />
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={cityList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.btn}
            onPress={() => navigation.navigate('Cities')}>
            <Icon name="plus" size={36} color="#fff" />
          </TouchableOpacity>
        </SafeAreaView>
        <Loading isVisible={loading} text={loadingText} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1c22',
  },
  btn: {
    display: 'flex',
    position: 'absolute',
    backgroundColor: '#68477c',
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    borderRadius: 100,
    bottom: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: '#fff',
  },
});

export default Home;
