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
    const [coverageEvents ,setCoverageEvents] = useState<CoverageEvent[]>([]);
    const [themes ,setThemes] = useState<Theme[]>([]);
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
        <>
            <h1>This is the HQ dashboard</h1>
            <select>
            {themes.map((theme) => {
              return  <option key={theme.id}>{theme.name}</option>
                } )
            }
            </select>
        </>
    );
}
