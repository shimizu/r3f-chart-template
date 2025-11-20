# Axis Component

チャートのX, Y, Z軸、グリッド線、目盛りラベルをレンダリングするコンポーネントです。

## Props

| Name     | Type     | Description                                                                                             |
|----------|----------|---------------------------------------------------------------------------------------------------------|
| `scales` | `Object` | d3-scaleのスケールオブジェクト (`xScale`, `yScale`, `zScale`)。                                           |
| `domain` | `Object` | データの各軸の最小値と最大値を示すオブジェクト (`{ xMin, xMax, yMin, yMax, zMin, zMax }`)。 |

## 使用例

```jsx
import Axis from './components/Axis';

const MyScene = () => {
  // ... scales と domain の準備 ...

  return (
    <Axis 
      scales={scales} 
      domain={domain}
    />
  );
};
```
