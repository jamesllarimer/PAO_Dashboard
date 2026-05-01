import React, {useEffect} from 'react';
import type {Theme} from "~/types";
import ThemeCard from "~/components/ThemeComponent";

export default function ThemeReferencePage() {
    const [themes, setThemes] = React.useState<Theme[]>([]);
    async function getAllThemes(): Promise<Theme[]> {
        try {
            const url = 'http://localhost:8080/api/v1/theme'
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            let results = await response.json();
            console.log(results);
            return results;
        }catch (error: any) {
            console.log(error);
            return error;
        }

    }
    useEffect(() => {
       getAllThemes().then( (themes: Theme[]) => setThemes(themes));

    }, [])
    return (
        <>
            <div className="flex flex-col gap-4">
            {themes.map(theme => <ThemeCard name={theme.name} isActive={true} examples={theme.theme_examples}/>)}
            </div>
        </>
    );
}

