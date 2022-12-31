import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import Navbar from "../component/navbar";
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import React, { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firebase } from '../firebaseConfig';
import meetsListeleme from '../component/meetsGo';
import PriceList from '../component/priceList';
import {Linking} from 'react-native'

export default function SaloonScreen({ route }) {
  const [showPrice, setShowPrice] = useState(true)
  const [showMeets, setShowMeets] = useState(false)
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [newDate, setNewDate] = useState('')
  const [newData, setNewData] = useState({})
  const [userP, setUserP] = useState('')
  const [clock, setClock] = useState('')
  const [meets, setMeets] = useState([])
  const {meetsList}= meetsListeleme();
  const [screenMeets, setScreenMeets] = useState([])
  const currentEmail = (firebase.auth().currentUser.email)
  useEffect(() => {
     firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get()
      .then((user) => {
        setUserP(user.data())
        setScreenMeets(meetsList);
    console.log("screenMeets", screenMeets)
      })
  }, []);
  
  
  useEffect(() => {
    firebase.firestore().collection("meets").where("saloonEmail", "==", (route.params.data[0].email)).get()
    .then((user) => {
      setMeets(user.docs.map((doc)=>({...doc.data()})));
    })
  }, [])
  console.log(meets)
  const alertButton = (saat) => {
    Alert.alert(
      'Saloon App',
      'Randevuyu onaylıyor musunuz?',
      [
        { text: 'Evet', onPress: () => appointment(saat) },
        { text: 'Hayır', style: 'cancel', onPress: () => setClock("") },
      ],
      {
        cancelable: true
      }
    );
  }
  const appointment = async (saat) => {
 
    try {
      await firebase.firestore().collection('meets').doc()
        .set({
          randevuAlan: currentEmail,
          saloon: (route.params.data[0].saloonName),
          date: newDate,
          phone: userP.phone,
          saloonEmail: (route.params.data[0].email),
          clock: saat,
          randevuAlanName: userP.fullName,
        })
      alert('randevu alındı')
      setMeets([...meets, { clock: saat, date: newDate }])
    } catch (error) {
      alert(error.message)
      
    }
  }
  const timeControl = (saat) => { 
    let booldeger = meets.some((item) => item.clock === (saat) && item.date === newDate)
    return booldeger;
  }
  useEffect(() => {
     setNewData(route.params.data);
  }, [])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setOpen(Platform.OS === 'ios')
    setDate(currentDate);

    let tempDate = new Date(currentDate)
    let day = tempDate.getDate() + '.' + (tempDate.getMonth() + 1) + '.' + tempDate.getFullYear();
    
    setNewDate(day);
  };

  return (
    <ScrollView>
      <View >
        <Navbar />
        <View>
          <Image style={styles.imageStyle} source={{ uri: (route.params.data[0].downloadUrl) }} />
          <Text style={styles.headerStyle}> {route.params.data[0].saloonName} </Text>
          <Text style={styles.locationStyle}>{route.params.data[0].adress}</Text>
          <Text style={styles.brStyle} />
          <TouchableOpacity
            style={styles.numberStyle}
            onPress={()=>Linking.openURL(`tel:${route.params.data[0].phone}`)}
          >
            <Entypo name='old-phone' style={styles.phoneIcon} />
            <Text style={styles.phoneText}> {route.params.data[0].phone}</Text>
          </TouchableOpacity>

          <View style={styles.listView}>
            <TouchableOpacity style={styles.deneme}
              onPress={() => {
                setShowPrice(!showPrice)
                setShowMeets(false)
              }} >
              <Text style={styles.listText}>  Fiyat Listesi  </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowMeets(!showMeets)
                setShowPrice(false)
              }}>
              <Text style={styles.listText}>  Randevu Al  </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.brList} />
        </View>
        {showPrice && (
        <View>
          <PriceList data={route.params.data[0].email}/>
          </View>
        )}
        {showMeets && (
          <View>
            <View style={styles.datePicker}>
              <TouchableOpacity
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => setOpen(!open)}
              >
                <Fontisto name='date' style={{ fontSize: 25, marginRight: 18 }} />
                <TextInput style={styles.date} placeholder='Lütfen Bir Tarih Seçiniz' value={newDate} editable={false} />
              </TouchableOpacity>
              {open && (
                <DateTimePicker
                  value={new Date()}
                  textColor="red"
                  mode="date"
                  display="default"
                  onChange={onChange}
                  minimumDate={new Date()}
                  // maximumDate={new Date(2023, 12, 10)}
                />
              )
              }
            </View>
            { newDate.length > 0 && (
              <View> 
                <View style={styles.timeList} >
              <TouchableOpacity 
                disabled={timeControl('10.00')}
                style={  timeControl('10.00') ? styles.disableClock :  styles.timeSubmit}
                onPress={() => alertButton(('10.00'))}
              >
                <Text style={{ fontSize: 20 }}> 10.00 </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => alertButton(('10.50'))}
                disabled={timeControl('10.50')}
                style={  timeControl('10.50') ? styles.disableClock :  styles.timeSubmit}>
                <Text style={{ fontSize: 20 }}> 10.50 </Text>
              </TouchableOpacity>
              <TouchableOpacity
              disabled={timeControl('11.40')}
                onPress={() => alertButton(('11.40'))}
                style={ timeControl('11.40') ? styles.disableClock : styles.timeSubmit}>
                <Text style={{ fontSize: 20 }}> 11.40 </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.timeList} >
              <TouchableOpacity
              disabled={timeControl('12.30')}
                onPress={() => alertButton(('12.30'))}
                style={ timeControl('12.30') ? styles.disableClock :  styles.timeSubmit}>
                <Text style={{ fontSize: 20 }}> 12.30 </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={timeControl('13.20')}
                onPress={() => alertButton(('13.20'))}
                style={timeControl('13.20') ? styles.disableClock : styles.timeSubmit}>
                <Text style={{ fontSize: 20 }}> 13.20 </Text>
              </TouchableOpacity>
              <TouchableOpacity
              disabled={timeControl('14.10')}
                onPress={() => alertButton(('14.10'))}
                style={timeControl('14.10') ? styles.disableClock : styles.timeSubmit}>
                <Text style={{ fontSize: 20 }}> 14.10 </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.timeList} >
              <TouchableOpacity
              disabled={timeControl('15.00')}
                onPress={() => alertButton(('15.00'))}
                style={timeControl('15.00') ? styles.disableClock : styles.timeSubmit}>
                <Text style={{ fontSize: 20 }}> 15.00 </Text>
              </TouchableOpacity>
              <TouchableOpacity
             disabled={timeControl('15.50')}
                onPress={() => alertButton(('15.50'))}
                style={timeControl('15.50') ? styles.disableClock : styles.timeSubmit}>
                <Text style={{ fontSize: 20 }}> 15.50 </Text>
              </TouchableOpacity>
              <TouchableOpacity
              disabled={timeControl('16.40')}
                onPress={() => alertButton(('16.40'))}
                style={timeControl('16.40')? styles.disableClock : styles.timeSubmit}>
                <Text style={{ fontSize: 20 }}> 16.40 </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.timeList} >
              <TouchableOpacity
              disabled={timeControl('17.20')}
                onPress={() => alertButton(('17.20'))}
                style={timeControl('17.20') ? styles.disableClock : styles.timeSubmit}>
                <Text style={{ fontSize: 20 }}> 17.20 </Text>
              </TouchableOpacity>
              <TouchableOpacity
              disabled={timeControl('18.10')}
                onPress={() => alertButton(('18.10'))}
                style={timeControl('18.10') ? styles.disableClock : styles.timeSubmit}>
                <Text style={{ fontSize: 20 }}> 18.10 </Text>
              </TouchableOpacity>
              <TouchableOpacity
              disabled={timeControl('19.00')}
                onPress={() => alertButton(('19.00'))}
                style={timeControl('19.00') ? styles.disableClock : styles.timeSubmit}>
                <Text style={{ fontSize: 20 }}> 19.00 </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.timeList} >
              <TouchableOpacity 
              disabled={timeControl('19.50')}
                onPress={() => alertButton(('19.50'))}
                style={timeControl('19.50') ? styles.disableClock : styles.timeSubmit}>
                <Text style={{ fontSize: 20 }}> 19.50 </Text>
              </TouchableOpacity>
              <TouchableOpacity
              disabled={timeControl('20.40')}
                onPress={() => alertButton(('20.40'))}
                style={ timeControl('20.40') ? styles.disableClock : styles.timeSubmit}>
                <Text style={{ fontSize: 20 }}> 20.40 </Text>
              </TouchableOpacity>
              <TouchableOpacity
              disabled={timeControl('21.30')}
                onPress={() => alertButton(('21.30'))}
                style={timeControl('21.30') ? styles.disableClock : styles.timeSubmit}>
                <Text style={{ fontSize: 20 }}> 21.30 </Text>
              </TouchableOpacity>
            </View>
              </View>
            )
            }
          </View>

        )}


      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    height: 190,
    width: 385,
    marginTop: 6,
    marginLeft: 3,
    marginRight: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerStyle: {
    fontSize: 20,
    marginLeft: 17,
    fontWeight: 'bold',
    marginTop: 10,
  },
  disableClock: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 110,
    marginHorizontal: 7,
    backgroundColor: 'grey',
  },  
  locationStyle: {
    fontSize: 13,
    marginLeft: 15,
    marginTop: 5,
    color: '#697689',
  },
  brStyle: {
    height: 2,
    width: 370,
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 10,
    bordercolor: 'grey',
  },
  brList: {
    height: 5,
    width: 400,
    borderWidth: 1.5,
    bordercolor: '#BCC9D4',
  },
  numberStyle: {
    // marginHorizontal:120,
    marginLeft: 180,
    marginRight: 30,
    borderWidth: 1,
    height: 40,
    marginTop: 10,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneIcon: {
    fontSize: 20,
  },
  listView: {
    flexDirection: 'row',
    borderColor: 'black',
    height: 40,
    width: 250,
    marginTop: 15,
    alignItems: 'center',
    marginHorizontal: 60,
  },
  listText: {
    fontSize: 21,
  },
  phoneText: {
    fontSize: 18,
  },
  deneme: {
    borderRightWidth: 1,
  },
  datePicker: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    marginTop: 6,
    borderRadius: 5,
    justifyContent: 'center',
    height: 40,
    width: 260,
    marginHorizontal: 50,
  },
  date: {
    fontSize: 20,
    color: 'black',
  },
  timeSubmit: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 110,
    marginHorizontal: 7,
  },
  timeList: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
  }
});
