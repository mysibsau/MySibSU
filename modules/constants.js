import React from 'react';
import {Dimensions} from 'react-native';

const win = Dimensions.get('window');
const h = win.height;
const w = win.width;
const BASE_URL = 'https://mysibsau.ru';
const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 4,
};

export {h, w, BASE_URL, shadow};
