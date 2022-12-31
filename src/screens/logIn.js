import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from "react";
import { useState } from 'react'
import AppIcon from '../component/icon';
import {firebase} from '../firebaseConfig';

export default logIn = () => {
  const [email, setEmail] = useState('musteri1@gmail.com');
  const [password, setPassword] = useState('123456');
  const navigation = useNavigation();
const resetPassword = async() => {
  await firebase.auth().sendPasswordResetEmail(email)
    alert("Şifre sıfırlama maili gönderildi.")
}
  const handleLogin = async (email , password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);  
    } catch (error) {
      alert("Lütfen belirtilen alanları doldurunuz!")
    }
  }
  return (
    <View style={styles.container} key={()=>  Math.random().toString()} >
      <AppIcon />
      <Text style={styles.textcss}>Saloon App</Text>
      <TextInput style={styles.input} name="mail" placeholder='Mail' 
      value={email}
       onChangeText={(email)=>setEmail(email)} />
      <TextInput style={styles.input} name="password" secureTextEntry placeholder='Password' 
       value={password} 
       onChangeText={(email)=>setPassword(email)} />
      <Text> {email}</Text>
      <Text> {password}</Text>
      <TouchableOpacity onPress={() => handleLogin(email, password)} style={styles.button}>
        <Text> Giriş Yap</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('signUp')}
      >
        <Text> Hesabınız yok mu? </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonUpdate}
      onPress={()=> resetPassword(email)}
      >
        <Text> Şifremi unuttum. </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    width: 180,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom:10,
  },
  buttonUpdate:{
    marginTop:200
  },
  textcss:{
    fontSize:30,
  },
  input: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    backgroundColor: '#DCDFE2',
    borderWidth: 1,
    borderRadius: 15,
    marginTop:20
  },
});
