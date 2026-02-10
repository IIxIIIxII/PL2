import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PonyList from "./pages/PonyList_temp";
import PonyDetail from "./pages/PonyDetail_temp";
import { Routes, Route } from "react-router-dom";

function App(){
  return(
    <>
      <Header/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/ponies" element={<PonyList/>} />
        <Route path="/ponies/:id" element={<PonyDetail/>} />
      </Routes>

      <Footer />
    </>
  )
}

export default App