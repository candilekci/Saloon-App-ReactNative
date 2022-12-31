import { firebase } from '../firebaseConfig';
import React , {useState , useEffect} from 'react';

const meetsListeleme  = () => {
  const [meetsList, setMeetsList] = useState([]);
  useEffect(()=>{
    const meetsListele= async()=>{
      const data =await firebase.firestore().collection("meets").get()
      setMeetsList(data.docs.map((doc)=>({...doc.data()})));
    };
    meetsListele();
  },[])
return {meetsList};
}
console.log(meetsListeleme);
export default meetsListeleme;
