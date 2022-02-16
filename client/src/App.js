import React, {useState, useEffect} from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './view/Home';
import Profile from './view/profile'
import Send from './view/Send'
import './styles/App.scss';
import Header from './components/header'
import Footer from './components/footer'
import Sidebar from './components/sidebar'

import Web3 from 'web3'

// App Router 연동
const App = () => {
    const [sideSize, setSideSize] = useState(false);
    const [wallet, setWallet] = useState('')
    const [account, setAccount] = useState('');
    const [web3, setWeb3] = useState();

    const handleResizeSide = (checked) => {
        setSideSize(checked)
        console.log(sideSize);
    }


    //  web3 설정
    //  window.ethereum은 공급자 객체이기 때문에 web3.js를 사용.
    useEffect(() => {
        if (typeof window.ethereum !== "undefined") { // window.ethereum이 있다면
            try {
                const web = new Web3(window.ethereum);  // 새로운 web3 객체를 만든다
                setWeb3(web);
            } catch (err) {
                console.log(err);
            }
        }
    }, []);



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
                    <Route path="/profile" element={<Profile account={account} web3={web3}/>} />
                    <Route path="/send" onClick={connectWallet} element={<Send account={account} web3={web3} connectWallet={connectWallet}/>} />
                </Routes>
                <Footer className="footer"/>
            </div>
        </div>
    );
};

export default App;
