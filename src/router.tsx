import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Home = lazy(() => import("./pages"));
const Landing = lazy(() => import("./pages/Landing"));
const Error = lazy(() => import("./pages/Error"));

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: (
      <Suspense fallback={<div>Loading...</div>}>
        <Error />
      </Suspense>
    ),
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Landing />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: <div>About</div>,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
