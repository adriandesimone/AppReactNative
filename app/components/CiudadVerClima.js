import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
          <Text style={[styles.detail, textColor]}>ID: {item.id}</Text>
          <Text style={[styles.detail, textColor]}>
            Lat: {item.lat} - Lon: {item.lon}
          </Text>
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
});

export default CiudadVerClima;
