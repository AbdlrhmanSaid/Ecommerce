import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// layouts
import MainLayout from "@layouts/MainLayout/MainLayout";
import ProfileLayout from "@layouts//ProfileLayout/ProfileLayout";
// lottie animation
import { PageSuspense } from "@components/feedback";
// pages
const Home = lazy(() => import("@pages/Home"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const Categories = lazy(() => import("@pages/Categories"));
const Cart = lazy(() => import("@pages/Cart"));
const Products = lazy(() => import("@pages/Products"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Account = lazy(() => import("@pages/Account"));
const Orders = lazy(() => import("@pages/Orders"));

const Error = lazy(() => import("@pages/Error"));
import ProtectedRoute from "@components/auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="d-flex flex-column align-items-center">
        <PageSuspense type={"mainloading"}>
          <MainLayout />
        </PageSuspense>
      </div>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <PageSuspense type={"loading"}>
            <Home />
          </PageSuspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <PageSuspense>
            <Cart />
          </PageSuspense>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <PageSuspense type={"loading"}>
              <Wishlist />
            </PageSuspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/categories",
        element: (
          <PageSuspense type={"loading"}>
            <Categories />
          </PageSuspense>
        ),
      },
      {
        path: "/categories/products/:prefix",
        element: (
          <PageSuspense type={"loading"}>
            <Products />
          </PageSuspense>
        ),

        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found",
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: "about-us",
        element: (
          <PageSuspense type={"loading"}>
            <AboutUs />
          </PageSuspense>
        ),
      },
      {
        path: "login",
        element: (
          <PageSuspense type={"loading"}>
            <Login />
          </PageSuspense>
        ),
      },
      {
        path: "register",
        element: (
          <PageSuspense type={"loading"}>
            <Register />
          </PageSuspense>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <PageSuspense>
              <ProfileLayout />
            </PageSuspense>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PageSuspense>
                <Account />
              </PageSuspense>
            ),
          },
          {
            path: "orders",
            element: (
              <ProtectedRoute>
                <PageSuspense>
                  <Orders />
                </PageSuspense>
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
