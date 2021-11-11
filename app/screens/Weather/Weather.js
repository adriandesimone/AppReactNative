import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import Loading from '../../components/Loading';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Weatherful from '../../assets/weather_icons/weatherful/Weatherful';
import PronosticoFuturo from '../../components/PronosticoFuturo';
//import Weatherful from '../../assets/weather_icons/weather_is_fine/WeatherIsFine';

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
      'SSO',
      'SO',
      'OSO',
      'O',
      'ONO',
      'NO',
      'NNO',
    ];
    return arr[val % 16];
  }

  function capitalize(word) {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  }

  const getWeatherData = async city => {
    setLoadingText('Recuperando pronóstico');
    setLoading(true);

    // const apiUrlCityID = `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=${apiID}&units=metric&lang=es`;

    const apiUrlLatLon = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&exclude=minutely,hourly&appid=${apiID}&units=metric&lang=es`;

    const result = await fetch(apiUrlLatLon)
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        setWeatherInfo({
          condicion: data.current.weather[0].main,
          descripcion: capitalize(data.current.weather[0].description),
          icono: Weatherful[`_${data.current.weather[0].icon}`],
          // {
          //   uri: `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
          // },
          temp: data.current.temp.toFixed(1),
          termica: data.current.feels_like.toFixed(1),
          temp_max: data.daily[0].temp.max.toFixed(1),
          temp_min: data.daily[0].temp.min.toFixed(1),
          presion: data.current.pressure,
          humedad: data.current.humidity,
          visibilidad: data.current.visibility,
          viento_vel: data.current.wind_speed,
          viento_dir: degToCompass(data.current.wind_deg),
          viento_angulo: data.current.wind_deg,
          amanecer: data.current.sunrise,
          ocaso: data.current.sunset,
          pronostico: [
            // {
            //   id: 0,
            //   dt: data.daily[0].dt,
            //   icono: Weatherful[`_${data.daily[0].weather[0].icon}`],
            //   descripcion: capitalize(data.daily[0].weather[0].description),
            //   temp_max: data.daily[0].temp.max.toFixed(1),
            //   temp_min: data.daily[0].temp.min.toFixed(1),
            // },
            {
              id: 1,
              dt: data.daily[1].dt,
              icono: Weatherful[`_${data.daily[1].weather[0].icon}`],
              descripcion: capitalize(data.daily[1].weather[0].description),
              temp_max: data.daily[1].temp.max.toFixed(1),
              temp_min: data.daily[1].temp.min.toFixed(1),
            },
            {
              id: 2,
              dt: data.daily[2].dt,
              icono: Weatherful[`_${data.daily[2].weather[0].icon}`],
              descripcion: capitalize(data.daily[2].weather[0].description),
              temp_max: data.daily[2].temp.max.toFixed(1),
              temp_min: data.daily[2].temp.min.toFixed(1),
            },
            {
              id: 3,
              dt: data.daily[3].dt,
              icono: Weatherful[`_${data.daily[3].weather[0].icon}`],
              descripcion: capitalize(data.daily[3].weather[0].description),
              temp_max: data.daily[3].temp.max.toFixed(1),
              temp_min: data.daily[3].temp.min.toFixed(1),
            },
            {
              id: 4,
              dt: data.daily[4].dt,
              icono: Weatherful[`_${data.daily[4].weather[0].icon}`],
              descripcion: capitalize(data.daily[4].weather[0].description),
              temp_max: data.daily[4].temp.max.toFixed(1),
              temp_min: data.daily[4].temp.min.toFixed(1),
            },
            {
              id: 5,
              dt: data.daily[5].dt,
              icono: Weatherful[`_${data.daily[5].weather[0].icon}`],
              descripcion: capitalize(data.daily[5].weather[0].description),
              temp_max: data.daily[5].temp.max.toFixed(1),
              temp_min: data.daily[5].temp.min.toFixed(1),
            },
            {
              id: 6,
              dt: data.daily[6].dt,
              icono: Weatherful[`_${data.daily[6].weather[0].icon}`],
              descripcion: capitalize(data.daily[6].weather[0].description),
              temp_max: data.daily[6].temp.max.toFixed(1),
              temp_min: data.daily[6].temp.min.toFixed(1),
            },
          ],
        });
        setLoading(false);
      })
      .catch(error => {
        //console.log(error);
        showToast('Error al realizar la búsqueda');
        setLoading(false);
      });
  };

  const renderPronostico = ({item}) => {
    return (
      <PronosticoFuturo
        item={item}
        //onPress={() => setSelectedId(item.id)}
        //backgroundColor={{backgroundColor}}
        //textColor={{color}}
        //onIconPress={() => createTwoButtonAlert(item)}
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
              <Text style={styles.max}>Max: {weatherInfo.temp_max} °C</Text>
              <Text style={styles.min}>Min: {weatherInfo.temp_min} °C</Text>
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
      <View style={styles.containerExtendido}>
        <Text style={styles.titleExtendido}>Pronóstico Extendiddo</Text>
        <SafeAreaView>
          <FlatList
            horizontal
            data={weatherInfo.pronostico}
            renderItem={renderPronostico}
            keyExtractor={item => item.id}
            style={{height: '100%'}}></FlatList>
        </SafeAreaView>
      </View>
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
  max: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  min: {
    color: 'white',
    fontSize: 14,
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
    width: 90,
    height: 90,
    margin: 10,
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
  },
  containerExtendido: {
    flex: 0.35,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  titleExtendido: {
    color: 'white',
    fontSize: 18,
    padding: 5,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
});

export default Weather;
