// context/ThemeContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface ThemeContextType {
    isDark: boolean;
    setIsDark: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [isDark, setIsDark] = useState(true);
    useEffect(() => {
       const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setIsDark(prefersDark);
    }, []);
    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}