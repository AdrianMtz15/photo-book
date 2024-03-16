import { useEffect, useState } from "react";


export default function useLocalStorage() {
  const [storage, setStorage] = useState({
    loggedIn: false,
    userId: null,
  });

  useEffect(() => {
    getCurrentLocalStorage();
  }, []);

  const getCurrentLocalStorage = () => {
    const session = localStorage.getItem('session');
    
    if(session) {
      const sessionData = JSON.parse(session);
      setStorage(sessionData);
    } 
  }

  const saveData = (value) => {
    localStorage.setItem('session', JSON.stringify(value));
    getCurrentLocalStorage();
  }

  return {
    storage,
    saveData
  }
}