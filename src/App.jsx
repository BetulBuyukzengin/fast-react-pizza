import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order from "./features/order/Order";
import CreateOrder from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      //! Step 2 in route loader : Provided loader functionality to a route
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        //! I gave an errorElement here so that it does not affect the entire page.
        errorElement: <Error />,
      },
      { path: "/cart", element: <Cart /> },
      { path: "/order/new", element: <CreateOrder /> },
      { path: "/order:orderId", element: <Order /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
