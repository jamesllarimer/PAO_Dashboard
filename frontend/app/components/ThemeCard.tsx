import type {ThemeExample} from "~/types";

interface ThemeCardProps {
    id: number;
    name: string;
    examples: ThemeExample[];
    onDelete: (id: number) => void;
}

export default function ThemeCard({id, name, examples, onDelete}: ThemeCardProps) {

    const handleDelete = async () => {
       try{
           const response = await fetch(`http://localhost:8080/api/v1/theme/${id}`, {
               method: "DELETE",
           });
           if (response.ok) {
               onDelete(id); // tell the parent to remove it from state
           } else {
               //todo create a bootstrap like alert to use for these
               alert(`Failed to delete theme, make sure it isn't assigned to an existing event`);
           }
       } catch (error) {
           alert(`Failed to delete theme, make sure it isn't assigned to an existing event`);
           console.error(error);
       }
    };

    return (
        <div className="bg-stone-900 border border-stone-700 rounded w-full mb-2">
            {/* Header */}
            <div className="bg-stone-800 border-b border-yellow-400 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-1 self-stretch bg-yellow-400 rounded-none"/>
                    <div>
                        <p className="text-xs text-stone-400 uppercase tracking-widest">Theme</p>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mt-0.5">
                            {name}
                        </h3>
                    </div>
                </div>

                {/* Delete button */}
                <button
                    onClick={handleDelete}
                    className="text-xs text-stone-400 hover:text-red-400 border border-stone-600 hover:border-red-400 px-2 py-1 rounded transition-colors"
                >
                    Delete
                </button>
            </div>

            {/* Examples list */}
            <div className="p-3">
                {examples.map((example) => (
                    <div key={example.id}>
                        <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Theme Examples</p>
                        <div className="gap-3 bg-stone-800 border border-stone-700 px-3 py-2">
                            <p className="text-xs font-bold text-yellow-400 mt-0.5">
                                {example.name}
                            </p>
                            <p className="text-sm text-stone-200 leading-snug">
                                {example.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}