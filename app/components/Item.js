import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Item = ({item, onPress, backgroundColor, textColor}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>
        {item.name} ({item.country})
      </Text>
      <Text>ID: {item.id}</Text>
      <Text>
        Lat: {item.lat} - Lon: {item.lon}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
});

export default Item;
