import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import TodoApp from "./pages/TodoApp";
import SignUp from "./pages/SignUp";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./config/config";
import AuthRoute from "./modules/AuthRoute";

function App() {
  const [user, setUser] = useState<User | null>(null);
  
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <>
      <Routes>
        <Route path="/#/login" element={<Login user={user} />} />
        <Route path="/#/signup" element={<SignUp user={user} />} />
        <Route
          path="/"
          element={
            <AuthRoute>
              <TodoApp user={user}/>
            </AuthRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
