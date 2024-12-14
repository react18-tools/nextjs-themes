# nextjs-themes

## 4.0.4

### Patch Changes

- a6708c9: Update dependencies

## 4.0.4-squize.0

### Patch Changes

- 04ea9ea: Attempt to Squeeze out...

## 4.0.3

### Patch Changes

- d89d157: Create Switcher without injecting scripts for containerized themes.

## 4.0.3-feat.0

### Patch Changes

- d89d157: Create Switcher without injecting scripts for containerized themes.

## 4.0.3

### Patch Changes

- 6e02178: Fix color-switch styles in containerized styles.

## 4.0.3-feat_39.0

### Patch Changes

- 6e02178: Fix color-switch styles in containerized styles.

## 4.0.2

### Patch Changes

- 3d3e015: Enhance: Avoid unnecessary script injection when adding contenarized themes for a target other than html element.

## 4.0.1

### Patch Changes

- a2fd744: Update forced components to use targetSelector

## 4.0.0

### Major Changes

- 4afdf90: Do not export force-theme and force-color-scheme components from root.

### Patch Changes

- 5a267f7: Updaet patch
- be0acc7: Touchup
- 6dc46b7: Patch alpha to avoid publishing over previously published version
- fc363fb: Test bundle size by re-exporting forced components.
- 6407a5d: Minify CSS
- 6556849: Remove rarely used exports
- e72c49c: Avoid rerendering without memo. Attempt to minify minzip further
- 2e377ec: Import hook and color-switch from their own files.

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
