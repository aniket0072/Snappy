import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetAvatar from "./pages/SetAvatar";

function App() {
  return (
<BrowserRouter>
      <Routes>
      <Route path="/Register" element={<Register/>}> </Route>
      <Route path="/Login" element={<Login/>}> </Route>
       <Route path="/SetAvatar" element={<SetAvatar/>}> </Route>
      <Route path="/" element={<Chat/>}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
