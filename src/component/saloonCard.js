import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import saloonListeleme from '../component/cityList';
import { useNavigation } from '@react-navigation/native'

const SaloonCard = () => {
  const { saloonList } = saloonListeleme();

  const navigation = useNavigation();
  const horizontalSubmit = (deneme) => {
    const data = saloonList.filter((item) => item.email === deneme);

    navigation.navigate('saloonScreen', { data });
  }
 
  const flatData = ({ item }) => {
    return (
      <View  >
        <TouchableOpacity
          onPress={() => horizontalSubmit(item.email)}
          style={styles.CardContainer}>
          <Image style={styles.imageStyle} source={{ uri: (item.downloadUrl) }} />
          <Text style={styles.nameText}> {item.saloonName} </Text>
          <Text style={styles.informationText}> {item.adress} </Text>
        </TouchableOpacity>
      </View>
    )
  };

  return (
    <View style={styles.container} >
      <ScrollView style={{paddingBottom:180}}>
       
        {
          saloonList.map((val, i) => {
            return (
              <View key={i}  >
                <TouchableOpacity
                  
                  onPress={() => horizontalSubmit(val.email)}
                  style={styles.CardContainer}>
                  <Image style={styles.imageStyle} source={{ uri: (val.downloadUrl) }} />
                  <Text style={styles.nameText}> {val.saloonName} </Text>
                  <Text style={styles.informationText}> {val.adress} </Text>
                </TouchableOpacity>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

  },
  CardContainer: {
    height: 200,
    width: 370,
    marginTop: 5,

    backgroundColor: "#DCDFE2",
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: 25,
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  nameText: {
    fontSize: 25,
    paddingLeft: 5,
  },
  informationText: {
    fontSize: 15,
    color: '#063F23',
    paddingLeft: 5,
  },
  imageStyle: {
    height: 130,
    width: 369,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  }
});

export default SaloonCard;