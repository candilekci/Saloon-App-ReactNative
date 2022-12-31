import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView ,FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../firebaseConfig';
import Navbar from "../component/navbar";
export default function PriceUpdate() {
    const [priceList, setPriceList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const yenile = () => {
        setRefreshing(true);

    }
    
    const deleteItem =  (item) => {
    console.log("item", item);
    let delHizmet= (item.hizmet).toString();
    setPriceList(priceList.filter(({ hizmet }) =>  delHizmet !== hizmet ));
    var query = firebase.firestore().collection("price")
    query = query.where("saloonEmail", "==", currentEmail)
    query = query.where("hizmet", "==", delHizmet)
    query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();})
        }); 
    };
    useEffect(() => {
        const priceListele = async () => {
            const data = await firebase.firestore().collection("price").where("saloonEmail", "==", currentEmail).get();
            setPriceList(data.docs.map((doc) => ({ ...doc.data() })));
        };
        priceListele();
    }, [])
    
    console.log("priceList", priceList);
    const flatData = ({ item }) => {
        return (
            <View style={styles.rowItems} >
                <View style={styles.textItems}>
                    <Text style={styles.rowText}> {item.hizmet} </Text>
                    <Text style={styles.rowText}> {item.fiyat}</Text>
                    <Text style={{ fontSize: 16, }}> ₺ </Text>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => deleteItem(item)}
                        style={styles.submitStyle}
                    >
                        <Text style={{ color: 'white' }}> Sil </Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    };
    const currentEmail = (firebase.auth().currentUser.email)
    console.log("currentEmail", priceList);
    return (
        <View>
            <Navbar />

            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2, }}>
                    <View style={{ flex: 1, height: 1, width: 50, backgroundColor: 'black' }} />
                    <Text style={styles.header}>Fiyatları Güncelle</Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                </View>

                <FlatList
                    data={priceList}
                    keyExtractor={() => Math.random().toString()}
                   
                    renderItem={flatData} />
            </View>

        </View>

    )
}



const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    textItems: {
        flexDirection: 'row',
    },
    rowItems: {

        flexDirection: 'row',
        borderBottomWidth: 0.6,
        borderBottomColor: 'grey',
        marginTop: 5,
        width: 330,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    header: {
        marginHorizontal: 10,
        fontSize: 22,
    },
    rowText: {
        fontSize: 15,
    },
    submitStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        height: 33,
        marginBottom: 3,
        borderRadius: 10,
        borderWidth: 0.7,
        borderColor: '#D6C42B',
        width: 70,

    },

})