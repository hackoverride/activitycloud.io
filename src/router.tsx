import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Activity from "./pages/activity";
import About from "./pages/About";
const Home = lazy(() => import("./pages"));
const Landing = lazy(() => import("./pages/Landing"));
const Error = lazy(() => import("./pages/Error"));
const Map = lazy(() => import("./pages/Map"));

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
        element: <About />,
      },
      {
        path: "map",
        element: <Map />,
      },
      {
        path: "/activity/:id",
        element: <Activity />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
