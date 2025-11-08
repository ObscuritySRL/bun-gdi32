# bun-gdi32

Zero-dependency, zero-overhead Win32 GDI32 bindings for [Bun](https://bun.sh) on Windows.

## Overview

`bun-gdi32` exposes every entry point exported by `gdi32.dll` through Bun's `ffi` layer. The package provides a lazy-loading helper—`GDI32`—that mirrors the native API in both names and signatures. Callers can rely on the built-in memoized getters or eagerly bind any subset of exports via `GDI32.Preload()`.

Symbols are declared alphabetically, typed with `FFIType`, and documented directly above each member in `structs/GDI32.ts`, so you get Bun-native ergonomics without wrappers.

## Features

- Bun-first ergonomics tuned for Windows 10/11.
- Direct FFI to `gdi32.dll` (device contexts, bitmaps, palettes, metrics, and painting helpers) with full export coverage.
- In-source docs (each method links to the corresponding Microsoft Docs entry in `structs/GDI32.ts`).
- Lazy binding on first call; optional eager preload (`GDI32.Preload()`).
- No wrapper overhead; every helper is a 1:1 Win32 call.
- Strongly typed GDI aliases (see `types/GDI32.ts`).

## Requirements

- [Bun](https://bun.sh) runtime
- Windows 10 or later

## Installation

```sh
bun add bun-gdi32
```

## Quick Start

```ts
import GDI32 from 'bun-gdi32';

// Preload a subset for hot paths (optional)
GDI32.Preload(['CreateCompatibleDC', 'DeleteDC']);

const hdc = GDI32.CreateCompatibleDC();

// ... do work with the device context ...

GDI32.DeleteDC(hdc);
```

## API Highlights

- `Preload()` loads and caches any subset of exports you need before the first call.
- Device context helpers (`GDI32.CreateCompatibleDC`, `GDI32.DeleteDC`, `GDI32.BitBlt`, `GDI32.CreateDIBSection`, etc.) for bitmap rendering and palette management.
- Buffer-friendly `.ptr` helpers provided by Bun for ArrayBuffer/Buffer/DataView/TypedArray make pointer arguments ergonomic.

## Notes

- No global initialization is required. Use lazy binding or call `GDI32.Preload()` to bind everything sooner.
- GDI helpers expect native handles and pointers; `types/GDI32.ts` exposes the full suite of structures and aliases used across `gdi32.dll`.
- Bun runtime on Windows is mandatory.

## TODO

- Add GDI32 samples that show device-context lifecycles, bitmaps, and palette operations.
