const SibApiV3Sdk = require("sib-api-v3-sdk");

let defaultClient = SibApiV3Sdk.ApiClient.instance;

const newUser = (req, res, next) => {
	const userEmail = req.body.email;
	const userName = req.body.name;
	const userSurname = req.body.surname;
	const newsletter = req.body.newsletter;
	const accountChoice = req.body.accountChoice;
	const parrainNameValue = req.body.parrainNameValue;

	let apiKey = defaultClient.authentications["api-key"];
	apiKey.apiKey =
		"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";

	// create contact
	let apiInstance = new SibApiV3Sdk.ContactsApi();
	let createContact = new SibApiV3Sdk.CreateContact();
	createContact.email = userEmail;
	createContact.attributes = {
		NOM: userName,
		PRENOM: userSurname,
		TYPE_DE_COMPTE: accountChoice,
		NOM_DU_PARRAIN: parrainNameValue,
	};
	if (!newsletter) {
		createContact.listIds = [8];
	} else {
		createContact.listIds = [6, 8];
	}

	// call SIB instance
	apiInstance.createContact(createContact).then(
		(data) => {
			return res.status(201).send("success");
		},
		(err) => {
			return next(err);
		}
	);

	res.status(201);
	//.json({
	// 	user: createContact.toObject({ getters: true }),
	// });
};

exports.newUser = newUser;
