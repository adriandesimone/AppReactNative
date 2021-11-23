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
      <SafeAreaView style={styles.container}>
        <View style={styles.containerActual}>
          <Text style={styles.title}>
            {props.route.params.name} ({props.route.params.country})
          </Text>
          <View style={styles.containerMain}>
            <View style={styles.containerTemp}>
              <Text style={styles.temp}>{weatherInfo.temp} °C</Text>
              <Text style={styles.max}>Max: {weatherInfo.temp_max} °C</Text>
              <Text style={styles.min}>Min: {weatherInfo.temp_min} °C</Text>
            </View>
            <View style={styles.containerImg}>
              <Image source={weatherInfo.icono} style={styles.imgWeather} />
              {/* <Text style={styles.condicion}>{weatherInfo.condicion}</Text> */}
              <Text style={styles.descripcion}>{weatherInfo.descripcion}</Text>
            </View>
          </View>
          {/* <Text style={styles.termica}>
            Sensación Térmica: {weatherInfo.termica} °C
          </Text> */}
          <View style={styles.containerOtros}>
            <Text style={styles.infoOtros}>
              S. Térm.
              {'\n'}
              {weatherInfo.termica} °C
            </Text>
            <Text style={styles.infoOtros}>
              <Icon name="water-percent" size={30} color="#fff" />
              {'\n'}
              {weatherInfo.humedad}
            </Text>
            <Text style={styles.infoOtros}>
              <Icon name="waves" size={30} color="#fff" />
              {'\n'}
              {weatherInfo.presion} hPa
            </Text>
            <Text style={styles.infoOtros}>
              <Icon name="compass" size={30} color="#fff" />
              {'\n'}
              {weatherInfo.viento_vel}m/s {weatherInfo.viento_dir}
            </Text>
          </View>
          <Loading isVisible={loading} text={loadingText} />
        </View>
        <View style={styles.containerExtendido}>
          <Text style={styles.titleExtendido}>Pronóstico Extendiddo</Text>
          <FlatList
            horizontal
            data={weatherInfo.pronostico}
            renderItem={renderPronostico}
            keyExtractor={item => item.id}
            style={{ height: '100%' }}>
          </FlatList>
        </View>
        {/* </ScrollView> */}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerActual: {
    flex: 0.6,
    justifyContent: 'space-evenly',
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
