import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ScrollView,
  Linking,
} from 'react-native';
import Loading from '../../components/Loading';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const Weather = props => {
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#664479"
        barStyle="light-content"
      />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          <Text style={styles.title}>Sobre la aplicación</Text>
          <Text style={styles.descripcion}>
            En ClimApp podrás ver de manera rápida y ágil los datos climáticos dentro de un listado personalizable de localidades.
          </Text>
          <Text style={styles.subtitle}>Modo de uso:</Text>
          <Text style={styles.descripcion}>
            {`\u2022`} Tocar en <Icon style={styles.btn} name="plus" size={20} color="#fff" /> para agregar una localidad.
          </Text>
          <Text style={styles.descripcion}>
            {`\u2022`} Escribir el nombre de la localidad en el buscador y luego tocar <Icon style={styles.btn} name="magnify" size={20} color="#fff" />
          </Text>
          <Text style={styles.descripcion}>
            {`\u2022`} Dentro los resultados, seleccionar la localidad deseada.
          </Text>
          <Text style={styles.descripcion}>
            {`\u2022`} Tocar en <Icon style={styles.btn} name="arrow-left" size={20} color="#fff" />
          </Text>
          <Text style={styles.descripcion}>
            {`\u2022`} Tocando una localidad podemos ver el detalle de los datos climaticos actuales y pronóstico.
          </Text>
          <Text style={styles.descripcion}>
            {`\u2022`} Para quitar una localidad del listado solo debemos tocar en <Icon style={styles.btn} name="close" size={20} color="#fff" />
          </Text>
          <Text style={styles.title}>Quienes somos</Text>
          <Text style={styles.descripcion}>
            Este proyecto fue realizado por De Simone Adrian, Muliterno Cristian y Escobar Marcos, para el curso de especialización en desarrollo Mobile de Codo a Codo 4.0 & IBM.
          </Text>
          <Text style={styles.subtitle}>Herramientas utilizadas:</Text>
          <Text style={styles.links}
            onPress={() => Linking.openURL('https://reactnative.dev/')}>
            {`\u2022`} React Native
          </Text>
          <Text style={styles.links}
            onPress={() => Linking.openURL('https://reactnavigation.org/')}>
            {`\u2022`} React Navigation
          </Text>
          <Text style={styles.links}
            onPress={() => Linking.openURL('https://openweathermap.org/api')}>
            {`\u2022`} OpenWeatherMap API
          </Text>
          <Text style={styles.links}
            onPress={() => Linking.openURL('https://momentjs.com/')}>
            {`\u2022`} Momentjs
          </Text>
          <Text style={styles.links}
            onPress={() => Linking.openURL('https://formik.org/')}>
            {`\u2022`} Formik
          </Text>
          <Text style={styles.links}
            onPress={() => Linking.openURL('https://github.com/jquense/yup')}>
            {`\u2022`} Yup
          </Text>
          <Text style={styles.links}
            onPress={() => Linking.openURL('https://github.com/react-native-async-storage/async-storage')}>
            {`\u2022`} AsyncStorage
          </Text>
          <Text style={styles.links}
            onPress={() => Linking.openURL('https://eslint.org/')}>
            {`\u2022`} Eslint
          </Text>
          <Text style={styles.links}
            onPress={() => Linking.openURL('https://prettier.io/')}>
            {`\u2022`} Prettier
          </Text>
          <Text style={styles.links}
            onPress={() => Linking.openURL('https://github.com/oblador/react-native-vector-icons')}>
            {`\u2022`} React Native Vector Icons
          </Text>
          <Text style={styles.links}
            onPress={() => Linking.openURL('https://github.com/yuvraaaj/openweathermap-api-icons/tree/master/icons')}>
            {`\u2022`} Iconos OpenWeather
          </Text>
          <Text style={styles.links}
            onPress={() => Linking.openURL('https://www.iconfinder.com/')}>
            {`\u2022`} IcoFinder
          </Text>
          <Text style={styles.subtitle}>Proceso:</Text>
          <Text style={styles.descripcion}>
            Para comenzar con el proyecto nuestro primer paso fue definir el perfil del usuario mediante un persona canvas. Luego realizamos un prototipo en Figma, en el cual nos apoyamos durante el desarrollo.
          </Text>
          <Text style={styles.descripcion}>
            Para obtener los datos climaticos utilizamos la API gratuita de openweathermap.org. MomentJS para el manejo de fechas, Formik para controlar el formulario de busqueda de ciudades, en conjunto con la libreria Yup para validar los campos y AsyncStorage para la persistencia de datos.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    marginHorizontal: 30,
  },
  title: {
    flexGrow: 0,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  subtitle: {
    flexGrow: 0,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  descripcion: {
    color: 'white',
    fontSize: 18,
    textAlign: 'justify',
    marginBottom: 5,
    lineHeight: 25,
  },
  btn: {
    display: 'flex',
    position: 'absolute',
    backgroundColor: '#68477c',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  links: {
    color: '#7777ff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Weather;
