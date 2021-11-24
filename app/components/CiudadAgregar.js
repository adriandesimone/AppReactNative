import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

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
          <Text style={[styles.detail, textColor]}>ID: {item.id}</Text>
          <Text style={[styles.detail, textColor]}>
            Lat: {item.lat} - Lon: {item.lon}
          </Text>
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
});

export default CiudadAgregar;
