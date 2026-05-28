import { Editor } from "@monaco-editor/react"
import type { Monaco } from "@monaco-editor/react"
import type { editor as MonacoEditor } from "monaco-editor"
import { motion } from 'motion/react'
import { useRef } from "react"
import '../css/codeEditor.css'
import { loader } from "@monaco-editor/react";
import type { EditorLanguage, ProblemController } from "../controllers/UseProblemController"

loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs'
  },
});

interface EditorLanguageProps {
    language: EditorLanguage,
    setLanguage: (language: EditorLanguage) => void,
    onRun: () => void,
    isLoading: boolean
}

// mapping object to create a boilerplate for each language
const CODE_LANGUAGES: Record<EditorLanguage, string> = {
    javascript: '// hello world from JS',
    python: '# hello world from Python',
    cpp: '// hello world from C++'
}

function CodeEditorHeader({ language, setLanguage, onRun, isLoading }: EditorLanguageProps) {

    return (
        <>
            <main className="main-header">
                <div>
                    <select className="cbx-languages" value={language} onChange={(e) => setLanguage(e.target.value as EditorLanguage)} >
                        <option className="op-language" value='javascript'>Javascript</option>
                        <option className="op-language" value='python'>Python</option>
                        <option className="op-language" value='cpp'>C++</option>
                    </select>
                </div>
                <div className="button-group">
                    <motion.button
                        className="run-code"
                        whileHover={{ y: -2 }}
                        onClick={onRun}
                        disabled={isLoading}
                        style={{opacity:isLoading ? 0.5 : 1}}
                    >{isLoading ? 'Running' : 'Run Code'}
                    </motion.button>

                    <motion.button className="submit-code" whileHover={{ y: -2 }}>Submit</motion.button>
                </div>
            </main>
        </>
    )
}

export default function CodeEditor({ controller }: { controller: ProblemController }) {

    // monaco model with useRef hook to save references for each code written and re-render the editor component
    const modelsRef = useRef<Partial<Record<EditorLanguage, MonacoEditor.ITextModel>>>({})
    const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null)

    const handleEditorDidMount = (editor: MonacoEditor.IStandaloneCodeEditor, monaco: Monaco) => {
        editorRef.current = editor

        // physical model in the monaco memory per language
        const languageEntries = Object.entries(CODE_LANGUAGES) as [EditorLanguage, string][]
        languageEntries.forEach(([languageName, code]) => {
            modelsRef.current[languageName] = monaco.editor.createModel(code, languageName)
        })
        const initialModel = modelsRef.current['javascript']
        if (initialModel) {
            editor.setModel(initialModel)
            controller.setCode(initialModel.getValue())
        }
    }

    const changeLanguage = (languageChanged: EditorLanguage) => {
        controller.setLanguage(languageChanged)
        if (editorRef.current && modelsRef.current[languageChanged]) {
            const newModel = modelsRef.current[languageChanged]
            if (newModel) {
                editorRef.current.setModel(newModel)
                controller.setCode(newModel.getValue())
            }
        }
    }

    const handleEditorChange = ( value: string | undefined) => {
        controller.setCode(value || "")
    }

    const handleRunClick = () => {
        if (editorRef.current) {
            controller.runCode()
        }
    }

    const handleEditorWillMount = (monaco: Monaco) => {
        monaco.editor.defineTheme('solocode-theme', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '#616481ff' }
            ],
            colors: {
                'editor.background': '#1C1D27',
                'editor.lineHighlightBackground': '#57597141',
                'editorLineNumber.foreground': '#45475a',
                'editor.selectionBackground': '#6f749456'
            }
        });
    };


    return (
        <>
            <div >
                <CodeEditorHeader
                    language={controller.language}
                    setLanguage={changeLanguage}
                    onRun={handleRunClick} 
                    isLoading={controller.isRunning}
                />
                <div className={`code-editor-area ${controller.statusColor}`} >
                    <Editor
                        height='430px'
                        width='930px'
                        language={controller.language}
                        defaultValue={CODE_LANGUAGES[controller.language]}
                        theme='solocode-theme'
                        onMount={handleEditorDidMount}
                        beforeMount={handleEditorWillMount}
                        options={{
                            fontSize: 14,
                            padding: { top: 24 },
                            minimap: { enabled: false }
                        }} 
                        onChange={handleEditorChange}/>

                </div>

            </div>

        </>
    )
}
