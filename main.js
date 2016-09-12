const _uOF = {};

_uOF.bgColorChangers = Array.from(document.querySelectorAll('body, button'));
_uOF.colorChanger = document.querySelector('section');
_uOF.fillChanger = document.querySelector('svg');
_uOF.quoteElement = document.querySelector('section > p');
_uOF.citationElement = document.querySelector('citation');
_uOF.quote = undefined;
_uOF.citation = undefined;

_uOF.quotes = [
	['test', 'blah',],
	['randome text string', 'by whomever'],
	['slkfjsoifj203 j203fj 2093jr20 3jf02 h309wj 39fw0 39f2093fj w93fj0w93 j0w9j fw039jfw0 93jf0w9 3j0f9wj 39fjw 390fjw9', 'hhaha sptoifj']
];

_uOF.colorSwitcher = (color) => {
	_uOF.bgColorChangers.forEach(x => x.style.backgroundColor = color);
	_uOF.fillChanger.style.fill = color;
	_uOF.colorChanger.style.color = color;
};

_uOF.colorChooser = () => {
	let rgb = undefined;
	do {
		rgb = window.crypto.getRandomValues(new Uint8Array(3));
	} while(rgb.reduce((x,y) => x + y) > 550);
	return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

// _uOF.getQuote = () => {
// 	return _uOF.quotes[Math.floor(Math.random() * 3)];
// 	return ['test', 'test2'];
// };

_uOF.getQuote = (cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => cb(null, xhr.responseText);
  xhr.onerror = (err) => cb(err);
  xhr.open('POST', 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous');
  xhr.setRequestHeader("X-Mashape-Key", "grpIxjBKFbmshGIOweKMjBkYsGUup1l7HQIjsnGIQUHDcW6GPH")
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  xhr.setRequestHeader("Accept", "application/json");
  xhr.send();
};

_uOF.insertQuote = (err, data) => {
	if(err) {
		alert('Error retrieving quote.');
		return;
	}
	
	data = JSON.parse(data);
	
	_uOF.quote = data.quote;
	_uOF.citation = data.author;

	_uOF.quoteElement.textContent = data.quote;
	_uOF.citationElement.textContent = data.author;
};

_uOF.newQBtn = document.querySelector('button:last-of-type');
_uOF.newQBtn.onclick = (e) => {
	_uOF.colorSwitcher(_uOF.colorChooser());
	_uOF.getQuote(_uOF.insertQuote);
};

_uOF.newQBtn.click();

_uOF.twit = document.querySelector('button');
_uOF.twit.onclick = () => {
		window.open('http://twitter.com/home/?status=' + 
			_uOF.quote + ', by ' + _uOF.citation, '_blank');
};