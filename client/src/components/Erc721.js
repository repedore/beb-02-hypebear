import React from 'react';


// ERC 721 부분
// erc 721 리스트를 받아와서, name, symbol, tokenid를 돌려준다.
function Erc721({ erc721list }) {
    return (
        <div className="erc721list">
            {erc721list.map((token) => {
                return (
                    <div className="erc721token">
                        Name: <span className="name">{token.name}</span>(
                        <span className="symbol">{token.symbol}</span>)
                        
                        <div className="nft">id: {token.tokenId}</div>
                        <img src={token.tokenURI} width={300} alt="none" />
                    </div>
                );
            })}
        </div>
    );
}

export default Erc721;
