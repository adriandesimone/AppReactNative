import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const CiudadVerClima = ({
  item,
  onPress,
  backgroundColor,
  textColor,
  onIconPress,
  onDelete,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress, onIconPress}
      activeOpacity={0.75}
      style={[styles.item, backgroundColor]}
    >
      <View style={styles.form_row}>
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
        <View>
          <Icon name="close" size={18} style={[styles.deleteIcon, textColor]} onPress={onDelete} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  form_row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  view_content: {
    width: '90%',
  },
  item: {
    padding: 10,
    minHeight: 180,
    borderRadius: 10,
    width: '47%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  detail: {
    fontSize: 12,
    marginBottom: 2,
  },
  deleteIcon: {
    position: 'absolute',
    borderRadius: 100,
    top: -13,
    right: -28,
    padding: 9,
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

export default CiudadVerClima;
