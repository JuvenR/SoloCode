import { useState } from "react";
import OptionsMenu from "./OptionsMenu";
import ProblemPage from "./problem-view-page/ProblemPage";

export default function App() {

    const [activeView, setActiveView] = useState<string>('home');

    return (
        <main className="app-shell">
            <OptionsMenu onMenuChange={setActiveView} />
            <ProblemPage />
        </main>

    )
}