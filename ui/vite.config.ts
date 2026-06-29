import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'

export default defineConfig({
  plugins: [
    react(),
    monacoEditorPlugin({
      languageWorkers: ['editorWorkerService'],
      // python y c++ no ocupan worker en monaco 
      // cuando ya se ocupe el de JS se tiene q poner aqui gang 
    }),
  ],
})