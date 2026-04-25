// context/ThemeContext.tsx
import {createContext, type ReactNode, useContext, useEffect, useState} from 'react';
import type {User} from "~/types";

interface UserContextType {
    users: User[] | undefined;
    setUsers: (value: User[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<User[]>();
    async function getAllUsers(): Promise<User[] | any> {
        try {
            const url = 'http://localhost:8080/api/v1/user'
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        }catch (error: any) {
            console.log(error);
            return error;
        }

    }
    useEffect(() => {
        getAllUsers().then((users) => setUsers(users));
    }, []);


    return (
        <UserContext.Provider value={{ users, setUsers}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext(): UserContextType {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('User Context must be used within a UserProvider');
    }
    return context;
}