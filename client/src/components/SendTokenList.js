import SendErc721 from "./SendErc721";
import React from 'react';


function SendTokenList({erc721list, account, web3, smartContractAddr }) {
    return (
        <div className="send-token-main">
            <h1>
                Send
            </h1>
            <h4>
                send your nft token
            </h4>
            <div className="send-tokenlist">
                <SendErc721 erc721list={erc721list} account={account} smartContractAddr={smartContractAddr} web3={web3}/>
            </div>
        </div>
    );
}

export default SendTokenList;
