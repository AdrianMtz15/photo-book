import { useEffect, useState } from "react";


export default function useLocalStorage() {
  const [storage, setStorage] = useState({
    loggedIn: false,
    userId: null,
    password: ''
  });

  useEffect(() => {
    getCurrentLocalStorage();
  }, []);

  useEffect(() => {
    // if()
  }, [storage]);

  const getCurrentLocalStorage = () => {
    const session = localStorage.getItem('session');
    
    if(session) {
      const sessionData = JSON.parse(session);

      setStorage({
        loggedIn: sessionData.loggedIn,
        userId:  sessionData.userId,
        password: sessionData.password
      });
    } else {
      console.log('session no existe');
      
    }

  }

  const saveData = (value) => {
    console.log(value);
        
    localStorage.setItem('session', JSON.stringify(value));
    getCurrentLocalStorage();
  }

  return {
    storage,
    saveData
  }
}