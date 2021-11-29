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
            <>
              <Image
                style={styles.imgWeather}
                source={item.icon} 
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
        <View>
          <Icon name="close" size={18} style={[styles.deleteIcon, textColor]} onPress={onDelete} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    paddingTop: 15,
    minHeight: 180,
    borderRadius: 10,
    width: '47%',
  },
  form_row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  view_content: {
    width: '100%',
    height: 180,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
    height: 50,
  },
  imgWeather: {
    alignSelf: 'center',
    marginTop: -15,
    marginBottom: -15,
    width: 100,
    height: 100,
  },
  temp: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
  },
  detail: {
    fontSize: 12,
    marginBottom: 2,
  },
  deleteIcon: {
    position: 'absolute',
    borderRadius: 100,
    top: -18,
    right: -12,
    padding: 9,
  },
});

export default CiudadVerClima;
