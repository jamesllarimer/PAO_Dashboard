import React, { useEffect, useState } from 'react';
import type { Theme } from "~/types";
import ThemeCard from "~/components/ThemeCard";
import Modal from "~/components/Modal";
import ThemeForm from "~/components/ThemeForm";
import {useAlert} from "~/context/AlertContext";

export default function ThemeReferencePage() {
    const [themes, setThemes] = useState<Theme[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const {showError} = useAlert();

    async function getAllThemes(): Promise<Theme[]> {
        try {
            const url = 'http://localhost:8080/api/v1/theme';
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            let results = await response.json();
            console.log(results);
            return results;
        } catch (error: any) {
            showError("Failed to load themes");
            return [];
        }
    }

    useEffect(() => {
        getAllThemes().then((themes: Theme[]) => setThemes(themes));
    }, []);
    const handleThemeDeleted = (deletedId: number) => {
        setThemes((prev) => prev.filter((t) => t.id !== deletedId));
    };
    const handleThemeCreated = (newTheme: Theme) => {
        setThemes((prev) => [...prev, newTheme]);
        setShowModal(false);
    };

    return (
        <>
            <div className="grid gap-6 mx-auto mt-2 p-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-white text-xl font-semibold">Themes</h2>
                    <button
                        onClick={() => setShowModal(true)}
                        className="rounded-lg bg-green-800 px-4 py-2 text-sm text-white hover:bg-amber-500"
                    >
                        + Add Theme
                    </button>
                </div>

                <div>
                    {themes.map((theme) => (
                        <ThemeCard
                            key={theme.id}
                            id={theme.id}
                            name={theme.name}
                            examples={theme.theme_examples}
                            onDelete={() => handleThemeDeleted(theme.id)}
                        />
                    ))}
                </div>
            </div>

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Add Theme"
            >
                <ThemeForm
                    onSuccess={handleThemeCreated}
                    onCancel={() => setShowModal(false)}
                />
            </Modal>
        </>
    );
}