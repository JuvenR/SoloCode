import { Editor } from "@monaco-editor/react";
import { motion } from 'motion/react'
import './css/codeEditor.css'
//state hook to set the language (on the header)
// context hook to get the language and set on the editor

function CodeEditorHeader() {
    return (
        <>
            <main className="main-header">
                <div>
                    <select className="cbx-languages">
                        <option className="op-language">Javascript</option>
                        <option className="op-language">Python</option>
                        <option className="op-language">C</option>
                    </select>
                </div>
                <div className="button-group">
                    <motion.button className="run-code" whileHover={{y:-2}}>Run Code</motion.button>
                    <motion.button className="submit-code" whileHover={{y:-2}}>Submit</motion.button>
                </div>
            </main>
        </>
    )
}

export default function CodeEditor() {

    const handleEditorWillMount = (monaco: any) => {
        monaco.editor.defineTheme('solocode-theme', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '#616481ff' }
            ],
            colors: {
                'editor.background': '#1C1D27',
                'editor.lineHighlightBackground': '#57597141',
                'editorLineNumber.foreground': '#45475a'
            }
        });
    };

    return (
        <>
            <div className="code-editor-area">
                <CodeEditorHeader />
                <Editor
                    height='500px'
                    width='925px'
                    defaultLanguage='javascript'
                    defaultValue="//hello"
                    theme='solocode-theme'
                    beforeMount={handleEditorWillMount}
                    options={{
                        fontSize: 14,
                        padding: { top: 24 },
                        minimap: { enabled: false }
                    }}
                >
                </Editor>
            </div>

        </>
    )
}