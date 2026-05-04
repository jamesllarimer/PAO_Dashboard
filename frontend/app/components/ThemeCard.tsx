import type {ThemeCardProps} from "~/types";

export default function ThemeCard({ name, examples }: ThemeCardProps) {


    return (
        <div className="bg-stone-900 border border-stone-700 rounded  w-full">
            {/* Header */}
            <div className="bg-stone-800 border-b border-yellow-400 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-1 self-stretch bg-yellow-400 rounded-none" />
                    <div>
                        <p className="text-xs text-stone-400 uppercase tracking-widest">Theme</p>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mt-0.5">
                            {name}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Examples list */}
            <div className=" p-3">
                {examples.map((example) => (
                    <div
                        key={example.id}
                        className="gap-3 bg-stone-800 border border-stone-700 border-l-2 border-l-yellow-400 rounded-sm px-3 py-2"
                    >
                        <p className="text-xs font-bold text-yellow-400 mt-0.5">
                            {example.name}
                        </p>
                        <p className="text-sm text-stone-200 leading-snug">
                            {example.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}