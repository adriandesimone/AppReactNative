import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const Item = ({item, onPress, backgroundColor, textColor, onIconPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <View style={styles.form_row}>
        <View style={styles.view_content}>
          <Text style={[styles.title, textColor]}>
            {item.name} ({item.country})
          </Text>
          <Text style={[styles.detail, textColor]}>ID: {item.id}</Text>
          <Text style={[styles.detail, textColor]}>
            Lat: {item.lat} - Lon: {item.lon}
          </Text>
        </View>
        <View>
          <Icon
            name="plus-circle"
            size={44}
            style={textColor}
            onPress={onIconPress}
          />
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
