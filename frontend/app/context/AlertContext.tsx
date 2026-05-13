import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type AlertType = 'success' | 'error';

interface AlertItem {
    id: string;
    type: AlertType;
    message: string;
}

interface AlertContextValue {
    alerts: AlertItem[];
    showSuccess: (message: string) => void;
    showError: (message: string) => void;
    dismiss: (id: string) => void;
}

const AlertContext = createContext<AlertContextValue | null>(null);

export function AlertProvider({ children }: { children: ReactNode }) {
    const [alerts, setAlerts] = useState<AlertItem[]>([]);

    const dismiss = useCallback((id: string) => {
        setAlerts(prev => prev.filter(a => a.id !== id));
    }, []);

    const push = useCallback((type: AlertType, message: string) => {
        const id = `${Date.now()}-${Math.random()}`;
        setAlerts(prev => [...prev, { id, type, message }]);
        setTimeout(() => {
            setAlerts(prev => prev.filter(a => a.id !== id));
        }, 4000);
    }, []);

    const showSuccess = useCallback((message: string) => push('success', message), [push]);
    const showError = useCallback((message: string) => push('error', message), [push]);

    return (
        <AlertContext.Provider value={{ alerts, showSuccess, showError, dismiss }}>
            {children}
        </AlertContext.Provider>
    );
}

export function useAlert(): AlertContextValue {
    const ctx = useContext(AlertContext);
    if (!ctx) throw new Error('useAlert must be used within AlertProvider');
    return ctx;
}
