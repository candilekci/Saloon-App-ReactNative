import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from "../component/navbar";
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Navbar />
    
    <View style={styles.container} >
      
      <TouchableOpacity 
      onPress={() => navigation.navigate('userSign')}
      style={styles.button}>
        <Text> Müşteriyim  </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
      onPress={() => navigation.navigate('saloonSign')}
      >
        <Text> Salon Sahibiyim </Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    alignItems: 'center',
  },
  input: {
    width: 280,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    backgroundColor: '#DCDFE2',
    borderWidth: 1,
    borderRadius: 1,
    marginTop: 10
  },
  button: {
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor:'#fff'
  },
});
export default SignUp;