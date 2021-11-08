import React, {useState, useEffect} from 'react';
import {StatusBar, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import Loading from '../../components/Loading';

const Weather = props => {
  const [weatherInfo, setWeatherInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const apiID = 'cd490bb97cc34009fc11c794901e643d';

  useEffect(() => {
    getWeatherData(props.route.params);
  }, []);

  //TODO: Cambiar por easy toast
  const showToast = text => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

  const getWeatherData = async city => {
    setLoadingText('Recuperando pronóstico');
    setLoading(true);
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=${apiID}&units=metric&lang=es`,
    )
      .then(response => response.json())
      .then(data => {
        setWeatherInfo(data);
        // if (data && Object.keys(data).length > 0) {
        //   data.list.map(item => {
        //     const city = {
        //       id: item.id,
        //       name: item.name,
        //       country: item.sys.country,
        //       lat: item.coord.lat,
        //       lon: item.coord.lon,
        //     };
        //     setCityList(cityList => [...cityList, city]);
        //   });
        // }
        console.log(data);
        setLoading(false);
      })
      .catch(error => {
        //console.log(error);
        showToast('Error al realizar la búsqueda');
        setLoading(false);
      });
  };

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#664479"
        barStyle="light-content"
      />
      <View>
        <Text style={styles.text}>Ciudad: {props.route.params.name}</Text>
        <Text style={styles.text}>País: {props.route.params.country}</Text>
        <Text style={styles.text}>ID: {props.route.params.id}</Text>
        <Text style={styles.text}>{JSON.stringify(weatherInfo)}</Text>
        <Loading isVisible={loading} text={loadingText} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});

export default Weather;
