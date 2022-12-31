import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native'
import saloonListeleme from '../component/cityList';

const SmallHorizontal = () => {
  const { saloonList } = saloonListeleme();
  const navigation = useNavigation();
  const horizontalSubmit = (deneme) => {
    const data = saloonList.filter((item) => item.email === deneme);

    navigation.navigate('saloonScreen', { data });
    
  }
  const flatData = ({ item }) => {
    return (
      <View  >

        <TouchableOpacity style={styles.horizontal}
          onPress={() => horizontalSubmit(item.email)}>
          <Image style={styles.imageStyle} source={{ uri: (item.downloadUrl) }} />
          <Text style={styles.textStyle}> {item.saloonName}</Text>
          <View style={styles.location} >
            <Entypo style={{ fontSize: 15, marginLeft: 7 }} name='location' />
            <Text style={styles.textStyle}>  {item.city}</Text>
          </View>
        </TouchableOpacity>
      </View>

    )
  };
  return (
    <View style={styles.horizontalContainer} >
      <FlatList
        data={saloonList.slice(0, 8)}
        keyExtractor={(item) => item.email.toString()}

        horizontal
        renderItem={flatData} />
    </View>
  );
}

const styles = StyleSheet.create({

  imageStyle: {
    height: 100,
    width: 150,
    margin: 5,
    borderRadius: 15,

  },
  location: {
    flexDirection: 'row'
  },

  horizontal: {
    borderWidth: 1,
    height: 160,
    marginLeft: 5,
    marginRight: 3,
    borderRadius: 18,
  },
  textStyle: {


  }
});

export default SmallHorizontal;