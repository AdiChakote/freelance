import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/gigs", element: <Gigs /> },
          { path: "/myGigs", element: <MyGigs /> },
          { path: "/orders", element: <Orders /> },
          { path: "/messages", element: <Messages /> },
          { path: "/message/:id", element: <Message /> },
          { path: "/add", element: <Add /> },
          { path: "/gig/:id", element: <Gig /> },
          { path: "/register", element: <Register /> },
          { path: "/login", element: <Login /> },
          { path: "/pay/:id", element: <Pay /> },
          { path: "/success", element: <Success /> },
        ],
      },
    ],
    {
      // ✅ Fixes the warning about v7
      future: {
        v7_startTransition: true,
      },
    }
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
