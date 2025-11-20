# Legend Component

チャートの色の凡例（カラーバー）をHTML要素としてレンダリングするコンポーネントです。
`@react-three/fiber` の `Canvas` の外側に配置する必要があります。

## Props

| Name         | Type     | Description                                                  |
|--------------|----------|--------------------------------------------------------------|
| `yScale`     | `Object` | Y軸に対応するd3-scaleのスケールオブジェクト。                  |
| `colorScale` | `Object` | `chroma.js` などで作成されたカラースケール関数。             |

## 使用例

```jsx
import Legend from './components/Legend';
import { Canvas } from '@react-three/fiber';

const App = () => {
  // ... yScale と colorScale の準備 ...

  return (
    <>
      <Canvas>
        {/* ... 3Dシーン ... */}
      </Canvas>
      <Legend 
        yScale={yScale} 
        colorScale={colorScale}
      />
    </>
  );
};
```
