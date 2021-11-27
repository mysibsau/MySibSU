import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {h, w} from '../constants';
import {useTheme} from '../../services/themes/ThemeManager';

const Help = ({group, onPress, onPlus}) => {
  const {theme} = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text
        allowFontScaling={false}
        style={[styles.name, {color: theme.labelColor}]}>
        {group.name}
      </Text>
      <TouchableOpacity onPress={onPlus}>
        <Text style={styles.plusLabel}>+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: w * 0.9,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },

  name: {
    fontSize: 18,
    backgroundColor: 'transparent',
    zIndex: 2,
    paddingLeft: 10,
    paddingTop: 4,
    paddingBottom: 4,
  },

  plusLabel: {
    color: '#006AB3',
    fontWeight: 'bold',
    width: 40,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Help;
