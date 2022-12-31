import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button, TouchableOpacity ,Image,FlatList} from 'react-native';
import React, { useState , useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import saloonListeleme from '../component/cityList';
import saloonScreen   from '../screens/saloonScreen';

const HorizontalCard = ()=> {
  const {saloonList } = saloonListeleme();
  const navigation = useNavigation();
 
    const horizontalSubmit =  (deneme) => {
      const data = saloonList.filter((item) => item.email === deneme);
      navigation.navigate('saloonScreen', {data});
    } 
      const flatData = ({ item }) => {
        return (
          <View  >
            <TouchableOpacity style={styles.horizontal} 
            key={(item) => item.email}
            onPress={ ()=> horizontalSubmit(item.email)  }
            > 
              <Image style={styles.imageStyle} source={{uri: (item.downloadUrl)}} />
               <Text  style={styles.textStyle}>       {item.saloonName}</Text> 
            </TouchableOpacity> 
             </View>

        )
      };
  return (
    <View  style={styles.horizontalContainer} >
      <FlatList
       data={(saloonList.reverse()).slice(0, 5)}
        keyExtractor={(item) => item.email.toString()}
        horizontal
        renderItem={flatData } />
    </View>
  );
}

const styles = StyleSheet.create({
  
  imageStyle:{
    height:180,
    width:385,
    marginTop:6,
    marginLeft:3,
    marginRight:3,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
  },
    
  horizontal : { 
    borderWidth:1,
    borderColor:'grey',
    backgroundColor:'#2d4242',
    height:225,
    borderBottomLeftRadius:28,
    
   
  },
  textStyle:{
    fontSize:20,
    color:'#fff'
  }
});

export default HorizontalCard;