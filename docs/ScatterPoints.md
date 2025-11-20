# ScatterPoints Component

3D散布図のデータポイントをレンダリングするコンポーネントです。

## Props

| Name          | Type     | Description                                      |
|---------------|----------|--------------------------------------------------|
| `data`        | `Array`  | データポイントの配列。各要素は `{ id, x, y, z }` の形式。 |
| `scales`      | `Object` | d3-scaleのスケールオブジェクト (`xScale`, `yScale`, `zScale`)。 |
| `point_size`  | `Number` | 各データポイントのサイズ。                             |
| `color_range` | `Array`  | ポイントの色として使用される色の配列（文字列）。       |

## 使用例

```jsx
import ScatterPoints from './components/ScatterPoints';

const MyScene = () => {
  // ... data と scales の準備 ...

  const POINT_SIZE = 0.1;
  const COLOR_RANGE = ['#ff6b6b', '#4ecdc4'];

  return (
    <ScatterPoints 
      data={data} 
      scales={scales} 
      point_size={POINT_SIZE}
      color_range={COLOR_RANGE}
    />
  );
};
```
