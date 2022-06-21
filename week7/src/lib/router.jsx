import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MainPage, EditPage } from "../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/edit/:postId" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
