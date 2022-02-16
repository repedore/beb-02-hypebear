import React, {useState} from 'react';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import web3 from 'web3'
import erc721Abi from "../HB721Abi.js";

// ERC 721 부분
// erc 721 리스트를 받아와서, name, symbol, tokenid를 돌려준다.
function SendErc721({ erc721list, account, smartContractAddr, web3 }) {
    const [to, setTo] = useState("");
    const sendToken = async (smartContractAddr, tokenId) => {
        const tokenContract = await new web3.eth.Contract(
            erc721Abi,
            smartContractAddr,
            {
                from: account
            }
        );
        console.log(account, to, tokenId);
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
        <div className="send-erc721list">
            <div className="send-erc721list-header">
                <h2> Image List </h2>
            </div>
            {erc721list.map((token) => {
                return (
            
                    <div className="send-erc721token" key={token.tokenId}>
                        <div>
                            <img src={token.image} width={150} alt="none" />
                        </div>
                        <div className="send-erc721token-exp">
                            <div className="name">Name: {token.name}</div>
                            <div className="symbol">Symbol: {token.symbol}</div>
                            <div className="nft">id: {token.tokenId}</div>
                        </div>
                        <div className="send-toAddressToken">
                            <input type="text" onChange={(e) => {
                                setTo(e.target.value);
                            }} className="send-toAddressToken" />
                            <Button variant="contained" onClick={sendToken.bind(
                            this,
                            smartContractAddr,
                            token.tokenId
                            )} endIcon={<SendIcon />}>
  Send Token
</Button>
                        </div>

                    </div>
                );
            })}
            <div>
                    <h4>address is {account}</h4>
            </div>
        </div>
    );
}

export default SendErc721;
