import { Eyo } from '~/eyo/eyo'; // https://github.com/e2yo/eyo-kernel

const safeEyo = new Eyo();
safeEyo.dictionary.loadSafeSync();

String.prototype.markSymbol = function (symbol) {
	const re = new RegExp(`(?<!<[^>]*)\\${symbol}`, 'gm');
	return this.replace(re, '<span style="background: yellow; color: #000">$&</span>');
};

String.prototype.markSymbolNewLine = function (symbol) {
	const re = new RegExp(`(^[\\s&nbsp;]*|<.*?>\\s*)(\\${symbol})`, 'gm');
	return this.replace(re, '$1<span style="background: yellow; color: #000">$2</span>');
};

String.prototype.removeSpans = function () {
	return this.replace(/<span style="background: yellow; color: #000">(.*?)<\/span>/gm, '$1');
};

const getContentEditable = () => document.querySelectorAll('[contenteditable="true"]');

const removeMarks = () => {
	const editables = getContentEditable();
	if (editables.length) {
		editables.forEach(el => {
			el.innerHTML = el.innerHTML.removeSpans();
		});
	}
};

const symbols = () => {
	const editables = getContentEditable();

	if (editables.length) {
		editables.forEach(el => {
			el.innerHTML = el.innerHTML.removeSpans().markSymbolNewLine('-').markSymbol('"');
		});
	}
};

const yoficator = () => {
	const editables = getContentEditable();
	if (editables.length) {
		editables.forEach(el => {
			el.innerHTML = safeEyo.restore(el.innerHTML.removeSpans()).markSymbol('ё');
		});
	}
};

const yoficatorRestore = () => {
	const editables = getContentEditable();
	if (editables.length) {
		editables.forEach(el => {
			el.innerHTML = el.innerHTML.replace(/ё/g, 'е').removeSpans();
		});
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
