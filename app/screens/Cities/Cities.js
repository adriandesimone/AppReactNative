import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Item from '../../components/Item';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const apiID = '439d4b804bc8187953eb36d2a8c26a02';
const DATA = [
  {
    id: '3860259',
    name: 'Córdoba',
    country: 'AR',
    lat: '-31.4135',
    lon: '-64.1811',
  },
  {
    id: '2519239',
    name: 'Province of Córdoba',
    country: 'ES',
    lat: '38',
    lon: '-4.8333',
  },
  {
    id: '2519240',
    name: 'Córdoba',
    country: 'ES',
    lat: '37.8833',
    lon: '-4.7667',
  },
  {
    id: '6357216',
    name: 'Córdoba',
    country: 'ES',
    lat: '37.9045',
    lon: '-4.7777',
  },
  {
    id: '3530240',
    name: 'Córdoba',
    country: 'MX',
    lat: '18.8833',
    lon: '-96.9333',
  },
];

const searchSchema = Yup.object().shape({
  city: Yup.string()
    .min(3, 'Ingrese al menos tres caracteres!')
    .max(50, 'Demasiados caracteres')
    .required('Requerido'),
});

const findCity = async values => {
  console.log(values);
  console.log(values.city);
  /*
    try {
    let cities = [];
    const value = await AsyncStorage.getItem('cities');
    if (value) {
      cities = JSON.parse(value);
      //if(cities.find((item) => item.))
    } else {
      //Obtener la ciudad y guardarla
      //cities.push(values);
      //const json_value = JSON.stringify(cities);
      //await AsyncStorage.setItem('cities', json_value);
    }
  } catch (error) {
    AsyncStorage.removeItem('cities');
    console.log(error);
  }
  */
  const result = await fetch(
    `https://openweathermap.org/data/2.5/find?q=${values.city}&type=like&sort=population&cnt=30&appid=${apiID}&_=1636025453125&units=metric&lang=es`,
  )
    .then(response => response.json())
    .then(data => {
      if (data && Object.keys(data).length > 0) {
        data.list.map(item => {
          console.log(
            `${item.id}: ${item.name} - ${item.sys.country} \ Lat: ${item.coord.lat} - Lon: ${item.coord.lon}`,
          );
        });
      } else {
        console.log('No se encontraron ciudades para el patrón ingresado');
      }
    })
    .catch(error => console.log(error));
};

const Cities = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
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
        <SafeAreaView style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
          />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1c22',
  },
  scroll: {
    paddingHorizontal: 15,
  },
  form_group: {
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 10,
    alignItems: 'stretch',
  },
  container_text_error: {
    width: '80%',
  },
  form_input: {
    borderBottomColor: '#e3e3e3',
    color: '#fff',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  btn: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#68477c',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    borderRadius: 5,
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
    fontSize: 13,
    color: '#850000',
  },
});

export default Cities;
