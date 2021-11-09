import React, {useState, useEffect} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import Loading from '../../components/Loading';

const Weather = props => {
  const [weatherInfo, setWeatherInfo] = useState({});
  const [condicion, setCondicion] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const apiID = 'cd490bb97cc34009fc11c794901e643d';
  const [imgPronostico, setImgPronostico] = useState({});

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
        //console.log(data);
        setWeatherInfo(data);
        setCondicion(data.weather[0].description);
        setImgPronostico({
          uri: `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
        });
        // setImgUrl(
        //   `../../assets/weather_icons/weatherful/${weatherInfo.weather[0].icon}.png`,
        // );
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
        //console.log(data);
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
        <Text style={styles.title}>
          {props.route.params.name} ({props.route.params.country})
        </Text>
        <Image source={imgPronostico} style={styles.imgWeather} />
        <Text style={styles.condicion}>{condicion}</Text>
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
  title: {
    paddingTop: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  condicion: {
    color: 'white',
    fontSize: 18,
  },
  imgWeather: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
});

export default Weather;
