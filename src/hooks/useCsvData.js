import { useState, useEffect } from 'react';
import * as d3 from 'd3';

export const useCsvData = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (url) {
      d3.csv(url).then(parsedData => {
        // d3.csv は各行をオブジェクトとしてパースする
        // ヘッダー（列名）を取得
        const columns = parsedData.columns.slice(1); // 最初の列は行インデックスなので除外
        const width = columns.length;
        const height = parsedData.length;

        const values = [];
        let min = Infinity;
        let max = -Infinity;

        parsedData.forEach(row => {
          columns.forEach(col => {
            const value = +row[col];
            values.push(value);
            if (value < min) min = value;
            if (value > max) max = value;
          });
        });
        
        setData({
          width,
          height,
          values,
          min,
          max,
          // Surfaceコンポーネントが期待するwidthSegmentsとheightSegmentsも追加
          widthSegments: width - 1,
          heightSegments: height - 1,
        });
      });
    }
  }, [url]);

  return data;
};
