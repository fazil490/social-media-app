import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { logIn, logOut } from "./redux/userSlice";
import NewPost from "./pages/NewPost";
import { HomeProvider } from "./context/HomeContext";
import Profile from "./pages/Profile";
// import ProtectedRoute from "./utils/ProtectedRoute";

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          bio: null, // Update this as needed
        };
        dispatch(logIn(userData));
      } else {
        dispatch(logOut());
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <main className="w-full h-full lg:rounded-xl lg:h-[95vh] lg:my-auto lg:w-3/4 xl:w-1/2 mx-auto bg-zinc-50 lg:m-4">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <HomeProvider>
                  <Home />
                </HomeProvider>
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/new-post" element={<NewPost />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
