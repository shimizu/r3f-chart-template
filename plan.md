# Plan: Switchable Chart Demo

This plan outlines the steps to refactor the application to allow users to switch between different chart components dynamically.

## 1. App Component State

-   Introduce state in `App.jsx` to manage the currently selected chart type.
-   Create a list of available charts with their corresponding component and necessary data.

## 2. UI for Chart Selection

-   Add a UI element (e.g., a set of buttons or a dropdown menu) in `App.jsx` that allows the user to select which chart to display.
-   Each button/option will update the state to reflect the chosen chart type.

## 3. Dynamic Chart Rendering

-   Modify the `App.jsx` render method to conditionally render the selected chart scene component based on the state.
-   The `Canvas` component will host the dynamically chosen scene.

## 4. Data Loading and Management

-   Centralize data loading logic in `App.jsx` if data is shared between charts.
-   For chart-specific data, load it within the respective scene component or pass it down as props from `App.jsx`.
-   For example, `useGeoTiff` for the surface plot and potentially a different data source (e.g., CSV) for the bar chart.

## 5. Component Refactoring

-   Ensure that `BarChartScene.jsx` and `SurfaceScene.jsx` are self-contained and receive their data via props.
-   Update `BarChartScene.jsx` to fetch or receive its data. I'll need to inspect `public/data` to see what's available.

## 6. Cleanup

-   Review and remove any unused components or files (like the potentially unused `Scene.jsx`).

## 7. Add CSV Surface Chart

-   **Create `useCsvData.js` hook:**
    -   Create a new hook in `src/hooks/useCsvData.js`.
    -   This hook will use `d3.csv` to fetch and parse the specified CSV file.
    -   It will process the parsed data into a `{ width, height, values, min, max }` object, making it compatible with the `Surface` component. The `width` will be the number of columns, `height` the number of rows, and `values` a flat array of elevation data.

-   **Create `CsvSurfaceScene.jsx`:**
    -   Create a new scene component at `src/CsvSurfaceScene.jsx`.
    -   This component will use the `useCsvData` hook to load data from `/data/mt_bruno_elevation.csv`.
    -   It will create its own `scales` and `colorScale` based on the data returned from the hook.
    -   It will render the `Axis` and `Surface` components, passing the appropriate props.

-   **Integrate into `App.jsx`:**
    -   Add a new chart type, `'csv-surface'`, to the state management.
    *   Add a new button "CSV Surface Chart" to the UI.
    -   Import `CsvSurfaceScene.jsx` and render it conditionally.

By following these steps, the application will be transformed into a flexible demo platform for showcasing various `r3f` chart types.
