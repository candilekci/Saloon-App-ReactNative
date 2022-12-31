import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SaloonCard from "../component/saloonCard";
import Navbar from "../component/navbar";
import Ionicons from 'react-native-vector-icons/Ionicons';
import HorizontalCard from "../component/horizonralCard";
import SmallHorizontal from "../component/smallHorizontal";
import { Picker } from '@react-native-picker/picker';
import React, { useState , useEffect } from 'react';
import { firebase } from '../firebaseConfig';
import axiosGetCity from '../component/turkeyCityList';
import saloonListeleme from '../component/cityList';

export default function Anasayfa() {

const {turkeyCities} = axiosGetCity();
const { saloonList } = saloonListeleme();
 
  const[ newData, setNewData] = useState([]);
  let citiesData = [];
  const searchCity = (itemValue) => {
    setCity(itemValue)
    console.log(itemValue , "itemValue")
    for (let i = 0; i < saloonList.length; i++) {
      if (saloonList[i].city === itemValue) {
        citiesData.push(saloonList[i])
        
      }
    }
    setNewData(citiesData)
  }
  
  const [city, setCity] = useState('');
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex:1}}  >
      <Navbar />
      <View style={styles.searchCont}  >
        {/* <TextInput style={styles.searchInput} placeholder='Berberin nerede?' /> */}
        <View style={styles.selectStyle}>
        <Picker
          selectedValue={city}
          onValueChange={(itemValue) =>
            // setSelectedItem(itemValue)
            searchCity(itemValue)
          }>
            <Picker.Item  label='Bir Şehir Seçiniz' value={""} />
            {
            turkeyCities.map((turkeyCities) => {
              return (
                
                <Picker.Item key={turkeyCities.id} label={turkeyCities.name} value={turkeyCities.name} />
              )
            })
          }
        </Picker>
        </View>
        <Ionicons style={{ fontSize: 30, marginRight: 15 }} name='md-location-outline' />
      </View>
        <View>
          <ScrollView >
          <Text style={styles.textStil}> Vitrin </Text>
          <HorizontalCard  />
          <Text style={{ fontSize: 20 }}> Sizin İçin  </Text>

          <SmallHorizontal />

          <SaloonCard/>
          </ScrollView>
          
        </View>
        
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textStil: {
    height: 35,
    fontSize: 23,

  },

  selectStyle: {
    width: 400
  },
  searchInput: {
    width: 340,
    height: 40,
    padding: 10,
    backgroundColor: '#fff',

    marginTop: 10
  },
  searchCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 50,
    borderTopWidth: 1,


  },
  selectStyle: {
    width: 350,
    height: 50,
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    marginBottom: 10,
  },
});
