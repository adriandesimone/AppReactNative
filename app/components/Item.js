import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Item = ({item, onPress, backgroundColor, textColor}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>
        {item.name} ({item.country})
      </Text>
      <Text style={styles.detail}>ID: {item.id}</Text>
      <Text style={styles.detail}>
        Lat: {item.lat} - Lon: {item.lon}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 12,
  },
});

export default Item;
