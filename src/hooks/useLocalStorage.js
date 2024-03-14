import { useEffect, useState } from "react";


export default function useLocalStorage() {
  const [storage, setStorage] = useState({
    loggedIn: false,
    userId: null
  });

  useEffect(() => {
    getCurrentLocalStorage();
  }, []);

  useEffect(() => {
    console.log(storage);
  }, [storage]);

  const getCurrentLocalStorage = () => {
    const session = localStorage.getItem('session');
    
    if(session) {
      const sessionData = JSON.parse(session);

      setStorage({
        loggedIn: sessionData.loggedIn,
        userId:  sessionData.userId
      });
    } else {
      console.log('session no existe');
      
    }

  }

  const saveData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    getCurrentLocalStorage();
  }

  return {
    storage,
    saveData
  }
}