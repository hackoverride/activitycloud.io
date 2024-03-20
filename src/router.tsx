import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
const Home = lazy(() => import("./pages"));
const Landing = lazy(() => import("./pages/Landing"));
const Error = lazy(() => import("./pages/Error"));
const Map = lazy(() => import("./pages/Map"));
const Profile = lazy(() => import("./pages/Profile"));

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
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
