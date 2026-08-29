import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Feed from './pages/Feed';
import Goals from './pages/Goals';
import Budget from './pages/Budget';
import Layout from './components/layout/Layout';
import { ToastContainer } from 'react-toastify';
import IncomePage from './pages/IncomePage';
import ExpensePage from './pages/ExpensePage';


function App() {

  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* No Authentication Needed */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/income-page" element={<IncomePage />} />
                <Route path="/expense-page" element={<ExpensePage />} />
                
              </Routes>
            </Layout>
          }
        />

      </Routes>

      <ToastContainer />
    </Router>
  );
}

export default App;
