import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header/Header';
import SignIn from './pages/sign-in/SignIn';
import SignUp from './pages//sign-up/SignUp';
import StockSearchForm from './pages/stock-search-form/StockSearchForm';
import { AuthProvider } from './context/AuthContext'; 

// For protecting routes against unauthorized user access. Specifically used for the stock search page.
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/signin" />; // If not authenticated redirect to signin page.
};

function App() {
    return (
      <AuthProvider>
        <Router>
            <Header />
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                    path="/stock-search"
                    element={
                        <ProtectedRoute>
                            <StockSearchForm />
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<Navigate to="/signin" />} />
            </Routes>
        </Router>
      </AuthProvider>
    );
}

export default App;
