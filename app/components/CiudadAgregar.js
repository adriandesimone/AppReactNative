import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

const CiudadAgregar = ({
  item,
  onPress,
  backgroundColor,
  textColor,
  onIconPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress, onIconPress} style={[styles.item, backgroundColor]}>
      <View style={styles.view_content}>
        <Text style={[styles.title, textColor]}>
          {item.name} ({item.country})
        </Text>
        {item.icon && item.temp ? (
          <>
            <Image
              style={styles.imgWeather}
              source={{
                uri: `http://openweathermap.org/img/w/${item.icon}.png`,
              }}
            />
            <Text style={styles.temp}>
              {parseInt(item.temp - 273.15)} &#x2103;
            </Text>
          </>
        ) : (
          <>
            <Text style={[styles.detail, textColor]}>ID: {item.id}</Text>
            <Text style={[styles.detail, textColor]}>
              Lat: {item.lat} - Lon: {item.lon}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginBottom: 12,
    borderRadius: 10,
  },
  view_content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  imgWeather: {
    alignSelf: 'center',
    marginTop: -8,
    marginBottom: -8,
    marginHorizontal: 8,
    width: 50,
    height: 50,
  },
  detail: {
    fontSize: 12,
  },
  temp: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#eee',
  },
});

export default CiudadAgregar;
