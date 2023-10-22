import { Eyo } from '~/eyo/eyo'; // https://github.com/e2yo/eyo-kernel

const safeEyo = new Eyo();
safeEyo.dictionary.loadSafeSync(); // safe.txt

String.prototype.markSymbol = function (symbol) {
	const re = new RegExp(`(?<!<[^>]*)${symbol}`, 'gm');
	return this.replace(re, '<span style="background: yellow; color: #000">$&</span>');
};

const getContent = () => {
	const activeElem = document.activeElement;

	if (activeElem.contentEditable === 'true') {
		const content = activeElem.innerHTML;
		return { activeElem, content };
	}
	return { activeElem: null, content: null };
};

const removeMarks = () => {
	const { activeElem, content } = getContent();
	activeElem.innerHTML = content
		.replace(/<span[^>]*>/g, '')
		.replace(/\s{2,}/g, '')
		.trim();
};

const symbols = () => {
	const { activeElem, content } = getContent();

	if (activeElem) {
		activeElem.innerHTML = content
			.replace(/(>)(\s*)(-)/gm, '$1$2<span style="background: yellow; color: #000">$3</span>')
			.markSymbol('"');
	}
};

const yoficator = () => {
	const { activeElem, content } = getContent();
	if (activeElem) {
		activeElem.innerHTML = safeEyo.restore(content).markSymbol('ё');
	}
};

const yoficatorRestore = () => {
	const { activeElem, content } = getContent();
	if (activeElem) {
		activeElem.innerHTML = content.replace(/ё/g, 'е');
		removeMarks();
	}
};

chrome.runtime.onMessage.addListener(message => {
	const { op } = message;

	switch (op) {
		case 'symbols':
			symbols();
			break;
		case 'yoficator':
			yoficator();
			break;
		case 'yoficatorRestore':
			yoficatorRestore();
			break;
		case 'removeMarks':
			removeMarks();
			break;
		default:
			console.warn(`${op} not found!`);
			break;
	}
});
