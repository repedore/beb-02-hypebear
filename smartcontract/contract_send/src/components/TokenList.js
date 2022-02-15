import Erc721 from "./Erc721";

function TokenList({ web3, contractAddr, account, erc721list }) {
	return (
		<div className="tokenlist">
			<Erc721 web3={web3} contractAddr={contractAddr} account={account} erc721list={erc721list} />
		</div>
	);
}

export default TokenList;
