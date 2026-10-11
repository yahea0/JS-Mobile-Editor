export const executeJSCode = async (
  code: string,
  addLog: (msg: string) => void
) => {
  try {
    const logs: string[] = [];
    
    // إنشاء سياق بيئة تشغيل آمنة للبيانات
    const customConsole = {
      log: (...args: any[]) => {
        const output = args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ');
        logs.push(output);
        addLog(output);
      },
      error: (...args: any[]) => {
        const output = '[ERROR] ' + args.map(arg => String(arg)).join(' ');
        logs.push(output);
        addLog(output);
      },
      warn: (...args: any[]) => {
        const output = '[WARN] ' + args.map(arg => String(arg)).join(' ');
        logs.push(output);
        addLog(output);
      }
    };

    // تنفيذ الكود بنظام Async Function للدعم الكامل لـ Async/Await و Fetch
    const runner = new Function('console', `
      return (async () => {
        ${code}
      })();
    `);

    await runner(customConsole);
  } catch (error: any) {
    addLog(`[خطأ برمجي]: ${error.message || String(error)}`);
  }
};
