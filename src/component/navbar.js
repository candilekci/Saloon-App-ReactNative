import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button, TouchableOpacity ,Image, SafeAreaView} from 'react-native';
import AppIcon from "./icon";

const Navbar = ()=> {
  
  return (
    <SafeAreaView style={styles.upContainer}  >
      <View style={styles.container}>
      <AppIcon/>
    <Text>
        Saloon App
    </Text>
      </View>
   
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    height:45,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
   
    },
    upContainer :{
      backgroundColor: '#fff',
    }
});

export default Navbar;