import type {Route} from "./+types/home";


export function meta({}: Route.MetaArgs) {
    return [
        {title: "PAO Reporting dashboard home page"},
        {name: "description", content: "PAO Reporting dashboard home page"},
    ];
}

export default function Home() {
    return (
        <>
           <h1>This is the home page</h1>
        </>
    );
}
