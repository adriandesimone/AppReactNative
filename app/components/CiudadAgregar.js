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
          <View style={styles.weather_row}>
            <View>
              <Image
                style={{width: 40, height: 50}}
                source={{
                  uri: `http://openweathermap.org/img/w/${item.icon}.png`,
                }}
              />
            </View>
            <View style={[styles.weather_row, {paddingLeft: 8}]}>
              <Text style={styles.weather_detail}>
                {parseInt(item.temp - 273.15)} &#x2103;
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <Text style={[styles.detail, textColor]}>ID: {item.id}</Text>
            <Text style={[styles.detail, textColor]}>
              Lat: {item.lat} - Lon: {item.lon}
            </Text>
          </View>
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
    // width: '90%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 12,
  },
  weather_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weather_detail: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CiudadAgregar;
