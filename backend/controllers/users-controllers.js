const SibApiV3Sdk = require("sib-api-v3-sdk");

let defaultClient = SibApiV3Sdk.ApiClient.instance;

// const getAllUsers = async (req, res, next) => {
// 	let users;

// 	// to be changed
// 	let opts = {
// 		limit: 50,
// 		offset: 0,
// 		modifiedSince: new Date("2021-09-07T19:20:30+01:00"),
// 	};
// 	apiInstance.getContacts(opts).then(
// 		function (data) {
// 			console.log(
// 				"API called successfully. Returned data: " +
// 					JSON.stringify(data)
// 			);
// 		},
// 		function (error) {
// 			console.error(error);
// 		}
// 	);

// 	try {
// 	} catch (err) {}
// 	res.json({
// 		users: users.map((user) => user.toObject({ getters: true })),
// 	});
// };

const newUser = (req, res, next) => {
	const userEmail = req.body.email;
	const userName = req.body.name;
	const userSurname = req.body.surname;

	console.log(userEmail, userName, userSurname);

	let apiKey = defaultClient.authentications["api-key"];
	apiKey.apiKey =
		"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";

	// create contact
	let apiInstance = new SibApiV3Sdk.ContactsApi();
	let createContact = new SibApiV3Sdk.CreateContact();
	createContact.email = userEmail;
	createContact.attributes = { NOM: userSurname, PRENOM: userName };
	createContact.listIds = [2];

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
