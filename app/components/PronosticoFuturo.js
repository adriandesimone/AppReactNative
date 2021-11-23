import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Moment from 'moment';

export default function PronosticoFuturo({item}) {
  //console.log(item);
  Moment.updateLocale('es', {
    months:
      'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
        '_',
      ),
    monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sept_Oct_Nov_Dec'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom_Lun_Mar_Mie_Jue_Vie_Sab'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_'),
  });

  const fechaMoment = `${Moment(new Date(item.dt * 1000)).format('ddd DD MMM')}`;

  return (
    <>
      <View style={styles.containerPronostico}>
        <Text style={styles.dia}>{fechaMoment}</Text>
        <Image source={item.icono} style={styles.imgWeather} />
        <Text style={styles.descripcion}>{item.descripcion}</Text>
        <View style={styles.containerTemp}>
          <View>
            <Text style={styles.max}>Max: {item.temp_max} °C</Text>
            <Text style={styles.min}>Min: {item.temp_min} °C</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerPronostico: {
    marginHorizontal: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: '96%',
    justifyContent: 'space-evenly',
    backgroundColor: '#1f1c22',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dia: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  imgWeather: {
    width: 75,
    height: 75,
    alignSelf: 'center',
  },
  descripcion: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  containerTemp: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  max: {
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 1,
    textAlign: 'center',
  },
  min: {
    color: 'white',
    textAlign: 'center',
  },
});
