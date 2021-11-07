// LIBS
import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Animated, { Easing } from 'react-native-reanimated'
import messaging from '@react-native-firebase/messaging';

// SCREENS
// Hello
import HelloScreen from '../../screens/Welcome/HelloScreen'
import AuthScreen from '../../screens/Welcome/AuthScreen'
// Feed
import EventsScreen from '../../screens/Feed/EventsScreen'
import NewsScreen from '../../screens/Feed/NewsScreen'

// Menu
import MenuScreen from '../../screens/Menu/MenuScreen'
import DinersScreen from '../../screens/Menu/DinersScreen'

// Timetable
import SearchScreen from '../../screens/Timetable/SearchScreen'
import TimetableScreen from '../../screens/Timetable/TimetableScreen'

// Services 
import ServiceListScreen from '../../screens/Services/ServiceListScreen'
// Institutes
import InstitutesScreen from '../../screens/Services/Institutes/InstitutesScreen'
import IITK from '../../screens/Services/Institutes/Institute'
// Student Life
import ActiveScreen from '../../screens/Services/StudentLife/ActiveScreen'
import SportScreen from '../../screens/Services/StudentLife/SportScreen'
import DesignScreen from '../../screens/Services/StudentLife/DesignScreen'
import ArtScreen from '../../screens/Services/StudentLife/ArtScreen'
import Ermak from '../../screens/Services/StudentLife/Unit'
import EnsembleScreen from '../../screens/Services/StudentLife/EnsembleScreen'
//Map
import MapScreen from '../../screens/Services/MapScreen'
// Online Catalog (tickets)
import ShopScreen from '../../screens/Services/Shop/ShopScreen'
import ProductScreen from '../../screens/Services/Shop/ProductScreen'
import ConcertsScreen from '../../screens/Services/Shop/ConcertsScreen'
import ConcertScreen from '../../screens/Services/Shop/ConcertScreen'
// Vacancies
import VacanciesScreen from '../../screens/Services/Vacancies/VacanciesScreen'
import Vacancy from '../../screens/Services/Vacancies/Vacancy'
// Feedback
import TopicsScreen from '../../screens/Services/Surveys/TopicsScreen'
import PollScreen from '../../screens/Services/Surveys/PollScreen'
// FAQ
import FAQScreen from '../../screens/Services/FAQScreen'
// Library
import LibrarySearchScreen from '../../screens/Services/Library/LibrarySearchScreen'
import DigitalScreen from '../../screens/Services/Library/DigitalScreen'
import PhysicalScreen from '../../screens/Services/Library/PhysicalScreen'

// // Person
import PersonScreen from '../../screens/Profile/AuthScreen'
import ProfileScreen from '../../screens/Profile/ProfileScreen'
import SettingsScreen from '../../screens/Profile/SettingsScreen'
import AttestationScreen from '../../screens/Profile/AttestationScreen'
import MarksScreen from '../../screens/Profile/MarksScreen'
import QuestionsScreen from '../../screens/Profile/QuestionsScreen'

// MODULES
import { useTheme } from '../themes/ThemeManager'
import { useLocale } from '../locale/LocaleManager'

// ICONS
import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import ActiveNavScreen from '../../screens/Services/StudentLife/ActiveNavScreen'
import { useUser } from '../auth/AuthManager'
import AnotherSettingsScreen from '../../screens/Profile/AnotherSettingsScreen'
import TechScreen from '../../screens/Services/StudentLife/TechScreen'
import TechUnionScreen from '../../screens/Services/StudentLife/TechUnionScreen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

function LibraryTabBar({ state, descriptors, navigation, position }) {
  const {mode, theme, toggle} = useTheme()
  const insets = useSafeAreaInsets();
  const inputRange = state.routes.map((_, i) => i);
  const translateX = Animated.interpolate(position, {
    inputRange,
    outputRange: inputRange.map(i => i * Dimensions.get('window').width / 4)
  })

  return (
    <View style={{ flexDirection: 'row', backgroundColor: theme.blockColor, elevation: 6, paddingTop: insets.top}}>
      <TouchableOpacity onPress={() => navigation.navigate('LibrarySearch')}>
        <View style={{ height: Dimensions.get('window').width / 8, width: Dimensions.get('window').width / 4 , justifyContent: 'center'}}>
          <Ionicons name="ios-arrow-back" size={30} color="black" style={{ color: '#006AB3', paddingRight: 10, paddingLeft: 15}}/>
        </View>
      </TouchableOpacity>
      <Animated.View
        style={[
            style.slider,
            {
                left: Dimensions.get('window').width / 4,
                transform: [{translateX}],
                width: Dimensions.get('window').width / 4,
                height: 2,
                backgroundColor: theme.blueColor
            },
        ]}
          />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ width: Dimensions.get('window').width / 4, alignItems: 'center', justifyContent: 'center' }}
          >
            <Animated.Text style={{ textTransform: 'uppercase', fontFamily: 'System', color: theme.labelColor, fontSize: 13, opacity }}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const LibraryTab = createMaterialTopTabNavigator();

function LibraryTabs({route}){
  const {localeMode, locale, toggleLang} = useLocale()
  const {mode, theme, toggle} = useTheme()
  return (
    <LibraryTab.Navigator 
      tabBar={props => <LibraryTabBar {...props} />} 
      tabBarOptions={{
        activeTintColor: theme.labelColor,
        allowFontScaling: false,
      }}
    >
      <LibraryTab.Screen options={ ({route}) => ({ title: locale['digital'], data: route.params })} name="Digital" component={DigitalScreen} />
      <LibraryTab.Screen options={ ({route}) => ({ title: locale['printed'], data: route.params })} name="Physical" component={PhysicalScreen} />
    </LibraryTab.Navigator>
  );
}

const FeedTab = createMaterialTopTabNavigator();

function FeedTabs() {
  const { localeMode, locale, toggleLang } = useLocale()
  const insets = useSafeAreaInsets();
  const { mode, theme, toggle } = useTheme()
  return (
    <FeedTab.Navigator tabBarOptions={{
      labelStyle: {
        fontFamily: 'System',
        fontSize: 13,
      },
      tabStyle: {
        height: Dimensions.get('window').width / 8,
        width: Dimensions.get('window').width / 4,
      },
      style: {
        backgroundColor: theme.blockColor,
        paddingLeft: Dimensions.get('window').width / 4,
        paddingTop: insets.top,
        elevation: 6
      },
      indicatorStyle: {
        marginLeft: Dimensions.get('window').width / 4,
        color: theme.blueColor
      },
      activeTintColor: theme.labelColor,
      allowFontScaling: false,
    }}>
      <FeedTab.Screen options={{ title: locale['events'] }} name="Events" component={EventsScreen} />
      <FeedTab.Screen options={{ title: locale['news'] }} name="News" component={NewsScreen} />
    </FeedTab.Navigator>
  );
}

const StudentLifeStack = createStackNavigator();

function StudentLifeNavigator(){
  return(
    <StudentLifeStack.Navigator screenOptions={{headerShown: false}}>
      <StudentLifeStack.Screen  name="Navigator" component={ActiveNavScreen} />
      <StudentLifeStack.Screen  name="Active" component={ActiveScreen} />
      <StudentLifeStack.Screen  name="Sport" component={SportScreen} />
      <StudentLifeStack.Screen  name="Science" component={DesignScreen} />
      <StudentLifeStack.Screen  name="Art" component={ArtScreen} />
      <StudentLifeStack.Screen  name='Ermak' component={Ermak} />
      <StudentLifeStack.Screen  name="Ensemble" component={EnsembleScreen} />
      <StudentLifeStack.Screen  name="Tech" component={TechScreen} />
      <StudentLifeStack.Screen  name="TechUnion" component={TechUnionScreen} />
    </StudentLifeStack.Navigator>
  )
}

const Tabs = createBottomTabNavigator();

function BottomTab(props) {
  const { locale } = useLocale()

  const navigateToScreen = async (screen) => {
    console.log('Screen', screen)
    const isAuthorizated = JSON.parse(await AsyncStorage.getItem('User'))
    switch (screen) {
      case 'FEED':
        props.navigation.navigate('Feed');
        break;
      case 'ATTESTATION':
        isAuthorizated && props.navigation.navigate('NotificationAttestation')
        break;
      case 'RECORD_BOOK':
        isAuthorizated && props.navigation.navigate('NotificationMarks')
        break;
      case 'MY_QUESTIONS':
        isAuthorizated && props.navigation.navigate('NotificationQuestions')
        break;
    }
  };

  React.useEffect(() => {
    // messaging().onNotificationOpenedApp(remoteMessage => {
    //   if (remoteMessage.data.click_action) {
    //     navigateToScreen(remoteMessage.data.click_action)
    //   }
    // });

    // messaging()
    //   .getInitialNotification()
    //   .then(remoteMessage => {
    //     if (remoteMessage && remoteMessage.data.click_action) {
    //       navigateToScreen(remoteMessage.data.click_action)
    //     }
    //   });

  }, []);

  return (
    <Tabs.Navigator initialRouteName={'Timetable'} tabBar={(props) => <MainTabBar {...props} />}>
      <Tabs.Screen name={'Feed'} component={FeedTabs}
        options={{
          headerShown: false,
          title: locale['feed']
        }} />
      <Tabs.Screen name={'Menu'} component={MenuStackScreen}
        options={{
          headerShown: false,
          title: locale['menu']
        }} />
      <Tabs.Screen name={'Timetable'} component={TimetableStackScreen}
        options={{
          headerShown: false,
          title: locale['timetable']
        }}
      />
      <Tabs.Screen name={'Services'} component={ServiceStackScreen}
        options={{
          headerShown: false,
          title: locale['services']
        }} />
      <Tabs.Screen name={'Profile'} component={PersonStackScreen}
        options={{
          headerShown: false,
          title: locale['profile']
        }} />
    </Tabs.Navigator>
  )
}

const HelloStack = createStackNavigator();

export default function Navigation({ firstLaunch }) {
  var initialName = firstLaunch === true ? 'Hello' : 'Bottom'
  console.log('Initial screen', initialName, firstLaunch)

  return (
    <NavigationContainer>
      <HelloStack.Navigator initialRouteName={initialName} headerMode='none'>
        <HelloStack.Screen name='Hello' component={HelloScreen} />
        <HelloStack.Screen name='Auth' component={AuthScreen} />
        <HelloStack.Screen name='Bottom' component={BottomTab} />
        {/* <HelloStack.Screen name="NotificationAttestation" component={AttestationScreen} />
        <HelloStack.Screen name="NotificationMarks" component={MarksScreen} />
        <HelloStack.Screen name="NotificationQuestions" component={QuestionsScreen} /> */}
      </HelloStack.Navigator>
    </NavigationContainer>
  )
}

const MenuStack = createStackNavigator();

function MenuStackScreen() {
  const [screen, setScreen] = useState('')

  const Layout = (initialName) => {
    if (initialName === '')
      return (<View></View>)
    else
      return (
        <MenuStack.Navigator initialRouteName={initialName} headerMode='none'>
          <MenuStack.Screen name='DinersScreen' component={DinersScreen} />
          <MenuStack.Screen name='MenuScreen' component={MenuScreen} />
        </MenuStack.Navigator>
      )
  }

  useEffect(() => {
    AsyncStorage.getItem('Diner')
      .then(res => {
        if (res !== null)
          setScreen('MenuScreen')
        else
          setScreen('DinersScreen')
      })
  })

  return (Layout(screen))
}

const TimetableStack = createStackNavigator();


function TimetableStackScreen() {
  const [screen, setScreen] = useState('')

  const Layout = (initialName) => {
    if (initialName === '')
      return (<View></View>)
    else
      return (
        <TimetableStack.Navigator initialRouteName={initialName} headerMode='none'>
          <TimetableStack.Screen
            listeners={{
              tabPress: e => {
                e.preventDefault();
              },
            }}
            name='SearchScreen'
            component={SearchScreen} />
          <TimetableStack.Screen
            listeners={{
              tabPress: e => {
                e.preventDefault();
              },
            }}
            name='TimetableScreen'
            component={TimetableScreen} />
        </TimetableStack.Navigator>
      )
  }

  useEffect(() => {
    AsyncStorage.getItem('@key')
      .then(res => {
        if (res !== null)
          setScreen('TimetableScreen')
        else
          setScreen('SearchScreen')
      })
  }, [])

  return (
    Layout(screen)
  )
}

const PersonStack = createStackNavigator();

function PersonStackScreen() {
  const { isAuthorizated } = useUser();
  const { theme } = useTheme()

  if (isAuthorizated === null) {
    return <View style={{ flex: 1, backgroundColor: theme.primaryBackground }}></View>
  }

  return (
    <PersonStack.Navigator headerMode={'none'}>
      {/* <PersonStack.Screen name='Person' component={PersonScreen} />
      <PersonStack.Screen name='AnotherSettings' component={AnotherSettingsScreen} /> */}
      {isAuthorizated ? 
        <>
          <PersonStack.Screen name='Profile' component={ProfileScreen} />
          <PersonStack.Screen name='Settings' component={SettingsScreen} />
          <PersonStack.Screen name='Attestation' component={AttestationScreen} />
          <PersonStack.Screen name='Marks' component={MarksScreen} />
          <PersonStack.Screen name="Questions" component={QuestionsScreen} />
          <PersonStack.Screen name='FAQ' component={FAQScreen} />
          <PersonStack.Screen name='Poll' component={PollScreen} />
         </> :
        <>
          <PersonStack.Screen name='Person' component={PersonScreen} />
          <PersonStack.Screen name='AnotherSettings' component={AnotherSettingsScreen} />  
        </>}
    </PersonStack.Navigator>
  )
}

const ServiceStack = createStackNavigator();

function ServiceStackScreen() {
  return (
    <ServiceStack.Navigator initialRouteName='Service' headerMode='none'>
      <ServiceStack.Screen name="Service" component={ServiceListScreen} />
      <ServiceStack.Screen name="StudentLife" component={StudentLifeNavigator} />
      <ServiceStack.Screen name="Institutes" component={InstitutesScreen} />
      <ServiceStack.Screen name="IITK" component={IITK} />
      <ServiceStack.Screen name="Map" component={MapScreen} />
      <ServiceStack.Screen name='Shop' component={ShopScreen} />
      <ServiceStack.Screen name='Product' component={ProductScreen} />
      <ServiceStack.Screen name='Concerts' component={ConcertsScreen} />
      <ServiceStack.Screen name='CurrentConcert' component={ConcertScreen} />
      <ServiceStack.Screen name='Vacancies' component={VacanciesScreen} />
      <ServiceStack.Screen name='Vacancy' component={Vacancy} />
      <ServiceStack.Screen name='Topics' component={TopicsScreen} />
      <ServiceStack.Screen name='LibrarySearch' component={LibrarySearchScreen} />
      <ServiceStack.Screen name='LibraryResult' component={LibraryTabs} />
    </ServiceStack.Navigator>
  )
}

const BottomMenuItem = ({ iconName, label, isCurrent }) => {
  const { theme } = useTheme()

  const color = isCurrent ? theme.blueColor : 'gray'
  const icons = {
    'Feed': <MaterialCommunityIcons name="timetable" size={26} color={isCurrent ? theme.blueColor : 'rgb(159, 165, 163)'} />,
    'Menu': <MaterialIcons name="restaurant-menu" size={26} color={isCurrent ? theme.blueColor : 'rgb(159, 165, 163)'} />,
    'Timetable': <MaterialCommunityIcons name="calendar-text" size={26} color={isCurrent ? theme.blueColor : 'rgb(159, 165, 163)'} />,
    'Services': <AntDesign name="appstore-o" size={26} color={isCurrent ? theme.blueColor : 'rgb(159, 165, 163)'} />,
    'Profile': <Ionicons name='md-person' size={26} color={isCurrent ? theme.blueColor : 'rgb(159, 165, 163)'} />
  }

  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icons[iconName]}
      <Text style={{ fontFamily: 'System', fontSize: 10, color: color }}>{label}</Text>
    </View>
  );
};


const MainTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const { mode, theme, toggle } = useTheme()
  const totalWidth = Dimensions.get("window").width;
  return (
    <View style={[style.tabContainer, { width: totalWidth, backgroundColor: theme.blockColor, paddingBottom: insets.bottom }]}>
      <View style={{ flexDirection: "row" }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          }

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ["selected"] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
              key={index}
            >
              <BottomMenuItem
                iconName={route.name}
                label={options.title}
                isCurrent={isFocused}
              />
            </TouchableOpacity>
          );
        })
        }
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  tabContainer: {
    height: 50,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 10,
    position: "absolute",
    bottom: 0,
  },
  slider: {
    position: "absolute",
    bottom: 0,
    left: Dimensions.get('window').width / 8,
    borderRadius: 10,
  },
});