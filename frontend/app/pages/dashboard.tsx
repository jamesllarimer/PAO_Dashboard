import type {Route} from "./+types/dashboard";


export function meta({}: Route.MetaArgs) {
    return [
        {title: "PAO Reporting dashboard home page"},
        {name: "description", content: "PAO Reporting dashboard home page"},
    ];
}

export default function Dashboard() {
    return (
        <>
            <h1>This is the dashboard</h1>
        </>
    );
}
