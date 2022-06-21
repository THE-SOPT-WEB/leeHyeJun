import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MainPage, WritePage, EditPage } from "../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/edit/:postId" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
