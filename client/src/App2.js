import './App.css'; //css 부터 불러와주고~
import Web3 from 'web3'; //web3 끌고오고
import React from "react" //react 불러오고~
import { useState, useEffect } from "react"; //우선 여기까지

//다음은 app 함수 부분 드가자
//공급자 객체 연결은 처음 한번만 하면 되기 때문에 useEffect()를 사용해 컴포넌트가 처음 마운트 되었을 때 web3 객체를 연결하도록 한다

function App() {
    const [web3, setWeb3] = useState();
    const [account, setAccount] = useState('');

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

    const connectWallet = async () => {
        var accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
    };

    return (
            <div className="App">
                <button
                    className="metaConnect"
                    onClick={() => {
                        connectWallet();
                    }}
                >
                    connect to MetaMask
                </button>
                <div className="userInfo">주소: {account}</div>  // 연결된 계정 주소를 화면에 출력합니다

            </div>
        );
}
export default App;
