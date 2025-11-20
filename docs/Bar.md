# Bar Component

3D棒グラフの「棒」をレンダリングするコンポーネントです。

## Props

| Name          | Type     | Description                                      |
|---------------|----------|--------------------------------------------------|
| `data`        | `Array`  | データポイントの配列。各要素は `{ id, x, y, z }` の形式。`y`が棒の高さになります。 |
| `scales`      | `Object` | d3-scaleのスケールオブジェクト (`xScale`, `yScale`, `zScale`)。 |
| `color_range` | `Array`  | 棒の色として使用される色の配列（文字列）。         |

## 使用例

```jsx
import Bar from './components/Bar';

const MyScene = () => {
  // ... data と scales の準備 ...

  const COLOR_RANGE = ['#ff6b6b', '#4ecdc4'];

  return (
    <Bar 
      data={data} 
      scales={scales} 
      color_range={COLOR_RANGE}
    />
  );
};
```
