import { ReactNode } from "react";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useParams,
} from "react-router-dom";

import GenerealComponent from "./components/GeneralComponent";

import "./styles/app.scss";

const PermissionsRoute = ({ children }: { children: ReactNode }) => {
  const params = useParams();

  if (!params.id) {
    return <Navigate to={`/f${(+new Date()).toString(16)}`} />;
  }

  return children;
};

const App = () => {
  const component = (
    <PermissionsRoute>
      <GenerealComponent />
    </PermissionsRoute>
  );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={component}>
        <Route path=":id" element={component} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
