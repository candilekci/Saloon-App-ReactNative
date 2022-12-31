import { firebase } from '../firebaseConfig';
import React , {useState , useEffect} from 'react';

const saloonListeleme  = () => {
  const [saloonList, setSaloonList] = useState([]);

  useEffect(()=>{
    const saloonListele= async()=>{
      const data =await firebase.firestore().collection("users").where("status", "==", "saloon").get()
      setSaloonList(data.docs.map((doc)=>({...doc.data()})));
      
    };
    saloonListele();
  },[])


return {saloonList  };


}
export default saloonListeleme;
