var express = require("express");
var router = express.Router();
const axios = require("axios");
const { response } = require("express");

const sdk = require("api")("@opensea/v1.0#1j3wv35kyd6wqwc");

router.get("/account/:account", (req, res, next) => {
	const account = req.params.account;
	// console.log(`clinet request account : ${account}`);
	sdk["retrieving-assets-rinkeby"]({
		owner: account,
		order_direction: "desc",
		offset: "0",
		limit: "20",
	})
		.then((data) => {
			let metadata = [];
			let reqs = [];

			assets = data.assets;
			for (let i = 0; i < assets.length; i++) {
				let metadata_url = assets[i].token_metadata;
				reqs[i] = axios.get(metadata_url);
			}

			axios
				.all(reqs)
				.then(
					axios.spread((...responses) => {
						for (let i = 0; i < responses.length; i++) {
							let data = responses[i].data;
							let profileDataSet = {};
							profileDataSet["description"] = data.description;
							profileDataSet["external_url"] = data.external_url;
							profileDataSet["image"] = data.image;
							profileDataSet["name"] = data.name;
							metadata.push(profileDataSet);
						}
						res.json({ metadata });
					})
				)
				.catch((errors) => {
					console.log(errors);
				});
		})
		.catch((err) => console.error(err));
});

module.exports = router;
