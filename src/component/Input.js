import { StatusBar } from 'expo-status-bar';
import { TextInput,StyleSheet } from 'react-native';

const Input = () => {
  return (
    <TextInput style={styles.input} />
  );
}
const styles = StyleSheet.create({
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
});
export default Input;