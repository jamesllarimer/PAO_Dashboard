import type {Route} from "./+types/headquartersDashboard";
import {useEffect, useEffectEvent, useState} from "react";
import {useUserContext} from "~/context/UserProfileContext"
import ThemeForm from "../components/ThemeForm";
import type {EventResponseDto, User} from "~/types";
import {list} from "isbot";
import EventGridRow from "~/components/EventGridRow";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "PAO Reporting HQ dashboard home page"},
        {name: "description", content: "PAO Reporting dashboard home page"},
    ];
}


export default function HeadquartersDashboard() {
    const [showThemeForm, setShowThemeForm] = useState<boolean>(false);
    const [showSubordinateEvents, setShowSubordinateEvents] = useState<boolean>(false);
    const [events, setEvents] = useState<EventResponseDto[]>([]);
    const {users, setUsers} = useUserContext();

    let usersList = users?.map((user: User) => {
        return <option key={user.id}
                       value={user.id}>{`${user.rankAbbreviation} ${user.lastName} Role: ${user.role}`}</option>
    });

    async function getAllEvents() {
        try {
            const url = 'http://localhost:8080/api/v1/events'
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            let events = await response.json()
            setEvents(events)
            console.log(events)
            return events;
        } catch (error: any) {
            console.log(error);
            return error;
        }
    }

    useEffect(() => {
        getAllEvents();
    }, []);


    const handleProfileChange = (e: any) => {
        console.log(e.target.value);
        console.log("event fired")
    }
    return (
        <div className={"grid grid-flow-col grid-rows-3 gap-1"}>
            {/*Todo move sidebar into it's own component and make it a layout compo*/}
            <div className={"row-span-3 text-stone-50 border-2 border-white p-2"}>
                <ul className={"flex flex-col gap-1"}>
                    <li>
                        <label className={"m-2"} htmlFor="UserProfileSelect">Change User</label>
                        <select className={"bg-gray-800 p-2 outline-1"} onChange={handleProfileChange}
                                name="userProfileSelect" id="UserProfileSelect">
                            {usersList}
                        </select>
                    </li>
                    <li>
                        <button className={"bg-green-700 p-2"} onClick={() => setShowThemeForm(!showThemeForm)}>Themes
                        </button>
                    </li>
                    <li>
                        <button className={"bg-green-700 p-2"}
                                onClick={() => setShowSubordinateEvents(!showSubordinateEvents)}>Upcoming Events
                        </button>
                    </li>
                </ul>
            </div>
            <div className={"col-span-2 border-2 border-white"}>
                <h1 className={"text-3xl font-bold dark:text-amber-50 text-gray-950 col-span-2"}>1st Armored
                    Division</h1>
                <span><button>Add theme</button></span>
            </div>
            <div className={"row-span-2 col-span-2 text-stone-50 border-2 border-white"}>
                <h3>Dashboard section</h3>
                {
                    showThemeForm && <ThemeForm/>
                }

                {
                    showSubordinateEvents && <table className="table-auto border-collapse border border-gray-400 mt-2">
                        <thead>
                        <tr>
                            <th className={"border border-gray-300"}>Event</th>
                            <th className={"border border-gray-300"} >Type</th>
                            <th className={"border border-gray-300"}>Lead</th>
                            <th className={"border border-gray-300"}>Unit</th>
                            <th className={"border border-gray-300"}>Description</th>
                            <th className={"border border-gray-300"}>Start</th>
                            <th className={"border border-gray-300"} >End</th>
                        </tr>
                        </thead>
                        <tbody>
                        {events.map((event: EventResponseDto) => (
                            <EventGridRow key={event.id} event={event}/>
                        ))
                        }
                        </tbody>
                    </table>
                }
            </div>

        </div>
    );
}
