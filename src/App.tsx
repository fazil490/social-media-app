import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Provider, useDispatch } from "react-redux";
import store, { persistor } from "./redux/store";
import NewPost from "./pages/NewPost";
import { HomeProvider } from "./context/HomeContext";
import Profile from "./pages/Profile";
import { PersistGate } from "redux-persist/es/integration/react";
// import ProtectedRoute from "./utils/ProtectedRoute";

const AppContent = () => {
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
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

export default App;
