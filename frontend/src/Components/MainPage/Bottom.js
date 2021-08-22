import React from "react";

import conf from "../../images/data-protection.pdf";
import mentionsLegales from "../../images/legal-mentions.pdf";
import logo from "../../images/Logo-blue.png";
import facebookLogo from "../../images/facebook.png";
import linkedin from "../../images/linkedin.png";
import twitter from "../../images/twitter.png";
import instagram from "../../images/instagram.png";
import flag from "../../images/france.png";

// import '../sass/main.scss';

const Bottom = () => {
	return (
		<div className="bottom">
			<div className="bottom__top">
				<img src={logo} alt="subs_logo"></img>
				<div className="bottom__top-email">
					<a href="mailto:bonjour@subs-capital.com">
						bonjour@subs-capital.com
					</a>
				</div>
			</div>
			<div className="bottom__icons">
				<a
					href="https://www.facebook.com/Subs-Capital-111483001213649/"
					target="_blank"
					rel="noreferrer"
				>
					<img src={facebookLogo} alt="fb_icon" width="20px"></img>
				</a>
				<a
					href="https://www.linkedin.com/company/subs-capital/"
					target="_blank"
					rel="noopener"
				>
					<img src={linkedin} alt="linkedin_icon" width="20px"></img>
				</a>
				<a
					href="https://www.instagram.com/subscapital/?hl=fr"
					target="_blank"
					rel="noreferrer"
				>
					<img src={instagram} alt="insta_icon" width="20px"></img>
				</a>
				<a
					href="https://twitter.com/SubsCapital"
					target="_blank"
					rel="noreferrer"
				>
					<img src={twitter} alt="twitter_icon" width="20px"></img>
				</a>
			</div>
			<div className="bottom__down">
				<a href={mentionsLegales} target="_blank" rel="noreferrer">
					Mentions légales
				</a>
				<p> • </p>
				<a href={conf} target="_blank" rel="noreferrer">
					Protection des données
				</a>
			</div>
			<div className="bottom__copyright">© Subs-capital 2021</div>
			<div className="bottom__flag">
				<img src={flag} alt="french_flag"></img>
				<div>France</div>
			</div>
		</div>
	);
};

export default Bottom;
