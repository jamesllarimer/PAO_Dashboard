import type {Route} from "./+types/headquartersDashboard";
import {useEffect, useEffectEvent, useState} from "react";
import type {CoverageEvent, Theme} from "~/types";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "PAO Reporting HQ dashboard home page"},
        {name: "description", content: "PAO Reporting dashboard home page"},
    ];
}


export default function HeadquartersDashboard() {
    const [coverageEvents, setCoverageEvents] = useState<CoverageEvent[]>([]);
    const [themes, setThemes] = useState<Theme[]>([]);

    async function getThemes(): Promise<void> {
        let url = "http://localhost:8080/api/v1/theme"

        try {
            const response = await fetch(url);
            const result = await response.json();
            console.log(result);
            setThemes(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getThemes();
    }, []);
    return (
        <div>
            <h1 className={"text-3xl font-bold dark:text-amber-50 text-gray-950"}>This is the HQ dashboard</h1>
            <select
                className="text-gray-950 dark:text-amber-50 p-2 border-2 border-gray-950 dark:border-green-700
                focus:outline-none focus:border-gray-950 dark:focus:border-green-500 rounded-md bg-white dark:bg-gray-900">
                {themes.map((theme) => {
                    return <option key={theme.id}>{theme.name}</option>
                })
                }
            </select>
        </div>
    );
}
