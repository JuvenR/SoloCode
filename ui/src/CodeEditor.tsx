import { Editor } from "@monaco-editor/react"
import type { Monaco } from "@monaco-editor/react"
import { motion } from 'motion/react'
import { useRef } from "react"
import './css/codeEditor.css'
import { loader } from "@monaco-editor/react";

loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs'
  },
});

interface editorLanguageProps {
    language: string,
    setLanguage: (language: string) => void,
    onRun: () => void,
    isLoading: boolean
}

// mapping object to create a boilerplate for each language
const CODE_LANGUAGES: Record<string, string> = {
    javascript: '// hello world from JS',
    python: '# hello world from Python',
    cpp: '// hello world from C++'
}

function CodeEditorHeader({ language, setLanguage, onRun, isLoading }: editorLanguageProps) {

    return (
        <>
            <main className="main-header">
                <div>
                    <select className="cbx-languages" value={language} onChange={(e) => setLanguage(e.target.value)} >
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

export default function CodeEditor({ controller }: { controller: any }) {

    // monaco model with useRef hook to save references for each code written and re-render the editor component
    const modelsRef = useRef<Record<string, any>>({})
    const editorRef = useRef<any>(null)

    const handleEditorDidMount = (editor: any, monaco: Monaco) => {
        editorRef.current = editor

        // physical model in the monaco memory per language
        Object.entries(CODE_LANGUAGES).forEach(([languageName, code]) => {
            modelsRef.current[languageName] = monaco.editor.createModel(code, languageName)
        })
        const initialModel = modelsRef.current['javascript']
        editor.setModel(initialModel)
        controller.setCode(initialModel.getValue())
    }

    const changeLanguage = (languageChanged: string) => {
        controller.setLanguage(languageChanged)
        if (editorRef.current && modelsRef.current[languageChanged]) {
            const newModel = modelsRef.current[languageChanged]
            editorRef.current.setModel(newModel)
            controller.setCode(newModel.getValue())
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