import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";

import "./ToastModal.css";

const ToastModal = (props) => {
	const { toastList, autoDeleteTime = 10000, autoDelete = true } = props;
	const [list, setList] = useState(toastList);

	useEffect(() => {
		setList(toastList);
	}, [toastList, list]);

	const deleteToast = (id) => {
		const listItemIndex = list.findIndex((e) => e.id === id);
		const toastListItem = toastList.findIndex((e) => e.id === id);
		list.splice(listItemIndex, 1);
		toastList.splice(toastListItem, 1);
		setList([...list]);
	};

	const getToastStyle = (type) => {
		let style = {};
		switch (type) {
			case "success":
				style.backgroundColor = "#5cb85c";
				style.border = "1px solid #5cb85c";
				break;
			case "error":
				style.backgroundColor = "#d9534f";
				style.border = "1px solid #d9534f";
				break;
			default:
		}
		return style;
	};

	useEffect(() => {
		const interval = setInterval(() => {
			if (autoDelete && toastList.length && list.length) {
				deleteToast(toastList[0].id);
			}
		}, autoDeleteTime);
		return () => {
			clearInterval(interval);
		};
	}, [toastList, autoDelete, autoDeleteTime, list, deleteToast]);

	return (
		<div className="toasts">
			{list.map((toast, i) => (
				<div
					key={i}
					className="toast"
					style={getToastStyle(toast.type)}
				>
					<button
						className="toast-button"
						onClick={() => deleteToast(toast.id)}
					>
						X
					</button>
					<div className="toast-image">
						<img src={toast.icon} alt="" />
					</div>
					<div>
						<p className="notification-title">{toast.title}</p>
						<p className="notification-message">
							{toast.description}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

const Modal = (props) => {
	return ReactDom.createPortal(
		<ToastModal toastList={props.toastList} />,
		document.getElementById("toasts-root")
	);
};

export default Modal;
