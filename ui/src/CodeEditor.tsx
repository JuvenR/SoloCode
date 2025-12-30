import { Editor } from "@monaco-editor/react"
import type { Monaco } from "@monaco-editor/react"
import { motion } from 'motion/react'
import { useState, useRef } from "react"
import './css/codeEditor.css'


interface editorLanguageProps {
    language: string,
    setLanguage: (language: string) => void
}

// mapping object to create a boilerplate for each language
const CODE_LANGUAGES: Record< string, string> = {
    javascript : '// hello world from JS',
    python : '# hello world from Python',
    cpp: '// hello world from C++'
}

function CodeEditorHeader({ language, setLanguage }: editorLanguageProps) {

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
                    <motion.button className="run-code" whileHover={{ y: -2 }}>Run Code</motion.button>
                    <motion.button className="submit-code" whileHover={{ y: -2 }}>Submit</motion.button>
                </div>
            </main>
        </>
    )
}

export default function CodeEditor() {

    //state hook to set the language 
    const [language, setLanguage] = useState<string>('javascript')

    // monaco model with useRef hook to save references for each code written and re-render the editor component
    const modelsRef = useRef<Record<string, any>>({}) //!!!!
    const editorRef = useRef<any>(null)
    const handleEditorDidMount = (editor: any, monaco: Monaco) => {
        editorRef.current = editor

        // physical model in the monaco memory per language
        Object.entries(CODE_LANGUAGES).forEach(([languageName, code]) => {
            modelsRef.current[languageName] = monaco.editor.createModel(code, languageName)
        })

        editor.setModel(modelsRef.current['javascript'])
    }

    const changeLanguage = (languageChanged :string) =>{
        setLanguage(languageChanged)
        if(editorRef.current && modelsRef.current[languageChanged]){
            editorRef.current.setModel(modelsRef.current[languageChanged])
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
                <CodeEditorHeader language={language} setLanguage={changeLanguage} />
                <div className="code-editor-area">
                    <Editor
                        height='430px'
                        width='925px'
                        language={language}
                        defaultValue={CODE_LANGUAGES[language]}
                        theme='solocode-theme'
                        onMount={handleEditorDidMount}
                        beforeMount={handleEditorWillMount}
                        options={{
                            fontSize: 14,
                            padding: { top: 24 },
                            minimap: { enabled: false }
                        }} />

                </div>

            </div>

        </>
    )
}