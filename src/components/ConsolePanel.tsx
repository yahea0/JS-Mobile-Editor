import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

interface ConsoleProps {
  logs: string[];
  onClear: () => void;
}

export const ConsolePanel: React.FC<ConsoleProps> = ({ logs, onClear }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>شاشة المخرجات (Terminal Console)</Text>
        <TouchableOpacity onPress={onClear} style={styles.clearBtn}>
          <Text style={styles.clearBtnText}>مسح</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.logList}>
        {logs.length === 0 ? (
          <Text style={styles.placeholder}>اضغط على تشغيل لعرض نتائج الكود...</Text>
        ) : (
          logs.map((log, index) => (
            <Text key={index} style={styles.logText}>
              {`> ${log}`}
            </Text>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: '#121212',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#1f1f1f',
  },
  title: {
    color: '#007acc',
    fontSize: 12,
    fontWeight: 'bold',
  },
  clearBtn: {
    backgroundColor: '#333',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  clearBtnText: {
    color: '#fff',
    fontSize: 11,
  },
  logList: {
    padding: 10,
  },
  logText: {
    color: '#00ff66',
    fontFamily: 'monospace',
    fontSize: 13,
    marginBottom: 4,
  },
  placeholder: {
    color: '#666',
    fontSize: 12,
    fontStyle: 'italic',
  },
});
