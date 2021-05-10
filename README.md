# Simple Paint

An extremely simple browser-based paint application, built with React.

Select your tool, color, and canvas dimensions, then click squares on the canvas to color them.  The Pencil tool colors just the square you click, while the Flood Fill tool colors all connected squares of the same color.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Extra Features

### Auto-resizing canvas

The canvas automatically fills as much of the available space as possible, based on the chosen dimensions and the window size.

### Fully keyboard accessible
On the toolbar, tab to navigate.  On the canvas, use the arrow keys to navigate the grid, Enter to color the current square, and Esc to return to the toolbar.

When inputting the number of rows or columns, use the arrow keys to step up or down by 1 (hold shift for a step size of 10).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
