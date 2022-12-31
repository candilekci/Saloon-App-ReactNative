import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../firebaseConfig';

export default function PriceList(data) {
    const [priceList, setPriceList] = useState([]);
    
    let salonMail= data.data;
    console.log("daaattaa",salonMail);
    useEffect(()=>{
        const priceListele= async()=>{
          const data =await firebase.firestore().collection("price").where("saloonEmail"  , "==", salonMail).get()
          setPriceList (data.docs.map((doc)=>({...doc.data()})));
        };
        priceListele();
        },[])
   console.log("priceList",priceList);
    return (
        <ScrollView>
            <View style={styles.container} >
                <View style={{ flexDirection: 'row', alignItems: 'center' ,marginBottom: 2, }}>
                    <View style={{ flex: 1, height: 1, width: 50, backgroundColor: 'black' }} />
                    <Text style={styles.header}>Fiyatlarımız</Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                </View>
                {
            priceList.map((val, i) => {
              return (
                <View style={styles.rowItems}  key={i}>
                    <Text style={styles.rowText}> {val.hizmet} </Text>
                    <Text style={styles.rowText}> {val.fiyat}  </Text>
                    <Text style={{fontSize: 20,}}> ₺ </Text>
                </View>
              )
            })
          }
                
            </View>
        </ScrollView>

    )
}



const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    rowItems: {
        flexDirection: 'row',
        
         borderBottomWidth: 0.6,
         borderBottomColor: 'grey',
        marginTop:5,
        width: 330,
        
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        marginHorizontal: 10,
        fontSize: 22,
    },
    rowText: {
        fontSize: 19,
    },

})