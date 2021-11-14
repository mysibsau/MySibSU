import React from 'react';
import {View, Text, Animated, Image, Pressable, StyleSheet} from 'react-native';
import { w } from '../../modules/constants';
import { ThemeColors } from '../themes/theme';

export const ToastContext = React.createContext({
  callToast: () => {},
});

export const useToast = () => React.useContext(ToastContext);

export class ToastsManager extends React.Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.state = {
      modalShown: false,
      message: 'Какое-то сообщение',
      backgroundColor: 'white',
      textColor: 'black',
    };
  }

  callToast = async (message, backgroundColor, textColor) => {
    if (this.state.modalShown) return;
    this.setState({modalShown: true, message: message, backgroundColor, textColor});
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      this.closeToast();
    }, 2000);
  };

  closeToast = async () => {
    this.setState({modalShown: false});
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  render() {
    let animation = this.animatedValue.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [-100, 80, 100],
    });

    return (
      <ToastContext.Provider
        value={{
          callToast: this.callToast,
          callCenterToast: this.callCenterToast,
        }}>
        <Animated.View
          style={[
            styles.toastView,
            {
              transform: [{translateY: animation}],
            },
          ]}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.icon}
          />
          <View style={{flex: 1, borderRadius: 8, overflow: 'hidden', backgroundColor: this.state.backgroundColor}}>
            <View style={{height: 6, backgroundColor: ThemeColors.blueColor.light}} />
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={styles.messageContainer}>
                <Text style={[styles.message, {color: this.state.textColor}]}>{this.state.message}</Text>
              </View>
              {/* <Pressable
                onPress={() => this.closeToast()}
                style={styles.closeButtonContainer}>
                <View style={styles.closeButton}>
                  <Cross color={'#333'} />
                </View>
              </Pressable> */}
            </View>
          </View>
        </Animated.View>
        {this.props.children}
      </ToastContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  toastView: {
    minHeight: 80,
    width: w * 0.7,
    alignSelf: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    zIndex: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  icon: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: -25,
    alignSelf: 'center',
    zIndex: 10,
  },

  messageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },

  message: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },

  closeButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
  },

  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
});