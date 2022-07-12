import {createContext, useState} from 'react'

export const AlertContext = createContext();

export function AlertProvider({children}) {
  const [alert, setAlert] = useState ({
    type: 'success',
    message: '',
    isOpen: false
  })

  function init(isOpen, type, message) {
    setAlert({
      type: type,
      message: message,
      isOpen: isOpen,
    })
  }

  const value = {
    alert,
    initAlert: init,
  }

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  )
}

