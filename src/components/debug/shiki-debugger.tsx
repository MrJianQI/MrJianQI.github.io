"use client";

import { useEffect, useRef } from "react";

export function ShikiDebugger() {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (spanRef.current) {
      const computed = window.getComputedStyle(spanRef.current);
      console.log("%c[Shiki Debugger]", "background: #222; color: #bada55; font-size: 12px; padding: 4px;");
      console.log("--------------------------------------------------");
      console.log("Target Element:", spanRef.current);
      console.log("Computed Color (RGB):", computed.color);
      console.log("CSS Variable --shiki-light:", computed.getPropertyValue("--shiki-light"));
      console.log("CSS Variable --shiki-dark:", computed.getPropertyValue("--shiki-dark"));
      console.log("--------------------------------------------------");
      
      // Check if color matches expected light/dark
      const lightColor = spanRef.current.style.getPropertyValue("--shiki-light");
      console.log("Expected Light Color (Inline):", lightColor);
    }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 p-4 bg-yellow-100 border-2 border-yellow-400 rounded shadow-lg text-xs text-black max-w-sm">
      <h3 className="font-bold mb-2">Shiki Style Debugger</h3>
      <p className="mb-2">Open Chrome Console (F12) to see logs.</p>
      
      <div className="p-4 border bg-white rounded">
        {/* Simulate the structure provided by user */}
        <code data-language="typescript" data-theme="github-dark github-light">
          <span 
            ref={spanRef}
            style={{"--shiki-dark": "#F97583", "--shiki-light": "#D73A49"} as any}
          >
            interface (Debug Target)
          </span>
        </code>
      </div>
    </div>
  );
}
