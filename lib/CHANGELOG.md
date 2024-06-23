# nextjs-themes

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
