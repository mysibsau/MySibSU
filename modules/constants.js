import React from 'react'
import { Dimensions } from 'react-native'

const win = Dimensions.get('window');
const h = win.height;
const w = win.width;
const BASE_URL = 'https://mysibsau.ru'

export { h, w, BASE_URL }