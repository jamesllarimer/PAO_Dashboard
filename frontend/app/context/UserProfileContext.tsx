// context/ThemeContext.tsx
import {createContext, type ReactNode, useContext, useEffect, useState} from 'react';
import type {User} from "~/types";

interface UserContextType {
    users: User[] | undefined;
    setUsers: (value: User[]) => void;
    activeUser: User | null | undefined;
    setActiveUser: (value: User | null ) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<User[]>();
    const [activeUser, setActiveUser] = useState<User | null>(null);

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
        if (users) {
            setActiveUser(users[0])
        }
    }, []);


    return (
        <UserContext.Provider value={{ users, setUsers, activeUser, setActiveUser}}>
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