import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity ,Image} from 'react-native';
import React, { useState } from 'react'
import Input from "../component/Input";
import Navbar from "../component/navbar";
import { Picker } from '@react-native-picker/picker';
import { firebase } from '../firebaseConfig';
import AntDesign from 'react-native-vector-icons/AntDesign'
import axiosGetCity from '../component/turkeyCityList';
const UserSign = () => {
  const {turkeyCities} = axiosGetCity();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('user');
  const [fullName, setFullName] = useState('');
  const registerUser = async (email, password, fullName, city, phone, status) => {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase.auth().currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://saloon-app-aa6dd.firebaseapp.com'
          })
            .then(() => {
              alert('Email gönderildi')
            })
            .catch((error) => {
              alert(error.message)
            })
            .then(() => {
              firebase.firestore().collection('users')
              .doc(firebase.auth().currentUser.uid)
              .set({
                fullName,
                city,
                phone,
                status,
                email
              })
            })
            .catch((error) => {
              alert(error.message)
            })
        })
      .catch((error) => {
        alert(error.message)
      })
  }
  
  return (
    <View 
    key={Math.random().toString(36)}
    >
      <Navbar />
      <View style={styles.container} >
      
        <TextInput style={styles.input} placeholder='Adınız Soyadınız' value={fullName} onChangeText={(text) => setFullName( text )} />
        <TextInput style={styles.input} name="mail" placeholder='Mail' value={email} onChangeText={(text) => setEmail(text )} />
        <TextInput style={styles.input} placeholder='Şifre' secureTextEntry value={password} onChangeText={(text) => setPassword(text )} />
        <TextInput style={styles.input} placeholder='Telefon Numaranız' value={phone} onChangeText={(text) => setPhone(text )} />
        <View style={styles.selectStyle}>
          <Picker
            selectedValue={city}
            onValueChange={(itemValue, itemIndex) =>
              // setSelectedItem(itemValue)
              setCity( itemValue )
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
         
        <TouchableOpacity style={styles.button}
          // onPress={() => navigation.navigate('signUp')}
          onPress={() => registerUser(email, password, fullName, city, phone, status)}
          
        >
          <Text> Üye Ol </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
}
const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    backgroundColor: '#DCDFE2',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10
  }, 
  
  button: {
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectStyle: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    backgroundColor: '#DCDFE2',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    marginBottom: 10,
  },
});
export default UserSign;