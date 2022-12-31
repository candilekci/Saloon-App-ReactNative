import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity ,TextInput} from 'react-native';
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import { firebase } from '../firebaseConfig';
import axiosGetCity from './turkeyCityList';

const ProfileUpdate = ({route}) => {
  const {turkeyCities} = axiosGetCity();

    const [image, setImage] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [adress, setAdress] = useState(null);
      const [saloonName, setSaloonName] = useState(null);
      const [city, setCity] = useState(null);


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
    return ( <View style={styles.userInfo} >
        <TextInput style={styles.input} placeholder='Adınız Soyadınız'  value={userInfo.fullName} onChangeText={(text) => setUserInfo({ fullName: text })}/>
        <TextInput style={styles.input} placeholder='Salon Adı'value={userInfo.saloonName} onChangeText={(text) => setUserInfo({ saloonName: text })}/>
        <TextInput style={styles.input} placeholder='Telefon Numaranız'value={userInfo.phone} onChangeText={(text) => setUserInfo({ phone: text })} />
       <Text>{userInfo.fullName}</Text>
          <View style={styles.selectStyle}>
        <Picker
          selectedValue={userInfo.city}
          onValueChange={(itemValue, itemIndex) =>
         
            setUserInfo({ city: itemValue })
          }>
            <Picker.Item  label='Bir Şehir Seçiniz' value={""} />
            {
            turkeyCities.map((turkeyCities) => {
              return (
               
                <Picker.Item label={turkeyCities.name} value={turkeyCities.name} />
              )
            })
          }
        </Picker>
        </View>
        <TextInput style={styles.input} placeholder='Adres' value={userInfo.adress} onChangeText={(text) => setUserInfo({ adress: text })} />
        <TouchableOpacity
            style={styles.imgPicker} onPress={pickImage}>
            <Text> Fotoğraf Ekle  </Text>
            <AntDesign name="cloudupload" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity 
           onPress={() =>  updateButton() }
          style={styles.submitStyle} >
          <Text style={styles.submitText}> Bilgilerimi Güncelle </Text>
        </TouchableOpacity>
        </View>
    )
 }
 const styles = StyleSheet.create({
  
    
  
   
    submitText:{
      color:'white',
      fontSize:16,
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
    submitStyle:{
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'black',
      margin:15,
      marginLeft:140,
      height:40,
      borderRadius:10,
      borderWidth: 0.7,
      borderColor:'#D6C42B',
      width:150,
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
  