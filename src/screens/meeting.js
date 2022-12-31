import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList } from 'react-native';
import Navbar from "../component/navbar";
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, { useEffect, useState } from 'react';
import SaloonScreen from './saloonScreen';
import SaloonProfile from './saloonProfile';
import { firebase } from '../firebaseConfig';
import {Linking} from 'react-native'

const SaloonMeets = () => {
  const [showItem1, setShowItem1] = useState(false)
  const [showItem2, setShowItem2] = useState(false)
  const [showItem3, setShowItem3] = useState(false)
  const [meetsList, setMeetsList] = useState([]);
  const [meetUser, setMeetUser] = useState({})
  const [userMeets, setUserMeets] = useState([])
  const [gecmisList, setGecmisList] = useState([])
  const [gelecekList, setGelecekList] = useState([])


  const userEmail = firebase.auth().currentUser.email;
  console.log(gecmisList)
  console.log(gelecekList)

  useEffect(() => {
    const meetsListele = async () => {
      const userMail = firebase.auth().currentUser.email;
      const data = await firebase.firestore().collection("meets").where("randevuAlan", "==", userMail).get()
      setMeetsList(data.docs.map((doc) => ({ ...doc.data() })));
      const mList = data.docs.map((doc) => ({ ...doc.data() }));
      console.log("denemee", mList)
      let gelecek = [];
      let gecmis = [];
      for (i = 0; i < mList.length; i++) {
        let tarih = new Date(mList[i].date.split(".").reverse().join("/"))
        let tarihNow = new Date()
        console.log("geçmiş", mList[i])
        if (tarih.getDate() < tarihNow.getDate() && tarih.getMonth() <= tarihNow.getMonth() && tarih.getFullYear() <= tarihNow.getFullYear()) {
          gecmis.push(mList[i])
        } else {
          gelecek.push(mList[i])
        }
      }
      setGecmisList(gecmis)
      setGelecekList(gelecek)
      return data.docs.map((doc) => ({ ...doc.data() }));
    };
    meetsListele();
  }, [])
  const flatData = ({ item }) => {
    return (
      <View style={styles.scrollStyle} >
        <View style={{marginLeft:10}}>
        <Text style={styles.scrollTextFont} > {item.saloon} </Text>
        <Text> {item.clock} </Text>
        <Text > {item.date} </Text>
        </View>
      </View>
    )
  };
  return (
    <View>
      <Navbar />
      <View style={styles.container}>
        <Text style={styles.header}>Randevularım</Text>

        <TouchableOpacity style={styles.openItems}
          onPress={() => { setShowItem2(!showItem2) }}
        >
          <Text style={styles.textFont}>
            Aktif Randevularım
          </Text>
          <AntDesign name='check' style={styles.iconStyle} />
        </TouchableOpacity>
        {showItem2 && (<View style={styles.scrollStyle} >
          <FlatList
            data={gelecekList}
            scrollEnabled={false}
            keyExtractor={() => Math.random().toString()}
            renderItem={flatData} />
        </View>)}

        <TouchableOpacity style={styles.openItems}
          onPress={() => { setShowItem3(!showItem3) }}
        >
          <Text style={styles.textFont}>
            Geçmiş  Randevularım
          </Text>
          <AntDesign name='closecircleo' style={styles.iconStyle} />
        </TouchableOpacity>
        {showItem3 && (<View style={styles.scrollStyle} >
          <FlatList
            data={gecmisList}
            scrollEnabled={false}
            keyExtractor={() => Math.random().toString()}
            renderItem={flatData} />
        </View>)}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {

    alignItems: 'center'
  },
  scrollStyle: {
    backgroundColor: '#fff',
    width: 360,
    borderColor: '#330102',
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  scrollTextFont: {
    fontSize: 18,
  },
  itemsStyle: {
    backgroundColor: '#fff',
    alignItems: 'center',
    // flexDirection: 'row',
    width: 390,

    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  iconStyle: {
    color: 'black',
    fontSize: 25,
    margin: 15,
  },
  header: {
    fontSize: 25,
    margin: 15
  },
  openItems: {
    width: 380,
    height: 60,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#330102',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    flexDirection: 'row',
  },
  textFont: {
    fontSize: 23,
    margin: 5
  }
});
export default SaloonMeets;