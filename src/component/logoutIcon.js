import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity,Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'

const LogOutIcon = ()=> {
  
  return (
    <TouchableOpacity >
        <AntDesign name='logout' style={{color:'black' , fontSize:30 , marginRight:15 }}/> 
    </TouchableOpacity>
  );
}

export default LogOutIcon;