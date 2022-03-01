import React from "react";
import Header from "Components/MainPage/Header";
import { useTimer } from "react-timer-hook";

const Timer = () => {
	const time = new Date(2022, 1, 20, 16, 0, 0);
	//time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
	const expiryTimestamp = time;

	const {
		seconds,
		minutes,
		hours,
		days,
		isRunning,
		start,
		pause,
		resume,
		restart,
	} = useTimer({
		expiryTimestamp,
		onExpire: () => console.warn("onExpire called"),
	});

	return (
		<div className="mainpage">
			<Header
				btnType="white"
				linkTo="/choix"
				textBtn="Se préinscrire"
				logoType="blue"
				headerFixed={false}
			/>
			<div className="portfolio">
				<h1>Le portfolio de Subs sera disponible dans :</h1>
				<div className="timer-span">
					<span>{days}</span>
					{days == 1 || days == 0 ? " jour " : " jours "}
					<span>{hours}</span>
					{hours == 1 || hours == 0 ? " heure " : " heures "}
					<span>{minutes}</span>
					{minutes == 1 || minutes == 0
						? " minute "
						: " minutes "}et <span>{seconds}</span>
					{seconds == 1 || seconds == 0 ? " seconde " : " secondes "}
				</div>
				{/* <p>{isRunning ? "Running" : "Not running"}</p>
				<button onClick={start}>Start</button>
				<button onClick={pause}>Pause</button>
				<button onClick={resume}>Resume</button>
				<button
					onClick={() => {
						// Restarts to 5 minutes timer
						const time = new Date();
						time.setSeconds(time.getSeconds() + 300);
						restart(time);
					}}
				>
					Restart
				</button> */}
			</div>
		</div>
	);
};

export default Timer;
