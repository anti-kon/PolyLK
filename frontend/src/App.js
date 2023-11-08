import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import News from "./pages/News";
import Queue from "./pages/Queue";
import FAQ from "./pages/FAQ";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/account" element={<Account/>}></Route>
            <Route path="/news" element={<News/>}></Route>
            <Route path="/queue" element={<Queue/>}></Route>
            <Route path="/faq" element={<FAQ/>}></Route>
            <Route path="/" element={<Navigate replace to="/login"/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
