import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../firebaseConfig';

export default function PriceAdd() {
    const [hizmet, setHizmet] = useState('');
    const [fiyat, setFiyat] = useState('');
    const userEmail = firebase.auth().currentUser.email;
    const addPrice = async (saat) => {
        try {
            await firebase.firestore().collection('price').doc()
                .set({
                    saloonEmail: userEmail,
                    hizmet: hizmet,
                    fiyat: fiyat,
                })
                setFiyat('')
                setHizmet('')
            alert('Fiyat Eklendi!!')
        } catch (error) {
            alert(error.message)
        }

    }
    return (
        <View>
            <View style={styles.priceInputCont}>
                <TextInput style={styles.priceInput} placeholder='Hizmet Türü' value={hizmet} onChangeText={(text) => setHizmet(text)} />
                <TextInput keyboardType='numeric' style={styles.priceInputOne} placeholder='₺' value={fiyat} onChangeText={(text) => setFiyat(text)} />
            </View>
            <Text> {hizmet} </Text>
            <Text> {fiyat} </Text>
            <TouchableOpacity 
            onPress={() => addPrice()}
            style={styles.submitStyle} >
                <Text style={styles.submitText}> Kaydet </Text>
            </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({
    priceInputOne: {
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
    },
    priceInputCont: {
        flexDirection: 'row',
    },
    submitText: {
        color: 'white',
        fontSize: 16,

    },
    submitStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        marginBottom: 10,
        marginLeft: 190,
        height: 40,
        borderRadius: 10,
        borderWidth: 0.7,
        borderColor: '#D6C42B',
        width: 150,
    },
    priceInput: {
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
    },
})