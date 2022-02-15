import "./App.css";
import { useState, useEffect } from "react";
import Web3 from "web3";
import HBNFTabi from "./HBNFTabi";
import TokenList from "./components/TokenList";

const contractAddr = "0x29A16Ce1C025d9acE8dDC5845235Ea4F918BE040";

function App() {
	const [web3, setWeb3] = useState();
	const [account, setAccount] = useState("");
	const [newErc721addr, setNewErc721Addr] = useState();
	const [erc721list, setErc721list] = useState([]); // 자신의 NFT 정보를 저장할 토큰

	useEffect(() => {
		// window.ethereum이 있다면
		if (typeof window.ethereum !== "undefined") {
			try {
				const web = new Web3(window.ethereum); // 새로운 web3 객체를 만든다
				setWeb3(web);
				setNewErc721Addr(contractAddr);
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

	const addNewErc721Token = async () => {
		// 스마트 컨트랙트 Abi에 근거하여, 모든 계약을 가져온다.
		const tokenContract = await new web3.eth.Contract(HBNFTabi, newErc721addr);
		const name = await tokenContract.methods.name().call();
		const symbol = await tokenContract.methods.symbol().call();
		const totalSupply = await tokenContract.methods.totalSupply().call();

		// token id는 1부터 시작하므로 arr에 담아둔다.
		let arr = [];
		for (let i = 1; i <= totalSupply; i++) {
			arr.push(i);
		}

		setErc721list([]);

		for (let tokenId of arr) { 
			let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();

			// if account가 tokenOwner와 맞다면
			// name, symbol, tokenId, tokenURI를 setErc721list에 적용
			if (String(tokenOwner).toLowerCase() === account) {
				let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
				setErc721list((prevState) => {
					return [...prevState, { name, symbol, tokenId, tokenURI }];
				});
			}
		}
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
			<div className="userInfo">주소: {account}</div>
			<div className="newErc721">
				<button onClick={addNewErc721Token}>add new erc721</button>
			</div>
			<TokenList web3={web3} contractAddr={contractAddr} account={account} erc721list={erc721list} />
		</div>
	);
}

export default App;
