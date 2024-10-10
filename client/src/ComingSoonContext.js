// ComingSoonContext.js
import { createContext, useContext, useState } from 'react';

// Create the context
const ComingSoonContext = createContext();

// Provide the context to the rest of the app
export function ComingSoonProvider({ children }) {
    const [comingSoon, setComingSoon] = useState(true);  // Default to true

    return (
        <ComingSoonContext.Provider value={{ comingSoon, setComingSoon }}>
            {children}
        </ComingSoonContext.Provider>
    );
}

// Hook to use the context
export function useComingSoon() {
    return useContext(ComingSoonContext);
}
