// context/ThemeContext.tsx
import {createContext, type ReactNode, useContext, useEffect, useState} from 'react';
import type {User} from "~/types";
import {useAlert} from '~/context/AlertContext';

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
    const { showError } = useAlert();

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
        } catch (error: any) {
            showError("Failed to load user profiles");
            return [];
        }

    }
    useEffect(() => {
        let localUserId: string;
        localUserId = localStorage.getItem("selectedUserId") || "null"
        getAllUsers().then((users) => {
            setUsers(users)
            if (users) {
                if(localUserId !== "null"){
                    let localUser: User | null | undefined;
                    localUser = users.find((user: User) => user.id === parseInt(localUserId));
                    if(localUser) setActiveUser(localUser)
                }else{
                    setActiveUser(users[0])
                    localStorage.setItem("selectedUserId", users[0].id.toString())
                }
            }
        });
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