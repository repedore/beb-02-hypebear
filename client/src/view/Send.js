import React, {useState, useEffect} from 'react'
import erc721Abi from '../erc721Abi' 
import SendTokenList from '../components/SendTokenList'

const Send = ({account, web3, connectWallet}) => {
    console.log(account)
    const [erc721list, setErc721list] = useState([]);

    const smartContractAddr = "0xbf0a2A941c308850A9Aac779B0EFc1C603c193df"

    const addNewErc721Token = async () => {
        const tokenContract = await new web3.eth.Contract(
            erc721Abi,
            smartContractAddr,
        );

        const name = await tokenContract.methods.name().call();
        const symbol = await tokenContract.methods.symbol().call();
        const totalSupply = await tokenContract.methods.totalSupply().call();
        
        let arr = [];

        for (let i = 1; i <= totalSupply; i++) {
            arr.push(i)
        }

        for (let tokenId of arr) {
            let tokenOwner = await tokenContract.methods
                .ownerOf(tokenId)
                .call();

            if (String(tokenOwner).toLowerCase() === account) {
                let tokenURI = await tokenContract.methods
                    .tokenURI(tokenId)
                    .call();
                setErc721list((preState) => {
                    return [...preState, {name, symbol, tokenId, tokenURI}]
                });
            }  
        }
    }

    useEffect(() => {
        account ? addNewErc721Token() : connectWallet() ;
    }, [account]);

    return (
        <div className="send">
            {
            account 
            ? <div className="send-tokenMain"> <SendTokenList erc721list={erc721list} account={account} web3={web3} smartContractAddr={smartContractAddr}/> </div>
            : <div> should login  </div> 
            }
        </div>

    );

}

export default Send
