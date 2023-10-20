import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import DefaultPage from './pages/DefaultPage';
import VideoDetailsPage from './pages/VideoDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
     {
          index: true,
          element: <DefaultPage />,
     },
     {
          path: '/results',
          element: <SearchPage />,
     },
     {
      path: '/watch',
      element: <VideoDetailsPage />,
    },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/* The code you provided shows that you're using a React Router (specifically a newer Concurrent React API with the `createRoot` method, 
which is designed for concurrent rendering). Here's a breakdown:

1. You create a `router` using `createBrowserRouter`, defining your routes:
   - The root route (`/`) renders the `<App />` component.
   - A child route (`/`) that matches the base index renders the `<DefaultPage />` component.
   - A child route (`/results`) renders the `<SearchPage />` component.
   - A child route (`/watch`) renders the `<VideoDetailsPage />` component.

2. You're creating a root using `ReactDOM.createRoot` which points to a DOM element with the id `'root'`. This is your entry point for React to render components into the DOM.

3. Within the `root.render` method, you're rendering the `RouterProvider` component and passing the `router` (that you've configured with your routes) as a prop to `RouterProvider`.

The missing piece here is how the `RouterProvider` uses the passed `router`. Based on conventional patterns:

- `RouterProvider` would use the `router` prop to set up the actual routing logic.
- Depending on the URL path, `RouterProvider` will render the appropriate component (`<App />`, `<DefaultPage />`, `<SearchPage />`, or `<VideoDetailsPage />`).

In other words, when you navigate to different paths in your application, the `RouterProvider` will consult the `router` configuration to decide which component to render. 

For your original concern about how the components are rendered: 
Every time you visit a specific path in your application, the corresponding component mentioned in your `router` configuration is rendered because of the way the `RouterProvider` and the `router` prop work together. So, even if you don't see a direct rendering structure like `<RouterProvider><App /></RouterProvider>` in your `index.js`, the routing configuration ensures the right component gets rendered for the right path. */