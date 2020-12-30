import React from 'react';
import { Provider } from 'react-redux';

import createStore from './src/redux/createStore';

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  const store = createStore();
  return (
        <Provider store={store}>{element}</Provider>
  );
};


/*
*
* import React, {useState} from 'react'

//const defaultTheme = "blueTheme"

//export const myContext = React.createContext(defaultTheme)
export const myContext = React.createContext()

const Provider = props => {
    const [isDark, setTheme] = useState(false)

    return (
        <myContext.Provider value={{
            isDark,
            changeTheme: () => setTheme(!isDark)
        }}>
            {props.children}
        </myContext.Provider>
    )
}

export default ({element}) => (
    <Provider>
        {element}
    </Provider>
)
*
* */