import React, {useEffect} from 'react';
import type {Theme} from "~/types";
import ThemeCard from "~/components/ThemeCard";
import * as Yup from "yup";
import {string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/src";


export default function ThemeReferencePage() {
    const [themes, setThemes] = React.useState<Theme[]>([]);
    const validationSchema = Yup.object({
            name: string().required('The theme name is required.'),
        }
    );
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<Theme>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

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
        } catch (error: any) {
            console.log(error);
            return error;
        }
    }

    const onSubmit = async (data: Theme) => {
        const response = await fetch("http://localhost:8080/api/v1/theme", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            let result = await response.json();
            setThemes(themes => [...themes,result ] );
        }
        reset();
    }

    useEffect(() => {
        getAllThemes().then((themes: Theme[]) => setThemes(themes));

    }, [])
    return (
        <>
            <div className="grid grid-cols-2 gap-6 mx-auto mt-2">
                <div>
                    {themes.map(theme => <ThemeCard name={theme.name} examples={theme.theme_examples}/>)}
                </div>
                <div>
                    <form onSubmit={handleSubmit(data => onSubmit(data))} method={'POST'} className="mx-auto">
                        <label htmlFor="name">Add Theme</label>
                        <input
                            className="min-w-0 grow bg-gray-700 py-2 pl-1 m-2 text-base text-white placeholder:text-gray-500 focus:outline-white sm:text-sm/6"
                            type="text" id="name" {...register('name')} />
                        <button
                            className="rounded-lg bg-green-800 px-4 py-2 text-sm text-white hover:bg-yellow-500">Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

