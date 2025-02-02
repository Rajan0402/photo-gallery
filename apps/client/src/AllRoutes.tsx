import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<HomePage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default AllRoutes;
