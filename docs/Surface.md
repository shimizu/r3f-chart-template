# Surface Component

3Dサーフェス（曲面）をレンダリングするコンポーネントです。

## Props

| Name         | Type     | Description                                                                                                                              |
|--------------|----------|------------------------------------------------------------------------------------------------------------------------------------------|
| `data`       | `Object` | サーフェスのデータオブジェクト。`{ width, height, widthSegments, heightSegments, values }` の形式。`values` は高さ情報の1次元配列。 |
| `scales`     | `Object` | d3-scaleのスケールオブジェクト (`xScale`, `yScale`, `zScale`)。                                                                          |
| `colorScale` | `Object` | `chroma.js` などで作成されたカラースケール関数。                                                                                         |

## 使用例

```jsx
import Surface from './components/Surface';
import chroma from 'chroma-js';

const MyScene = () => {
  // ... data と scales の準備 ...

  const colorScale = chroma.scale(['#000080', '#ffff00']).domain(scales.yScale.domain());

  return (
    <Surface 
      data={data} 
      scales={scales} 
      colorScale={colorScale}
    />
  );
};
```
