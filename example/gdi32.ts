import GDI32 from 'bun-gdi32';

// Optionally preload all symbols once (or rely on lazy binding)
const start = performance.now();

GDI32.Preload();

const end = performance.now();

const ms = (end - start).toFixed(2);

console.log('GDI32 bindings initialized in %sms', ms);

