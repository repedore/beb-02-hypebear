import {useDropzone} from 'react-dropzone'
import erc721Abi from "../erc721Abi";
// import ipfs from "./utils/ipfs";
// var ipfs = create("/ip4/127.0.0.1/tcp/5003");
// var ipfs = new create({ host: "ipfs.infura.io 22", port: 5001, protocol: "https" });

import { create } from "ipfs-http-client";
import React, {useCallback, useState, useMemo, useEffect} from 'react'
const client = create("https://ipfs.infura.io:5001/api/v0");


// const contractAddr = "0x29A16Ce1C025d9acE8dDC5845235Ea4F918BE040";

const contractAddr = "0xbf0a2A941c308850A9Aac779B0EFc1C603c193df"

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function MyDropzone( {onChange, previewFile, onDrop} ) {


  
    // Do something with the files
    const {
        isDragActive,
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
      } = useDropzone({accept: 'image/*', onDrop});

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
        }), [
        isFocused,
        isDragAccept,
        isDragReject
        ]);

    return (

        <div className="dropContainer">
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                    {
                        isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                    {
                        previewFile ?
                        <img src={previewFile.preview} alt="none" width="200" /> :
                        "none"
                    }
            </div>
        </div>
    )
}



function Create({account, web3}) {
    const [previewFile, setPreviewFile] = useState();

	const [userFileUrl, setUserFileUrl] = useState(``);
	const [userFileIPFSUrl, setUserFileIPFSUrl] = useState(``);
	const [userFileName, setUserFileName] = useState(``);
	const [userFileDesc, setUserFileDesc] = useState(``);



	async function onChange(e) {
        const file = e.target.files[0];
		setUserFileUrl(file);
	}

    const onDrop = useCallback( acceptedFiles => {
        console.log(acceptedFiles[0]);
		// setUserFileUrl(acceptedFiles[0]);
        setPreviewFile({preview: URL.createObjectURL(acceptedFiles[0])});
        setUserFileUrl(acceptedFiles);
    });
	const mint = async () => {
		try {
			const cid = await client.add(userFileUrl);
            console.log("qwerqwer", cid.path);
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
			tokenContract = await new web3.eth.Contract(erc721Abi, contractAddr);
            
            
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
		<div className="Create">
            <div className="create-box">
                <h1>Create</h1>
                <h4>You can create NFT image</h4>
                {userFileIPFSUrl && <img src={userFileIPFSUrl} width="600px" alt="create"/>}

                <MyDropzone onChange={onChange} onDrop={onDrop} previewFile={previewFile} />

 
                <div className="create-inputbox">
                    <div className="userInfo">주소: {account}</div>
                        <div className="create-input-div">
                            <div>File Name:</div>
                            <input
                                type="text"
                                onChange={(e) => {
                                    setUserFileName(e.target.value);
                                }}
                            ></input>
                        </div>
                        <div className="create-input-div">
                            <div>Description:</div>
                            <input
                                type="text"
                                onChange={(e) => {
                                    setUserFileDesc(e.target.value);
                                }}
                            ></input>
                        </div>
                        <div className="create-input-div">
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
            </div>
		</div>
	);

}
export default Create;
