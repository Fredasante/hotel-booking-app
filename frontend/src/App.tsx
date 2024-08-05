import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import CreateHotel from "./pages/CreateHotel";
import NavLayout from "./layouts/NavLayout";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import ManageAccount from "./pages/ManageAccount";
import MainLayout from "./layouts/MainLayout";
import VerificationSuccess from "./pages/VerificationSuccess";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Homepage />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <NavLayout>
              <Register />
            </NavLayout>
          }
        />
        <Route
          path="/login"
          element={
            <NavLayout>
              <Login />
            </NavLayout>
          }
        />
        <Route
          path="/verify-success"
          element={
            <NavLayout>
              <VerificationSuccess />
            </NavLayout>
          }
        />

        {/* hotel routes */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/create-hotel"
            element={
              <MainLayout>
                <CreateHotel />
              </MainLayout>
            }
          />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route
            path="/my-hotels"
            element={
              <MainLayout>
                <MyHotels />
              </MainLayout>
            }
          />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route
            path="/edit-hotel/:hotelId"
            element={
              <MainLayout>
                <EditHotel />
              </MainLayout>
            }
          />
        </Route>

        {/* user-routes */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/manage-account"
            element={
              <MainLayout>
                <ManageAccount />
              </MainLayout>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
