import { Route, Routes } from 'react-router-dom';
import Start from './pages/Start';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import Captainlogin from './pages/Captainlogin';
import CaptainSignup from './pages/CaptainSignup';
import Home from './pages/Home';
import UserLogout from './pages/UserLogout';
import UserContext from './context/UserContext';
import UserProtectWrapper from './pages/UserProtectWrapper';
import CaptainHome from './pages/CaptainHome';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper';




const App = () => {
    return (
        <UserContext>
            <Routes>
                <Route path='/' element={<Start />} />
                <Route path='/login' element={<UserLogin />} />
                <Route path='/signup' element={<UserSignup />} />
                <Route path='/captain-login' element={<Captainlogin />} />
                <Route path='/captain-signup' element={<CaptainSignup />} />

                {/* Protected routes */}
                <Route
                    path='/home'
                    element={
                        <UserProtectWrapper>
                            <Home />
                        </UserProtectWrapper>
                    }
                />
                <Route
                    path='/user/logout'
                    element={
                        <UserProtectWrapper>
                            <UserLogout />
                        </UserProtectWrapper>
                    }
                />
                 <Route
                    path='/captain-home'
                    element={
                    <CaptainProtectWrapper>
                    <CaptainHome> </CaptainHome> 
                    </CaptainProtectWrapper>
                } />
            </Routes>
        </UserContext>
    );
}

export default App;
