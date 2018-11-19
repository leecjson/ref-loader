A webpack loader that will create dependencies between any files manually

# Usage

Use `@ref(./anyfile.ext)` in any text file will build a dependency from current file to `anyfile.ext`; Then it will replace `@ref()` markup to module result of `anyfile.ext`.

# Example
```javascript
// Webpack config
const rules = [
  {
    test: /\.png$/,
    use: [{ loader: 'file-loader'}]
  },
  {
    test: /\.html$/,
    use: [
      { loader: 'file-loader' },
      { loader: 'extract-loader' },
      { loader: 'ref-loader' },
    ]
  }
];
```
```html
<!-- avatar_page.html -->
<html>
  <img src="@ref(./avatar.png)" /> 
  <!-- Will change to -->
  <!-- <img src="a8ea0cfae3d6cfd2f079a9d70ee61a63.png" /> -->
</html>
```
```javascript
// index.js
import './avatar_page.html'
```