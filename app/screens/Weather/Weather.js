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
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const Weather = props => {
  const [weatherInfo, setWeatherInfo] = useState({});
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

  function degToCompass(num) {
    var val = Math.floor(num / 22.5 + 0.5);
    var arr = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ];
    return arr[val % 16];
  }

  function capitalize(word) {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  }

  const getWeatherData = async city => {
    setLoadingText('Recuperando pronóstico');
    setLoading(true);
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=${apiID}&units=metric&lang=es`,
    )
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        setWeatherInfo({
          condicion: data.weather[0].main,
          descripcion: capitalize(data.weather[0].description),
          icono: {
            uri: `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
          },
          temp: data.main.temp.toFixed(1),
          termica: data.main.feels_like.toFixed(1),
          temp_max: data.main.temp_max.toFixed(1),
          temp_min: data.main.temp_min.toFixed(1),
          presion: data.main.pressure,
          humedad: data.main.humidity,
          visibilidad: data.main.visibility,
          viento_vel: data.wind.speed,
          viento_dir: degToCompass(data.wind.deg),
          viento_angulo: data.wind.deg,
          amanecer: data.sys.sunrise,
          ocaso: data.sys.sunset,
        });
        setImgPronostico({
          uri: `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
        });
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
      <View style={styles.containerActual}>
        <View style={styles.containerMain}>
          <Text style={styles.title}>
            {props.route.params.name} ({props.route.params.country})
          </Text>
          <Image source={weatherInfo.icono} style={styles.imgWeather} />
          {/* <Text style={styles.condicion}>{weatherInfo.condicion}</Text> */}
          <Text style={styles.descripcion}>{weatherInfo.descripcion}</Text>
          <View style={styles.containerTemp}>
            <Text style={styles.temp}>{weatherInfo.temp} °C</Text>
            <View>
              <Text style={styles.maxMin}>Min: {weatherInfo.temp_min} °C</Text>
              <Text style={styles.maxMin}>Max: {weatherInfo.temp_max} °C</Text>
            </View>
          </View>
          <Text style={styles.termica}>
            Sensación Térmica: {weatherInfo.termica} °C
          </Text>
        </View>
        <View style={styles.containerOtros}>
          <Text style={styles.infoOtros}>
            <Icon name="water-percent" size={24} color="#fff" />
            {'\n'}
            {weatherInfo.humedad}
          </Text>
          <Text style={styles.infoOtros}>
            <Icon name="waves" size={24} color="#fff" />
            {'\n'}
            {weatherInfo.presion} hPa
          </Text>
          <Text style={styles.infoOtros}>
            <Icon name="compass" size={24} color="#fff" />
            {'\n'}
            {weatherInfo.viento_vel} m/s {weatherInfo.viento_dir}
          </Text>
        </View>
        <Loading isVisible={loading} text={loadingText} />
      </View>
      <View style={styles.containerExtendido}></View>
    </>
  );
};

const styles = StyleSheet.create({
  containerActual: {
    flex: 0.65,
  },
  containerMain: {
    alignSelf: 'center',
    width: 330,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: 'white',
  },
  imgWeather: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  descripcion: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  containerTemp: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  temp: {
    color: 'white',
    fontSize: 36,
    paddingLeft: 20,
    paddingRight: 20,
  },
  maxMin: {
    color: 'white',
    marginTop: 4,
  },
  condicion: {
    color: 'white',
    fontSize: 24,
  },
  termica: {
    paddingTop: 10,
    color: 'white',
    textAlign: 'center',
  },
  containerOtros: {
    paddingTop: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  infoOtros: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 100,
    height: 100,
    margin: 10,
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
  },
  containerExtendido: {
    flex: 0.35,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
});

export default Weather;
