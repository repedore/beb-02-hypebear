import './App.css'; //css 부터 불러와주고~
import Web3 from 'web3'; //web3 끌고오고
import React from "react" //react 불러오고~
import { useState, useEffect } from "react"; //우선 여기까지
import erc721Abi from "./HB721Abi";
import TokenList from './components/TokenList'


// App 함수 부분,
//공급자 객체 연결은 처음 한번만 하면 되기 때문에 useEffect()를 사용해 컴포넌트가 처음 마운트 되었을 때 web3 객체를 연결하도록 한다
function ConnectWallet({account}) {
    // useState 부분
    const [web3, setWeb3] = useState();
	const [newErc721addr, setNewErc721Addr] = useState();
	const [erc721list, setErc721list] = useState([]);  // 자신의 NFT 정보를 저장할 토큰


    // Token Source 받아오기
    const addNewErc721Token = async () => {

        // 스마트 컨트랙트 Abi에 근거하여, 모든 계약을 가져온다.
        const tokenContract = await new web3.eth.Contract(
            erc721Abi,
            newErc721addr
        );
        const name = await tokenContract.methods.name().call();
        const symbol = await tokenContract.methods.symbol().call();
        const totalSupply = await tokenContract.methods.totalSupply().call();

        // token id는 1부터 시작하므로 arr에 담아둔다.
        let arr = [];
		for (let i = 1; i <= totalSupply; i++) {
		    arr.push(i);
		}
		  
		for (let tokenId of arr) {

		    let tokenOwner = await tokenContract.methods
		        .ownerOf(tokenId)
		        .call();

            // if account가 tokenOwner와 맞다면 
            // name, symbol, tokenId, tokenURI를 setErc721list에 적용
		    if (String(tokenOwner).toLowerCase() === account) {
		        let tokenURI = await tokenContract.methods
		            .tokenURI(tokenId)
		            .call();
		        setErc721list((prevState) => {
		            return [...prevState, { name, symbol, tokenId, tokenURI }];
		        });
		    }
		}
    } 

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

    return (
        <div className="App">
            {/* 버튼이 눌릴 때, connectWallet function 실핼*/}
            <button
                className="metaConnect"
                onClick={() => {
                    connectWallet();
                }}
            >
                connect to MetaMask
            </button>
            <div className="userInfo">주소: {account}</div>  

            <div className="newErc721">
                <input
                    type="text"
                    onChange={(e) => {
                        setNewErc721Addr(e.target.value);  
                    }}
                ></input>
            <button onClick={addNewErc721Token}>add new erc721</button>
            {/* 토큰리스트 출력*/}
                <TokenList erc721list={erc721list} />
            </div>
        </div>
    );
}
export default ConnectWallet;
