# nextjs-themes

## 4.0.0-alpha.8

### Patch Changes

- c72dd2d: Import hook and color-switch from their own files.

## 4.0.0-alpha.7

### Patch Changes

- 691038e: Remove rarely used exports

## 4.0.0-alpha.6

### Patch Changes

- c21dd8f: Minify CSS

## 4.0.0-alpha.5

### Patch Changes

- dfe139c: Updaet patch

## 4.0.0-alpha.4

### Patch Changes

- 66038c5: Test bundle size by re-exporting forced components.

## 4.0.0-alpha.3

### Patch Changes

- a31d6e0: Touchup

## 4.0.0-alpha.2

### Patch Changes

- b8164f7: Avoid rerendering without memo. Attempt to minify minzip further

## 4.0.0-alpha.1

### Patch Changes

- 4ca22c1: Patch alpha to avoid publishing over previously published version

## 4.0.0-alpha.0

### Major Changes

- aa3d50e: Do not export force-theme and force-color-scheme components from root.

## 3.1.7

### Patch Changes

- 99a0702: Update exports.

## 3.1.6

### Patch Changes

- f9d99da: Minify better with rdiPlugin

## 3.1.5

### Patch Changes

- c204415: Publish from within dist directory to avoid build issues.

## 3.1.4

### Patch Changes

- 8e0f4c4: Apps not setting moduleResolution to Node16 or NodeNext are failing to build as they don't respect exports field. Fix by adding one level of nexting inside nextjs folder

## 3.1.3

> Complete rewrite but no breaking changes

### Major Changes

- 387587f: Complete rewrite of the library ensuring minimum breaking changes.

### Patch Changes

- 4b10902: Remove next from peer dependency as we no longer depend on next.js specific APIs
- bdbf4d6: Update peer-dependency next.js to 10-15
