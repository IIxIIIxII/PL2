import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import PonyList from "./pages/PonyList_temp.jsx";
import PonyDetail from "./pages/PonyDetail_temp.jsx";
import Counter from "./pages/Counter.jsx";
function App() {
  return (
    <BrowserRouter>
  <Header />
  
  <Routes>
    <Route path="/" element={<PonyList />} />
    <Route path="/ponies/:id" element={<PonyDetail />} />
    <Route path="/counter" element={<Counter />}  />
  </Routes>
  
  <Footer />
</BrowserRouter>

  );
}

export default App;
