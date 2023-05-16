import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import Layout from "./component/layout";
import RegisterPage from "./pages/register";
import MainPage from "./pages/mainPage";
import axios from "axios";
import UseContextProvider from "./userContextProvider";
import AboutPage from "./pages/AboutPage";
import DocumentationPage from "./pages/DocumentationPage";
import { ErrorBoundary } from "react-error-boundary";
import UnAuthorizedUserError from "./error/UnAuthorizedUserError";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <ErrorBoundary
      FallbackComponent={UnAuthorizedUserError}
      onError={() => console.log("error happen")}
    >
      <UseContextProvider>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />
          <Route path={"/mainpage"} element={<MainPage />} />
          <Route path={"/mainpage/about"} element={<AboutPage />} />
          <Route path={"/mainpage/docs"} element={<DocumentationPage />} />
        </Routes>
      </UseContextProvider>
    </ErrorBoundary>
  );
}

// {}
