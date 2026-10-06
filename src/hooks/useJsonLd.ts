import { useEffect } from 'react';

export function useJsonLd(schemaData: Record<string, any> | Record<string, any>[], scriptId: string) {
  useEffect(() => {
    if (!schemaData) return;

    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schemaData, null, 2);

    return () => {
      // Clean up dynamic script tag on component unmount if needed
      const existingScript = document.getElementById(scriptId);
      if (existingScript && scriptId !== 'global-localbusiness-schema') {
        existingScript.remove();
      }
    };
  }, [schemaData, scriptId]);
}
