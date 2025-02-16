import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MessagePage from "./pages/MessagePage";
import PageLayout from "./pages/PageLayout";
import PostAnnoncePage from "./pages/PostAnnoncePage";
import ProductDetailPage from "./pages/DetailsPage";
import DashboardPage from "./pages/DashboardPage";
import Contact from "./pages/Contact";
function App() {
  return (
    <div>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/:category?" element={<HomePage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="message" element={<MessagePage />} />
          <Route path="post" element={<PostAnnoncePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
