import { useState } from "react";
import OptionsMenu from "./OptionsMenu";
import ProblemPage from "./problem-view-page/ProblemPage";
import ProblemListView from "./problem-list-page/ProblemListView";
import AddProblemView from "./add-problem-page/AddProblemView";

export default function App() {

    const [activeView, setActiveView] = useState<string>('home');

    return (
        <main className="app-shell">
            <OptionsMenu onMenuChange={setActiveView} />
            {activeView === 'home' && <ProblemPage />}
            {activeView === 'problemlist' && <ProblemListView />}
            {activeView === 'addproblem' && <AddProblemView />}
            
        </main>

    )
}