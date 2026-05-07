import * as Yup from "yup";
import { string, array, object } from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/src";
import type { Theme } from "~/types";

interface ThemeFormData {
    name: string;
    examples: { name: string; description: string }[];
}

interface ThemeFormProps {
    onSuccess: (newTheme: Theme) => void;
    onCancel: () => void;
}

const validationSchema = Yup.object({
    name: string().required("Theme name is required."),
    examples: array().of(
        object({
            name: string().required("Example name is required."),
            description: string().required("Description is required."),
        })
    ),
});

export default function ThemeForm({ onSuccess, onCancel }: ThemeFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<ThemeFormData>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema),
        defaultValues: { name: "", examples: [] },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "examples",
    });

    const onSubmit = async (data: ThemeFormData) => {
        const response = await fetch("http://localhost:8080/api/v1/theme", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: data.name,
                theme_examples: data.examples.map((ex) => ({
                    name: ex.name,
                    description: ex.description,
                })),
            }),
        });

        if (!response.ok) {
            console.error("Failed to create theme");
            return;
        }

        const newTheme: Theme = await response.json();
        reset();
        onSuccess(newTheme);
    };

    return (
        <div className="flex flex-col gap-5">

            {/* Theme name */}
            <div>
                <label htmlFor="name" className="block text-sm text-gray-300 mb-1">
                    Theme Name
                </label>
                <input
                    className="w-full bg-gray-700 py-2 px-3 text-sm text-white placeholder:text-gray-500 focus:outline focus:outline-amber-400 rounded"
                    type="text"
                    id="name"
                    placeholder="e.g. Soldier Readiness"
                    {...register("name")}
                />
                {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                )}
            </div>

            {/* Theme examples */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Theme Examples</span>
                    <button
                        type="button"
                        onClick={() => append({ name: "", description: "" })}
                        className="text-xs text-amber-400 hover:text-amber-300 border border-amber-400 hover:border-amber-300 px-2 py-1 rounded"
                    >
                        + Add Example
                    </button>
                </div>

                {fields.length === 0 && (
                    <p className="text-xs text-gray-500 italic">
                        No examples yet — click "Add Example" to include some.
                    </p>
                )}

                <div className="flex flex-col gap-3">
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="bg-gray-800 border border-gray-600 rounded p-3 flex flex-col gap-2"
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-amber-400 uppercase tracking-widest">
                                    Example {index + 1}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-gray-500 hover:text-red-400 text-xs"
                                >
                                    Remove
                                </button>
                            </div>

                            <div>
                                <input
                                    className="w-full bg-gray-700 py-1.5 px-3 text-sm text-white placeholder:text-gray-500 focus:outline focus:outline-amber-400 rounded"
                                    type="text"
                                    placeholder="Example name"
                                    {...register(`examples.${index}.name`)}
                                />
                                {errors.examples?.[index]?.name && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.examples[index].name?.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <textarea
                                    className="w-full bg-gray-700 py-1.5 px-3 text-sm text-white placeholder:text-gray-500 focus:outline focus:outline-amber-400 rounded resize-none"
                                    rows={2}
                                    placeholder="Brief description"
                                    {...register(`examples.${index}.description`)}
                                />
                                {errors.examples?.[index]?.description && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.examples[index].description?.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-1">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-gray-600 rounded"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm text-white bg-green-800 hover:bg-amber-500 rounded disabled:opacity-50"
                >
                    {isSubmitting ? "Saving..." : "Submit"}
                </button>
            </div>
        </div>
    );
}