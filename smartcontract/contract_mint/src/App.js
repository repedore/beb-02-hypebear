import "./App.css";
import { useState, useEffect } from "react";
import Web3 from "web3";
import HBNFTabi from "./HBNFTabi";
// import ipfs from "./utils/ipfs";
// var ipfs = create("/ip4/127.0.0.1/tcp/5003");
// var ipfs = new create({ host: "ipfs.infura.io 22", port: 5001, protocol: "https" });

import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

const contractAddr = "0x29A16Ce1C025d9acE8dDC5845235Ea4F918BE040";

function App() {
	const [web3, setWeb3] = useState();
	const [account, setAccount] = useState("");
	const [newErc721addr, setNewErc721Addr] = useState();

	const [userFileUrl, setUserFileUrl] = useState(``);
	const [userFileIPFSUrl, setUserFileIPFSUrl] = useState(``);
	const [userFileName, setUserFileName] = useState(``);
	const [userFileDesc, setUserFileDesc] = useState(``);

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

	async function onChange(e) {
		const file = e.target.files[0];
		setUserFileUrl(file);
	}

	const mint = async () => {
		try {
			const cid = await client.add(userFileUrl);
			const image_url = `https://ipfs.infura.io/ipfs/${cid.path}`;
			setUserFileIPFSUrl(image_url);
		} catch (error) {
			console.log("Error uploading file: ", error);
		}

		let metadata = { image: userFileIPFSUrl, name: userFileName, description: userFileDesc };
		let cid;
		let metadata_url;
		let tokenContract;
		let result;
		try {
			cid = await client.add(JSON.stringify(metadata));
			metadata_url = `https://ipfs.infura.io/ipfs/${cid.path}`;
			tokenContract = await new web3.eth.Contract(HBNFTabi, newErc721addr);
			result = await tokenContract.methods.mintNFT(account, metadata_url).send({
				from: account,
				gasLimit: 285000,
				value: 0,
			});
			console.log(result);
		} catch (error) {
			console.log("Error uploading metadata file: ", error);
			console.log(metadata, cid, metadata_url);
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
			<h1>HBNFT</h1>
			<input type="file" onChange={onChange} />
			{userFileIPFSUrl && <img src={userFileIPFSUrl} width="600px" />}
			<div className="userInfo">주소: {account}</div>
			<div>
				File Name:
				<input
					type="text"
					onChange={(e) => {
						setUserFileName(e.target.value);
					}}
				></input>
				Description:
				<input
					type="text"
					onChange={(e) => {
						setUserFileDesc(e.target.value);
					}}
				></input>
				<button
					className="mint"
					onClick={() => {
						mint();
					}}
				>
					mint
				</button>
			</div>
		</div>
	);
}

export default App;
