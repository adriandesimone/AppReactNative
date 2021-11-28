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
          <Text style={styles.title}>Informacion</Text>
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
  },
  title: {
    flexGrow: 0,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  containerMain: {
    alignSelf: 'center',
    flexDirection: 'row',
    flexGrow: 0.6,
    justifyContent: 'space-around',
    width: '95%',
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#fff1',
  },
  containerTemp: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '50%',
  },
  containerImg: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '50%',
  },
  imgWeather: {
    marginTop: -20,
    marginBottom: -15,
    width: 130,
    height: 130,
  },
  descripcion: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  temp: {
    color: 'white',
    fontSize: 38,
  },
  max: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  min: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
  },
  termica: {
    paddingTop: 15,
    color: 'white',
    textAlign: 'center',
  },
  containerOtros: {
    flexGrow: 1,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    width: '100%',
  },
  infoOtros: {
    color: 'white',
    fontSize: 16,
    lineHeight: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 90,
    height: 95,
    borderColor: '#fff8',
    borderRadius: 10,
    borderWidth: 1,
  },
  containerExtendido: {
    marginTop: 5,
    flex: 0.4,
    backgroundColor: '#fff1',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleExtendido: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: 'bold',
  },
});

export default Weather;
