import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import logIn from './src/screens/logIn';
import Profile from './src/screens/profile';
import SignUp from './src/screens/signUp';
import Anasayfa from "./src/screens/anasayfa";
import Meeting from "./src/screens/meeting";
import {firebase} from './src/firebaseConfig';
import UserSign from "./src/screens/userSign";
import SaloonSign from "./src/screens/saloonSign";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import React, { useState, useEffect } from 'react';
import SaloonScreen from './src/screens/saloonScreen';
import SaloonProfile from './src/screens/saloonProfile';
import SaloonMeets from './src/screens/saloonMeets';
import PriceUpdate from './src/screens/priceUpdate';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {

const [signUser, setSignUser] = useState([]);
useEffect ( () => {
   firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
  .then((doc) => {
    setSignUser(doc.data())
  })
},[])
if(signUser.status == 'user'){
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Meeting') {
            iconName = focused ? 'pie-chart-sharp' : 'pie-chart-outline';
          }
          else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={25} />;
        },
        tabBarShowLabel: false
      })}
    >
      <Tab.Screen name="Home" options={{ headerShown: false }} component={Anasayfa} />
      <Tab.Screen name="Meeting" options={{ headerShown: false }} component={Meeting} />

      <Tab.Screen name="Profile" options={{ headerShown: false }} component={Profile} />
    </Tab.Navigator>
  )
}
else {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SaloonMeets') {
            iconName = focused ? 'pie-chart-sharp' : 'pie-chart-outline';
          }
          else if (route.name === 'SaloonProfile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={25} />;
        },
        tabBarShowLabel: false
      })}
    >
      <Tab.Screen name="Home" options={{ headerShown: false }} component={Anasayfa} />
      <Tab.Screen name="SaloonMeets" options={{ headerShown: false }} component={SaloonMeets} />
      <Tab.Screen name="SaloonProfile" options={{ headerShown: false }} component={SaloonProfile} />
    </Tab.Navigator>
  )
}
  
 }

function App  (){
  const [user, setUser] = useState();
  const [initalizing, setInitalizing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initalizing) setInitalizing(false);
  }
  useEffect( () => {
    const subscriber  = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if (initalizing) return null;
  if (!user) {
    return (
      <Stack.Navigator>
         <Stack.Screen name="logIn" options={{ headerShown: false }} component={logIn} />
         <Stack.Screen name="signUp"  options={{ headerShown: false }} component={SignUp} />
         <Stack.Screen name="userSign"  options={{ headerShown: false }} component={UserSign} />
         <Stack.Screen name="saloonSign"  options={{ headerShown: false }} component={SaloonSign} />
      </Stack.Navigator>
    )
  }
return (
  <Stack.Navigator>
     <Stack.Screen name="anasayfa" component={TabNavigator} options={{ headerShown: false }} />
     <Stack.Screen name="profile" component={TabNavigator}  options={{ headerShown: false }}/>
      <Stack.Screen name="saloonScreen" component={SaloonScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="priceUpdate" component={PriceUpdate}  options={{ headerShown: false }}/>
  </Stack.Navigator>
);

}
export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}
