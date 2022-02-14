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
    const [wallet, setWallet] = useState('')
    const [account, setAccount] = useState('');
    const handleResizeSide = (checked) => {
        setSideSize(checked)
        console.log(sideSize);
    }


    // 지갑 연결
    const connectWallet = async () => {
        var accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
    };

    
    return (
        <div className="main app"> 
            <Sidebar sideSize={sideSize} connectWallet={connectWallet} account={account}/>
            <div className="screen">
                <Header className="head" handleResizeSide={handleResizeSide} sideSize={sideSize}/>
                    <Routes>
                        <Route path="/" element={<Home
                            sideSize={sideSize}
                            setSideSize={setSideSize}
                        />} />
                    <Route path="/profile" element={<Profile account={account}/>} />
                </Routes>
                <Footer className="footer"/>
            </div>
        </div>
    );
};

export default App;
