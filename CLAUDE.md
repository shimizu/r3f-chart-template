# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 開発コマンド

### セットアップと実行
- `npm install` - 依存関係のインストール
- `npm run dev` - 開発サーバーの起動（Vite）
- `npm run build` - プロダクションビルドの作成
- `npm run preview` - ビルド後のプレビュー
- `npm run lint` - ESLintによるコード品質チェック

## プロジェクト構成

### 技術スタック
- **フロントエンド**: React 19 + Vite
- **3Dライブラリ**: Three.js + @react-three/fiber + @react-three/drei
- **データ可視化**: D3.js (scales, fetch, array utilities)
- **色管理**: chroma-js
- **開発ツール**: Leva (デバッグコントロール)
- **ポストプロセッシング**: @react-three/postprocessing

### アーキテクチャ
このプロジェクトは3Dデータ可視化用のReactコンポーネントライブラリです：

#### メインシーン構成
- `App.jsx` - メインアプリケーション、CSVデータ読み込み、カラースケール管理
- `SurfaceScene.jsx` - 3Dサーフェスプロット用のシーンコンポーネント
- `BarChartScene.jsx` - 3D棒グラフ用のシーンコンポーネント
- `Scene.jsx` - 散布図用の基本シーンコンポーネント

#### 再利用可能コンポーネント (`src/components/`)
- `Axis.jsx` - 3D軸（X, Y, Z）とラベル表示
- `Bar.jsx` - 3D棒グラフの個別棒要素
- `ScatterPoints.jsx` - 散布図のデータポイント群
- `Surface.jsx` - 3Dサーフェス（メッシュ）のレンダリング
- `Legend.jsx` - カラーバー凡例（HTML要素として画面上に表示）

#### データ処理パターン
- CSVファイルからの外部データ読み込み（`d3-fetch`）
- D3スケール（`scaleLinear`）による座標変換
- chroma.jsによる色のマッピング
- データ範囲の自動計算（`d3-array/extent`）

#### 3D環境設定
- Canvas設定: シャドウ有効、カメラ位置 `[20, 20, 30]`
- ライティング: アンビエント + ポイントライト
- インタラクション: OrbitControls（回転・ズーム・パン）

### コード規約
- JSXファイルにはコメントを日本語で記述
- 定数は大文字で定義（例: `CHART_WIDTH`, `COLOR_SCALE_RANGE`）
- コンポーネントはpropsでスケールとデータを受け取る設計
- Three.jsオブジェクトは直接操作せず、React Three Fiberのパターンに従う

### データファイル
- `public/data/mt_bruno_elevation.csv` - サンプル標高データ
- 外部CSVデータの動的読み込みに対応