import React from "react";
import { Provider } from "react-redux";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout";
import routes from "./routes";
import AppProviders from "./context/appProviders";
import store from "./store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { apiFetch } from "./api";
import { setSession } from "./store/authSlice";

function AppRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await apiFetch("session.php");
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "تعذر التحقق من جلسة الدخول.");
        }

        dispatch(setSession(result.authenticated ? result.user : null));
      } catch (error) {
        console.error(error);
        dispatch(setSession(null));
      }
    };

    loadSession();
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <NotFound />,
      children: routes,
    },
  ]);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <Provider store={store}>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </Provider>
  );
}

export default App;
