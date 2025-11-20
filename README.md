# React Three Fiber Chart Template

`@react-three/fiber` と `d3` を使用して、インタラクティブな3Dチャートを作成するためのテンプレートプロジェクトです。

## 概要

このプロジェクトには、以下の3Dチャートを実装するための再利用可能なコンポーネントが含まれています。

-   3D散布図 (Scatter Plot)
-   3D棒グラフ (Bar Chart)
-   3Dサーフェスプロット (Surface Plot)

外部のCSVデータを読み込み、動的にチャートを生成する機能も含まれています。

## セットアップ

1.  依存関係をインストールします。
    ```bash
    npm install
    ```

2.  開発サーバーを起動します。
    ```bash
    npm run dev
    ```

## コンポーネントドキュメント

各コンポーネントの使い方の詳細については、以下のドキュメントを参照してください。

-   [**`Axis`**](./docs/Axis.md): チャートの軸をレンダリングします。
-   [**`ScatterPoints`**](./docs/ScatterPoints.md): 3D散布図のデータポイントをレンダリングします。
-   [**`Bar`**](./docs/Bar.md): 3D棒グラフの棒をレンダリングします。
-   [**`Surface`**](./docs/Surface.md): 3Dサーフェス（曲面）をレンダリングします。
-   [**`Legend`**](./docs/Legend.md): チャートの凡例（カラーバー）をレンダリングします。