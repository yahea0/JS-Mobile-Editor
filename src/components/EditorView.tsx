import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface EditorProps {
  code: string;
  onChangeCode: (newCode: string) => void;
  onRunCode: (codeToRun: string) => void;
}

export const EditorView: React.FC<EditorProps> = ({ code, onChangeCode, onRunCode }) => {
  const webViewRef = useRef<WebView>(null);

  const monacoHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <style>
        html, body, #container {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: #1e1e1e;
        }
      </style>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs/loader.min.js"></script>
    </head>
    <body>
      <div id="container"></div>
      <script>
        require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs' }});
        let editor;

        require(['vs/editor/editor.main'], function() {
          editor = monaco.editor.create(document.getElementById('container'), {
            value: ${JSON.stringify(code)},
            language: 'javascript',
            theme: 'vs-dark',
            automaticLayout: true,
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            lineNumbers: 'on',
            tabSize: 2,
            smoothScrolling: true
          });

          editor.onDidChangeModelContent(() => {
            const currentCode = editor.getValue();
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'CHANGE', code: currentCode }));
          });
        });

        window.addEventListener('message', (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'SET_CODE' && editor) {
              editor.setValue(data.code);
            }
          } catch(e){}
        });
      </script>
    </body>
    </html>
  `;

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'CHANGE') {
        onChangeCode(data.code);
      }
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: monacoHTML }}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
