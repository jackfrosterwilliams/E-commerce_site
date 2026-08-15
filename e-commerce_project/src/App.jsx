import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar.jsx";
import Homepage from "./pages/homepage.jsx";
import Products from "./pages/produts.jsx";
import Footer from "./footer.jsx";

function App() {
   return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/products" element={<Products />} />
    </Routes>
    <Footer />
    </BrowserRouter>
   );
}

export default App;
