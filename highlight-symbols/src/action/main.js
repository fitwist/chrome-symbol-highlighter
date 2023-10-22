import '~/action/style.css';

document.querySelector('#app').innerHTML = /*html*/`
	<div>
		<button id="symbols">symbols (") (-)</button>
	</div>
	<div>
		<button id="yoficator">yoficator</button>
	</div>
	<div>
		<button id="yoficator-restore">yoficator restore</button>
	</div>
	<div>
		<button id="remove-marks">remove all marks</button>
	</div>
`;

const sendMessageToActiveTab = async message => {
	const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
	chrome.tabs.sendMessage(tab.id, message);
};

document.querySelector('#symbols').addEventListener('click', () => {
	sendMessageToActiveTab({ op: 'symbols' });
});

document.querySelector('#yoficator').addEventListener('click', () => {
	sendMessageToActiveTab({ op: 'yoficator' });
});

document.querySelector('#yoficator-restore').addEventListener('click', () => {
	sendMessageToActiveTab({ op: 'yoficatorRestore' });
});

document.querySelector('#remove-marks').addEventListener('click', () => {
	sendMessageToActiveTab({ op: 'removeMarks' });
});
