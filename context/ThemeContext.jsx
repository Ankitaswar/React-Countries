import { createContext, useState } from "react";

// export const themeContext = createContext('This is theme Context')
export const ThemeContext = createContext();

// we are unable to use state here because we can use state inside functional component or in a hook.
// but we can use 

export function ThemeProvider({children}){
    const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem('isDarkMode')))
    return <ThemeContext.Provider value={[isDark, setIsDark]}>
        {children}
    </ThemeContext.Provider>
}