import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  ScrollView,
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
  },
  btn: {
    display: 'flex',
    position: 'absolute',
    backgroundColor: '#68477c',
    // justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 10,
  },
});

export default Weather;
