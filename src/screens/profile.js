import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity ,TextInput} from 'react-native';
import Navbar from "../component/navbar";
import Feather from 'react-native-vector-icons/Feather';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import {logout } from '../firebaseConfig';
import { Picker } from '@react-native-picker/picker';
import { firebase } from '../firebaseConfig';
import axiosGetCity from '../component/turkeyCityList';

export default function Profile() {
  
  const {turkeyCities} = axiosGetCity();

  const [showItem, setShowItem] = useState(false);
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('user');
  const [fullName, setFullName] = useState('');
  const[userInfo,setUserInfo] = useState({})
  
  useEffect( () => {
     firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid).get()
    .then((doc)=>{
      if (doc.exists) {
        setUserInfo(doc.data())
        setFullName(doc.data().fullName);
        setCity(doc.data().city);
        setPhone(doc.data().phone);
    } else {
        alert("Kullanıcı bilgileri eksik!");
    }
      
    })
  }, []);
  
  const updateButton = async () => {
    
    await firebase.firestore().collection('users')
                  .doc(firebase.auth().currentUser.uid)
                  .update({
                    fullName:fullName,
                    city: city,
                    phone: phone,
                    adress: adress,
                    saloonName:saloonName,
              }).then(() => {
                alert("Bilgiler başarıyla güncellendi.")
              })
              .catch((error) => {
                alert(error.message)
              })
  }
  const navigation = useNavigation();
  const handleLogout = async()=>{
    await firebase.auth().signOut();
    navigation.replace('logIn');
  }
  return (
    <View >
      <Navbar />
      <View style={styles.container}>
        <View style={styles.userCard}>
          <Feather name='user' style={styles.iconStyle} />
          <Text style={styles.iconText} > {userInfo.fullName} </Text>
        </View>
        <View>
        <TouchableOpacity style={styles.openItems}
          onPress={() => { setShowItem(!showItem) }}
        >
          <Text style={styles.textFont}>
            Profilim
          </Text>
        </TouchableOpacity>
        {showItem && (<View style={styles.userInfo} >
         <TextInput style={styles.input} placeholder='Adınız Soyadınız' value={fullName} onChangeText={(text) => setFullName(text )} />
        <TextInput keyboardType='numeric' style={styles.input} placeholder='Telefon Numaranız' value={phone} onChangeText={(text) => setPhone(text )} />
        <View style={styles.selectStyle}>
          <Picker
            selectedValue={city}
            value='Şehir Seçiniz'
            onValueChange={(itemValue, itemIndex) =>
              setCity( itemValue )
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
          <TouchableOpacity onPress={updateButton} style={styles.submitStyle} >
          <Text style={styles.submitText}> Bilgilerimi Güncelle </Text>
        </TouchableOpacity>
        </View>)} 
        </View>

        <TouchableOpacity style={styles.openItems} 
       
        >
          <Text style={{fontSize:20}} > Hesabımı Sil </Text>
          <AntDesign name='delete' style={{color:'black' , fontSize:25 , marginRight:15 }}/> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.openItems} onPress={()=> handleLogout()}
        >
          <Text style={{fontSize:20}} > Çıkış Yap </Text>
          <AntDesign name='logout' style={{color:'black' , fontSize:25 , marginRight:15 }}/> 
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfo:{
    alignItems:'center',
  },
  openItems: {
    width: 380,
    height: 60,
    backgroundColor: '#fff',
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderTopWidth:1,
  },
  textFont: {
    fontSize: 23,
    margin: 5
  },
  container: {
    alignItems: 'center'
  },
  submitText:{
    color:'white',
    fontSize:16,
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
  logOutStyle:{
    flexDirection:'row',
    alignItems:'center',
   
    marginTop:150,
  },
  userCard: {
    width: 380,
    borderWidth: 0,
    borderRadius: 8,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 65,
    borderColor: 'grey',

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
  iconStyle: {
    marginLeft: 18,
    color: 'black',
    fontSize: 50,
    borderWidth: 2,
    borderRadius: 15,
    width: 52,

  },
  iconText: {
    fontSize: 25,
    marginLeft: 25
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
