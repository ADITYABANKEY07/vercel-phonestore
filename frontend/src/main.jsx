import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget to import the CSS

import "./index.css";
import AppLayout from "./Components/layout/AppLayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import FilteredProducts from "./Pages/FilteredProducts";
import FilteredCategories from "./Pages/FilteredCategories";
import ProductDetailPage from "./Pages/ProductDetailPage";
import SubCategoryFilter from "./Pages/SubCategoryFilter";
import AddAdminProduct from "./Pages/AddAdminProduct";
import AdminOrderManager from "./Pages/AdminOrderManager";
import Cart from "./Pages/Cart";
import CheckoutPage from "./Pages/CheckoutPage";
import PrivateRoute from "./Pages/PrivateRoute";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminUserManage from "./Pages/AdminUserManage";
import AdminAnalytics from "./Pages/AdminAnalytics";
import ThankyouPage from "./Pages/ThankyouPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/filteredproducts", element: <FilteredProducts /> },
      { path: "/filteredcategories", element: <FilteredCategories /> },
      {
        path: "/products/category/:categoryName/:subCategory",
        element: <SubCategoryFilter />,
      },
      { path: "/product/:id", element: <ProductDetailPage /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <CheckoutPage /> },
      {path: "/thankyou", element: <ThankyouPage />},
      {
        path: "/admin",
        element: (
          <PrivateRoute requiredAdmin={true}>
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/add-product",
        element: (
          <PrivateRoute requiredAdmin={true}>
            <AddAdminProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <PrivateRoute requiredAdmin={true}>
            <AdminOrderManager />
          </PrivateRoute>
        ),
      },
            {
        path: "/admin/users",
        element: (
          <PrivateRoute requiredAdmin={true}>
            <AdminUserManage />
          </PrivateRoute>
        ),
      },
            {
        path: "/admin/analytics",
        element: (
          <PrivateRoute requiredAdmin={true}>
            <AdminAnalytics />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  </React.StrictMode>
);
