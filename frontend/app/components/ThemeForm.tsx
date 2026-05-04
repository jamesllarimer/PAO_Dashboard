import React, {useEffect, useState} from 'react';
import type {Theme} from "~/types";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup/src";
import MetaChip from "~/components/MetaChip";


export default function ThemeForm() {
    const [themes, setThemes] = useState<Theme[]>([]);
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



    const onSubmit = async (data: Theme) => {
        const response = await fetch("http://localhost:8080/api/v1/theme", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        reset();
    }

    return (
        <div className={"dark:text-amber-50 text-gray-950 content-center text-center"}>
                <form onSubmit={handleSubmit(data => onSubmit(data))} method={'POST'} className="max-w-6xl mx-auto">
                    <label htmlFor="name">Theme Name</label>
                    <input className={"min-w-0 grow bg-gray-700 py-2 pl-1 m-2 text-base text-white placeholder:text-gray-500 focus:outline-white sm:text-sm/6"} type="text" id="name" {...register('name')} />
                    <button
                        className="rounded-lg bg-green-800 px-4 py-2 text-sm text-white hover:bg-yellow-500">Submit
                    </button>
                </form>
        </div>
    );
}

