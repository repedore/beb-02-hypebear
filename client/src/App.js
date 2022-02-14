import React, {useState} from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './view/Home';
import Profile from './view/profile'
import './styles/App.scss';
import Header from './components/header'
import Footer from './components/footer'
import Sidebar from './components/sidebar'



// App Router 연동
const App = () => {
    const [sideSize, setSideSize] = useState(false);

    const handleResizeSide = (checked) => {
        setSideSize(checked)
        console.log(sideSize);
    }
    
    return (
    <div className="main app"> 
        <Sidebar sideSize={sideSize}/>
        <div className="screen">
            <Header handleResizeSide={handleResizeSide} sideSize={sideSize}/>
                <Routes>
                    <Route path="/" element={<Home

                    sideSize={sideSize}
                    setSideSize={setSideSize}

                            />} />
                  <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer className="footer"/>
        </div>
    </div>
    );
};

export default App;
