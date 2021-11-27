import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MainHeader from '../../modules/MainHeader';
import Help from '../../modules/Timetable/Help';
import {useTheme} from '../../services/themes/ThemeManager';
import {useLocale} from '../../services/locale/LocaleManager';
import {h, shadow, w} from '../../modules/constants';
import SwitchSelector from 'react-native-switch-selector';
import {Ionicons} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
import {useToast} from '../../services/toasts/ToastsManager';

const URLs = [
  'https://mysibsau.ru/v2/timetable/all_groups/',
  'https://mysibsau.ru/v2/timetable/all_teachers/',
  'https://mysibsau.ru/v2/timetable/all_places/',
];

const fil = (fn, a) => {
  const f = []; //final
  for (let i = 0; i < a.length; i++) {
    if (fn(a[i])) {
      f.push(a[i]);
    }
  }
  return f;
};

const storeData = async (value, name, mode) => {
  try {
    AsyncStorage.setItem('@key', String(value));
    AsyncStorage.setItem('@name', String(name));
    AsyncStorage.setItem('@mode', String(mode));
  } catch (e) {}
};

export default function SearchScreen(props) {
  const [group, setGroup] = useState('');
  const [timetableMode, setTimetableMode] = useState(0);
  const [shown, setShown] = useState([]);
  const [lastGroups, setLast] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [teacherList, setTeacherList] = useState([]);
  const [placeList, setPlaceList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const lists = [groupList, teacherList, placeList];

  const {mode, theme} = useTheme();
  const {locale} = useLocale();
  const {callToast} = useToast();

  const modes = [
    {label: locale.groups, value: 0},
    {label: locale.professors, value: 1},
    {label: locale.places, value: 2},
  ];

  useEffect(() => {
    AsyncStorage.getItem('@mode').then(res => {
      if (res) {
        setTimetableMode(Number(res));
      } else {
        setTimetableMode(0);
      }
    });
    AsyncStorage.getItem('Favourite').then(list => {
      if (list !== null) {
        setLast(JSON.parse(list));
      } else {
        setLast([]);
      }

      console.log(lastGroups);
    });
  }, []);

  useEffect(() => {
    console.log('Получаем группы/преподавателей/места');
    getList(
      'Groups',
      'GroupsHash',
      0,
      'https://mysibsau.ru/v2/timetable/hash/groups/',
      setGroupList,
    );
    getList(
      'Teachers',
      'TeachersHash',
      1,
      'https://mysibsau.ru/v2/timetable/hash/teachers/',
      setTeacherList,
    );
    getList(
      'Places',
      'PlacesHash',
      2,
      'https://mysibsau.ru/v2/timetable/hash/places',
      setPlaceList,
    );
  }, []);

  function getList(storageTypeName, storageHashName, urlNumber, hashURL, fun) {
    AsyncStorage.getItem(storageHashName).then(res => {
      console.log('Получаем хэш ' + storageTypeName);
      fetch(hashURL, {method: 'GET'})
        .then(response => response.json())
        .then(json => {
          if (json.hash === res) {
            console.log(
              'Хэш ' + storageTypeName + ' совпадает',
              json.hash,
              res,
            );
            AsyncStorage.getItem(storageTypeName).then(res =>
              fun(JSON.parse(res)),
            );
          } else {
            console.log(
              'Хэш ' + storageTypeName + ' не совпадает',
              json.hash,
              res,
            );
            AsyncStorage.setItem(storageHashName, json.hash);
            fetch(URLs[urlNumber], {method: 'GET'})
              .then(response => response.json())
              .then(json => {
                fun(json);
                AsyncStorage.setItem(storageTypeName, JSON.stringify(json));
              });
          }
        })
        .catch(_err =>
          console.log('Не удалось получить хэш ' + storageTypeName),
        );
    });
  }

  const renderHelp = ({item}) => (
    <Help
      group={item}
      onPress={() => setCurrentGroup(item.name)}
      onPlus={() => {
        addFavourite(item);
        setShown([]);
        callToast(
          locale.added_to_favourites,
          theme.blockColor,
          theme.labelColor,
        );
      }}
    />
  );

  function addFavourite(group) {
    group.mode = timetableMode;
    AsyncStorage.getItem('Favourite').then(res => {
      let groups = [];
      let there_is = false;
      if (res !== null) {
        groups = JSON.parse(res);
        groups.map(item => {
          if (item.name === group.name) {
            there_is = true;
          }
        });

        if (!there_is) {
          console.log(group);
          groups.push(group);
        }
      } else {
        groups.push(group);
      }

      if (groups.length > 10) {
        groups = groups.slice(1, 11);
      }
      console.log(groups);
      setLast(groups);
      AsyncStorage.setItem('Favourite', JSON.stringify(groups));
    });
  }

  function similarGroup(text) {
    setGroup(text);
    if (text !== '' && text.length > 0) {
      timetableMode === 0
        ? setShown(
            fil(
              e => e.name.slice(0, text.length) === text.toUpperCase(),
              lists[timetableMode],
            ),
          )
        : setShown(
            fil(
              e => e.name.slice(0, text.length) === text,
              lists[timetableMode],
            ),
          );
    } else {
      setShown([]);
    }
  }

  function removeGroup(group) {
    let groups = [];
    AsyncStorage.getItem('Favourite').then(res => {
      groups = JSON.parse(res);
      groups = groups.filter(item => {
        if (item.name !== group.name) {
          return item;
        }
      });
      setLast(groups);
      AsyncStorage.setItem('Favourite', JSON.stringify(groups));
    });
  }

  function setCurrentGroup(name, mode) {
    console.log(mode);
    setGroup(name);
    let choosed = '';
    let type = [0, 1, 2].includes(Number(mode)) ? Number(mode) : timetableMode;
    type === 0
      ? (choosed = name.toUpperCase().split(' ')[0])
      : (choosed = name);
    console.log(type);
    lists[type].map(group => {
      if (group.name === choosed) {
        storeData(group.id, group.name, type);
        setGroup('');
        setShown([]);

        props.navigation.navigate('TimetableScreen', {group: group.id});
      }
    });
  }
  return (
    <View
      style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
      <StatusBar
        backgroundColor={theme.blockColor}
        barStyle={mode === 'light' ? 'dark-content' : 'light-content'}
      />
      <MainHeader
        title={locale.timetable}
        onPress={() => props.navigation.goBack()}
      />
      {timetableMode !== -1 ? (
        <View style={{alignSelf: 'center', alignItems: 'center'}}>
          <SwitchSelector
            options={modes}
            initial={timetableMode}
            borderRadius={15}
            buttonColor={theme.blueColor}
            style={[styles.selector, shadow]}
            textStyle={{color: theme.labelColor}}
            selectedTextStyle={{color: 'white'}}
            backgroundColor={theme.blockColor}
            onPress={value => {
              AsyncStorage.setItem('@mode', String(value));
              setShown([]);
              setTimetableMode(value);
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              width: w * 0.9,
              justifyContent: 'space-between',
            }}>
            <TextInput
              style={[
                styles.input,
                shadow,
                {backgroundColor: theme.blockColor, color: theme.labelColor},
              ]}
              placeholderTextColor={'lightgray'}
              value={group}
              onChangeText={text => similarGroup(text)}
              placeholder={locale.input_group_name}
            />
            <TouchableHighlight
              underlayColor={'#ddd'}
              style={[
                styles.button,
                shadow,
                {backgroundColor: theme.blockColor},
              ]}
              onPress={() => setCurrentGroup(group)}>
              <Image
                source={require('../../assets/icons/search.png')}
                style={[styles.icon, {tintColor: theme.blueColor}]}
              />
            </TouchableHighlight>
          </View>
          {shown.length !== 0 && (
            <View
              style={[
                {
                  position: 'absolute',
                  top: 120,
                  height: 8 * 40,
                  width: w * 0.9,
                  flexDirection: 'column',
                  borderRadius: 15,
                  backgroundColor: theme.blockColor,
                  zIndex: 3,
                },
                shadow,
              ]}>
              <FlatList
                data={shown}
                showsVerticalScrollIndicator={false}
                renderItem={renderHelp}
                initialNumToRender={15}
                keyExtractor={item => item.name}
              />
            </View>
          )}
          {lastGroups.length !== 0 ? (
            <View
              style={[
                shadow,
                {
                  backgroundColor: theme.blockColor,
                  width: w * 0.9,
                  borderRadius: 15,
                  padding: 10,
                  marginTop: 10,
                },
              ]}>
              <Text
                style={{
                  width: w,
                  fontSize: 16,
                  color: theme.blueColor,
                }}>
                {locale.favourites}
              </Text>
              {lastGroups.map(item => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <TouchableOpacity
                      style={{
                        width: w * 0.8,
                        padding: 5,
                        justifyContent: 'center',
                      }}
                      onPress={() => setCurrentGroup(item.name, item.mode)}>
                      <Text
                        style={{
                          textAlignVertical: 'center',
                          fontSize: 15,
                          color: 'gray',
                        }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => removeGroup(item)}>
                      <Image
                        source={require('../../assets/icons/trash.png')}
                        style={[
                          styles.deleteIcon,
                          {tintColor: theme.blueColor},
                        ]}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          ) : (
            <Text
              style={{
                color: 'gray',
                alignSelf: 'center',
                width: w * 0.8,
                marginTop: 15,
              }}>
              {locale.add_favourites}
            </Text>
          )}
        </View>
      ) : null}
      <Animated.View
        style={[
          {
            padding: 5,
            backgroundColor: 'white',
            borderRadius: 10,
            elevation: 6,
            position: 'absolute',
            bottom: 120,
            alignSelf: 'center',
          },
          {opacity: fadeAnim},
        ]}>
        <Text style={{textAlign: 'center'}}>
          {locale.timetable_isnt_available}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    flex: 1,
  },

  selector: {
    alignSelf: 'center',
    width: w * 0.9,
    marginTop: 10,
    borderRadius: 15,
  },

  input: {
    width: w * 0.75,
    height: h * 0.06,
    borderRadius: 15,
    backgroundColor: 'white',
    paddingLeft: 10,
    fontSize: 15,
    paddingTop: 0,
    paddingBottom: 0,
  },

  button: {
    height: h * 0.06,
    width: w * 0.14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 10,
  },

  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  deleteIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
