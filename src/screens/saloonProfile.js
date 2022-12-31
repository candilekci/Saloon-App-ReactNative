import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity ,TextInput} from 'react-native';
import Navbar from "../component/navbar";
import Feather from 'react-native-vector-icons/Feather';
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { firebase } from '../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import PriceAdd from '../component/addPrice';

import axiosGetCity from '../component/turkeyCityList';
export default function SaloonProfile() {
  
  
  const {turkeyCities} = axiosGetCity();
  const [showItem, setShowItem] = useState(false)
  const [priceList, setPriceList] = useState(false);
  const [priceAdd, setPriceAdd] = useState(false);
  // const [fiyat, setFiyat] = useState('');
  // const [hizmet, setHizmet] = useState('');
  const [userInfo, setUserInfo] = useState([]);
  const [image, setImage] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [adress, setAdress] = useState(null);
  const [saloonName, setSaloonName] = useState(null);
  const [city, setCity] = useState(null);

  const updatePhoto = async( ) => {
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
              firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid)
                .update({
                  downloadUrl: downloadUrl,
            })
            .catch((error) => {
              alert(error.message)
            })
        })
        .catch((error) => {
          alert(error.message)
        })
    setImage(null);
  }
const updateButton = async () => {
  if (image != null) {
     updatePhoto();
  }
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
  useEffect( () => {
     firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid).get()
    .then((doc)=>{
      if (doc.exists) {
        setUserInfo(doc.data());
        setFullName(doc.data().fullName);
        setCity(doc.data().city);
        setPhone(doc.data().phone);
        setAdress(doc.data().adress);
        setSaloonName(doc.data().saloonName);
    } else {
        alert("Kullanıcı bilgileri eksik!");
    }
    })
  }, []);

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
          <Text style={styles.iconText} > Halil Can Dilekçi </Text>
        </View>
        <View>
        <TouchableOpacity style={styles.openItems}
          onPress={() => { setShowItem(!showItem) }}
        >
          <Text style={styles.textFont}>
            Profilim
          </Text>
        </TouchableOpacity>
        {showItem && (
          
        <View style={styles.userInfo} >
        <TextInput style={styles.input} placeholder='Adınız Soyadınız'  value={fullName} onChangeText={(text) => setFullName( text )}/>
        <TextInput style={styles.input} placeholder='Salon Adı'value={saloonName} onChangeText={(text) => setSaloonName( text )}/>
        <TextInput style={styles.input} placeholder='Telefon Numaranız'value={phone} onChangeText={(text) => setPhone( text )} />
          <View style={styles.selectStyle}>
        <Picker
          selectedValue={city}
          onValueChange={(itemValue, itemIndex) =>
         
            setCity( itemValue )
          }>
            
            {
            turkeyCities.map((turkeyCities) => {
              return (
               
                <Picker.Item key={turkeyCities.id} label={turkeyCities.name} value={turkeyCities.name} />
              )
            })
          }
        </Picker>
        </View>
        <TextInput style={styles.input} placeholder='Adres' value={adress} onChangeText={(text) => setAdress( text )} />
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
        )} 
        </View>
        <TouchableOpacity style={styles.openItems} 
        onPress={() => { setPriceAdd(!priceAdd) }}
        >
          <Text style={{fontSize:20}} > Fiyat Ekle  </Text>
        </TouchableOpacity>
        {priceAdd && (<View >
          
          <PriceAdd />

      </View>)} 
      <TouchableOpacity style={styles.openItems} 
        onPress={() => navigation.navigate('priceUpdate')}
        >
          <Text style={{fontSize:20}} > Fiyat Güncelle  </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.openItems} >
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
  priceInputCont:{
    flexDirection:'row',
  } ,
  priceInput:{
    width: 250,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    backgroundColor: '#DCDFE2',
    borderWidth: 1,
    borderRadius: 1,
    marginTop: 10,
   marginHorizontal: 10,
  } ,
  priceInputOne:{
    width: 70,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    backgroundColor: '#DCDFE2',
    borderWidth: 1,
    borderRadius: 1,
    marginTop: 10,
   marginHorizontal: 10,
  } ,
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
