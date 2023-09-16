import { createContext, useState } from "react";

const defaultValue = {
  currentPosition: null,
};

export const NavigationContext = createContext(defaultValue);

function NavigationProvider(props) {
  const { children } = props;

  const [currentPosition, setCurrentPosition] = useState(null);

  return (
    <NavigationContext.Provider value={{ currentPosition, setCurrentPosition }}>
      {children}
    </NavigationContext.Provider>
  );
}

export default NavigationProvider;
