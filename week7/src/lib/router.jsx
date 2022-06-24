import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MainPage, WritePage, EditPage } from "../pages";
import { Layout } from "../components/index";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/edit/:postId" element={<EditPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
