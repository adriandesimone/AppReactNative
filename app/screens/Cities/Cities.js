import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CiudadAgregar from '../../components/CiudadAgregar';
import Loading from '../../components/Loading';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const Cities = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [cityList, setCityList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const apiID = '439d4b804bc8187953eb36d2a8c26a02';

  const searchSchema = Yup.object().shape({
    city: Yup.string()
      .min(3, 'Ingrese al menos tres caracteres!')
      .max(50, 'Demasiados caracteres')
      .required('Requerido'),
  });

  const findCity = async values => {
    setLoadingText('Buscando ciudades');
    setLoading(true);
    const result = await fetch(
      `https://openweathermap.org/data/2.5/find?q=${values.city}&type=like&sort=population&cnt=30&appid=${apiID}&_=1636025453125&units=metric&lang=es`,
    )
      .then(response => response.json())
      .then(data => {
        setCityList([]);
        if (data && Object.keys(data).length > 0) {
          data.list.map(item => {
            const city = {
              id: item.id,
              name: item.name,
              country: item.sys.country,
              lat: item.coord.lat,
              lon: item.coord.lon,
            };
            setCityList(cityList => [...cityList, city]);
          });
        }
        setLoading(false);
      })
      .catch(error => {
        //console.log(error);
        showToast('Error al realizar la búsqueda');
        setLoading(false);
      });
  };

  const createTwoButtonAlert = item => {
    setSelectedId(item.id);
    Alert.alert(
      'Agregar ciudad',
      '¿Está seguro de agregar la ciudad seleccionada?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Agregar',
          onPress: () => {
            //console.log('OK Pressed');
            saveCity(item);
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

  const saveCity = async values => {
    setLoadingText('Guardando Ciudad');
    setLoading(true);
    try {
      let cities = [];
      const storage = await AsyncStorage.getItem('cities');
      if (storage) {
        cities = JSON.parse(storage);
        //console.log(cities);
        if (cities.find(item => item.id === values.id)) {
          showToast(
            'La ciudad que desea agregar ya se encuentra en el listado',
          );
        } else {
          cities.push(values);
          const json_value = JSON.stringify(cities);
          await AsyncStorage.setItem('cities', json_value);
          showToast('Ciudad Agregada de manera exitosa');
        }
      } else {
        cities.push(values);
        const json_value = JSON.stringify(cities);
        await AsyncStorage.setItem('cities', json_value);
        showToast('Ciudad Agregada de manera exitosa');
      }
      setLoading(false);
    } catch (e) {
      AsyncStorage.removeItem('cities');
      //console.log(e);
      setLoading(false);
      showToast(e);
    }
  };

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <CiudadAgregar
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
        onIconPress={() => createTwoButtonAlert(item)}
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
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={{city: ''}}
          validationSchema={searchSchema}
          onSubmit={findCity}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form_group}>
              <View style={styles.container_text_error}>
                <TextInput
                  style={styles.form_input}
                  placeholderTextColor="#a0a0a0"
                  placeholder="Ingresar ciudad"
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  value={values.city}
                />
                {errors.city && touched.city ? (
                  <Text style={styles.error}>{errors.city}</Text>
                ) : null}
              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.btn}
                onPress={handleSubmit}>
                <Icon name="magnify" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View style={styles.resultsContainer}>
          <FlatList
            data={cityList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
          />
        </View>
        <Loading isVisible={loading} text={loadingText} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1c22',
    padding: 12,
    paddingBottom: 0,
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: '#1f1c22',
    padding: 0,
  },
  form_group: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'stretch',
  },
  container_text_error: {
    flex: 1,
    marginRight: 10,
  },
  form_input: {
    borderBottomColor: '#e3e3e3',
    color: '#fff',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    height: 55,
    fontSize: 18,
    textAlignVertical: 'bottom',
  },
  btn: {
    display: 'flex',
    backgroundColor: '#68477c',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width: 55,
    marginBottom: 35,
    borderRadius: 10,
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
  error: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#a00',
    textAlign: 'center',
  },
});

export default Cities;
