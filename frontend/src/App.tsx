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
        <Route element={<PrivateRoute />}>
          <Route
            path="/create-hotel"
            element={
              <Layout>
                <CreateHotel />
              </Layout>
            }
          />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route
            path="/my-hotels"
            element={
              <Layout>
                <MyHotels />
              </Layout>
            }
          />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route
            path="/edit-hotel/:hotelId"
            element={
              <Layout>
                <EditHotel />
              </Layout>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
