import { useState } from "react";
import HBNFTabi from ".././HBNFTabi";

function Erc721({ web3, contractAddr, account, erc721list }) {
	const [to, setTo] = useState("");
	const sendToken = async (tokenId) => {
		console.log(tokenId);
		const tokenContract = await new web3.eth.Contract(HBNFTabi, contractAddr, {
			from: account,
		});
		tokenContract.methods
			.transferFrom(account, to, tokenId)
			.send({
				from: account,
			})
			.on("receipt", (receipt) => {
				setTo("");
			});
	};
	return (
		<div className="erc721list">
			{erc721list.map((token) => {
				console.log(token);
				return (
					<div className="erc721token">
						Name: <span className="name">{token.name}</span>(<span className="symbol">{token.symbol}</span>)
						<div className="nft">id: {token.tokenId}</div>
						<img src={token.tokenURI} width={300} />
						<div className="tokenTransfer">
							To:{" "}
							<input
								type="text"
								value={to}
								onChange={(e) => {
									setTo(e.target.value);
								}}
							></input>
							<button className="sendNFT" onClick={sendToken.bind(this, token.tokenId)}>
								send Token
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Erc721;
