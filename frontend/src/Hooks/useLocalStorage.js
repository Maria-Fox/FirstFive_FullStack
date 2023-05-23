import { useState, useEffect } from "react"
// used to track token && notes throughout the app. Behaves as state w/ localstorage features.

// key = const firstfive_token = "token". If the key given does not exist it will default.
function useLocalStorage(key, defaultValue = null) {

  const initialValue = localStorage.getItem(key) || defaultValue;

  // Initiates state
  let [item, setItem] = useState(initialValue);

  useEffect(
    function setLocalStorage() {

      if (!item) {
        // if the null OR ran above, remove the item
        window.localStorage.removeItem(key);
      } else {
        // if it's the first time, or the item exists set the value of the local storage item.
        window.localStorage.setItem(key, item)
      }
    }, [key, item]
  );


  // returns the new piece of state along with a setState function to update.

  return [item, setItem];
}


export default useLocalStorage;

// "token" = key.... passed in from App.js