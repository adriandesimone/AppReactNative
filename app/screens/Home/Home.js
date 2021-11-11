import React, {useState, useEffect} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CiudadVerClima from '../../components/CiudadVerClima';
import Loading from '../../components/Loading';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const Home = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [cityList, setCityList] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) loadCities();
  }, [isFocused]);

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

  const createTwoButtonAlert = item => {
    setSelectedId(item.id);
    Alert.alert(
      'Eliminar ciudad',
      '¿Está seguro de eliminar la ciudad seleccionada?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            //console.log('OK Pressed');
            deleteCity(item);
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  //TODO: Cambiar por easy toast
  const showToast = text => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

  const deleteCity = async values => {
    setLoadingText('Eliminando Ciudad');
    setLoading(true);
    try {
      let cities = [];
      const storage = await AsyncStorage.getItem('cities');
      if (storage) {
        cities = JSON.parse(storage);
        const current = cities.filter(item => item.id !== values.id);
        const json_value = JSON.stringify(current);
        console.log(json_value);
        await AsyncStorage.setItem('cities', json_value);
        showToast('Se ha eliminado la ciudad seleccionada');
        loadCities();
      } else {
        showToast('La lista de ciudades está vacía');
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      showToast(e);
    }
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
        onDelete={() => createTwoButtonAlert(item)}
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
