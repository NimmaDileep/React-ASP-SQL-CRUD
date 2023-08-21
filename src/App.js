import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';
import AuthContext from './components/AuthContext';
import Main from "./components/Main/Main";

function App() {
    const initialToken = localStorage.getItem('accessToken');
    const initialRole = localStorage.getItem('userRole');
    const initialUserData = JSON.parse(localStorage.getItem('userData'));
    const [authToken, setAuthToken] = React.useState(initialToken);
    const [authRole, setAuthRole] = React.useState(initialRole);
    const [userData, setUserData] = React.useState(initialUserData);

    React.useEffect(() => {
        if (authToken) {
            const tokenDuration = 3600000;
            const logoutTimer = setTimeout(() => {
                setAuthToken(null);
                setAuthRole(null);
                setUserData(null);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('userRole');
                localStorage.removeItem('userData');
            }, tokenDuration);

            return () => {
                clearTimeout(logoutTimer);
            }
        }
    }, [authToken]);

    return (
        <Router>
            <AuthContext.Provider value={{ authToken, setAuthToken, authRole, setAuthRole }}>
                <Header />
                <Main />
                <Footer />
            </AuthContext.Provider>
        </Router>
    );
}

export default App;
