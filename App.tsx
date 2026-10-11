import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { EditorView } from './src/components/EditorView';
import { ConsolePanel } from './src/components/ConsolePanel';
import { executeJSCode } from './src/utils/jsExecutor';

export default function App() {
  const [code, setCode] = useState<string>(
    `// مرحباً بك في محرر الجافاسكريبت الاحترافي\n\nconst numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\n\nconsole.log("النتائج:", doubled);\n`
  );
  const [logs, setLogs] = useState<string[]>([]);

  const handleRun = () => {
    executeJSCode(code, (newLog) => {
      setLogs((prev) => [...prev, newLog]);
    });
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
      
      {/* شريط الأدوات العلوي */}
      <View style={styles.toolbar}>
        <Text style={styles.appTitle}>JS Editor Pro</Text>
        <TouchableOpacity style={styles.runButton} onPress={handleRun}>
          <Text style={styles.runButtonText}>▶ تشغيل الكود</Text>
        </TouchableOpacity>
      </View>

      {/* محرر Monaco للكود */}
      <View style={styles.editorContainer}>
        <EditorView code={code} onChangeCode={setCode} onRunCode={handleRun} />
      </View>

      {/* لوحة المخرجات */}
      <ConsolePanel logs={logs} onClear={handleClearLogs} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  toolbar: {
    height: 50,
    backgroundColor: '#252526',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  appTitle: {
    color: '#007acc',
    fontWeight: 'bold',
    fontSize: 16,
  },
  runButton: {
    backgroundColor: '#0e639c',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 4,
  },
  runButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  editorContainer: {
    flex: 1,
  },
});
