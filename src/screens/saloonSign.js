import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { register } from '../firebaseConfig';
import React, { useEffect, useState } from 'react'
import { async } from '@firebase/util';
import Input from "../component/Input";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Navbar from "../component/navbar";
import { Picker } from '@react-native-picker/picker';
import { firebase } from '../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import axiosGetCity from '../component/turkeyCityList';
const SaloonSign = () => {
  const { turkeyCities } = axiosGetCity();

  const [selectedItem, setSelectedItem] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [saloonName, setSaloonName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('saloon');
  const [fullName, setFullName] = useState('');
  const [adress, setAdress] = useState('');
  const [image, setImage] = useState(null);
  const [urlImage, setUrlImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handluPickImage = async (email, password, fullName, city, phone, status, adress, saloonName) => {
    const response = await fetch(image);
    const blob = await response.blob();
    const fileName = image.substring(image.lastIndexOf('/') + 1);

    var ref = firebase.storage().ref().child(fileName).put(blob);
    try {
      await ref;
    } catch (error) {
      console.log(error);
      alert("Fotoğraf yüklemeyi tekrar deneyiniz.")
    }
    firebase.storage().ref().child(fileName).getDownloadURL()
      .then((downloadUrl) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
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
                    adress,
                    saloonName,
                    downloadUrl,
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
      })
    setImage(null);
  }
  return (
    <View key={
      Math.random().toString(36).substring(7)
    }>
      <Navbar />
      <ScrollView>
        <View style={styles.container} >
          <TextInput style={styles.input} placeholder='Adınız Soyadınız' value={fullName} onChangeText={(text) => setFullName(text)} />
          <TextInput style={styles.input} placeholder='Mail' value={email} onChangeText={(text) => setEmail(text)} />
          <TextInput style={styles.input} secureTextEntry placeholder='Şifre' value={password} onChangeText={(text) => setPassword(text)} />
          <TextInput style={styles.input} placeholder='Salon Adı' value={saloonName} onChangeText={(text) => setSaloonName(text)} />
          <TextInput keyboardType='numeric' style={styles.input} placeholder='Telefon Numaranız' value={phone} onChangeText={(text) => setPhone(text)} />
          <TextInput style={styles.input} placeholder='Adres' value={adress} onChangeText={(text) => setAdress(text)} />
          <View style={styles.selectStyle}>
            <Picker
              selectedValue={city}
              onValueChange={(itemValue, itemIndex) =>
                setCity(itemValue)
              }>
              <Picker.Item label='Bir Şehir Seçiniz' value={""} />
              {
                turkeyCities.map((turkeyCities) => {
                  return (

                    <Picker.Item key={turkeyCities.id} label={turkeyCities.name} value={turkeyCities.name} />
                  )
                })
              }
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.imgPicker} onPress={pickImage}>
            <Text> Fotoğraf Ekle  </Text>
            <AntDesign name="cloudupload" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.button}
            onPress={() => handluPickImage(email, password, fullName, city, phone, status, adress, saloonName)}
          >
            <Text> Üye Ol </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    alignItems: 'center',
  },
  imgPicker: {
    flexDirection: 'row',
    width: 135,
    borderWidth: 1,
    height: 30,
    alignItems: 'center',
    marginLeft: 175,
    marginTop: 10,
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    backgroundColor: '#DCDFE2',
    borderWidth: 1,
    borderRadius: 1,
    marginTop: 10
  },
  imgPicker: {
    width: 170,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    marginStart: 100,
    marginVertical: 10,

  },
  button: {
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
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
  },
});
export default SaloonSign;