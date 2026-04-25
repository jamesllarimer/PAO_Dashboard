import type {Route} from "./+types/headquartersDashboard";
import {useEffect, useEffectEvent, useState} from "react";
import {useUserContext} from "~/context/UserProfileContext"
import ThemeForm from "../components/ThemeForm";
import type {User} from "~/types";
import {list} from "isbot";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "PAO Reporting HQ dashboard home page"},
        {name: "description", content: "PAO Reporting dashboard home page"},
    ];
}


export default function HeadquartersDashboard() {
    const [showThemeForm, setShowThemeForm] = useState(false);
    const {users, setUsers} = useUserContext();
    let usersList = users?.map((user: User) => {
       return <li>{`${user.rank.abbreviation} ${user.firstName} ${user.lastName}`}</li>
    });
    return (
        <div className={"grid grid-flow-col grid-rows-3 gap-1"}>
            <div className={"row-span-3 text-stone-50 border-2 border-white"}>
                <ul>
                    <li><button className={"bg-green-700 p-2"} onClick={()=> setShowThemeForm(!showThemeForm)}>Themes</button></li>
                    {usersList}
                </ul>
            </div>
            <div className={"col-span-2 border-2 border-white"}>
                <h1 className={"text-3xl font-bold dark:text-amber-50 text-gray-950 col-span-2"}>1st Armored Division</h1>
                <span><button>Add theme</button></span>
            </div>
            <div className={"row-span-2 col-span-2 text-stone-50 border-2 border-white"}>
                <h3>Dashboard section</h3>
                {
                   showThemeForm && <ThemeForm />
                }
            </div>

        </div>
    );
}
