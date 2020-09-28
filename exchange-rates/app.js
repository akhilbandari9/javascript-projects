const url = 'https://api.exchangeratesapi.io/latest';

const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const rateDOM = document.getElementById('rate');
const swapBtn = document.getElementById('btn-swap');

const renderSelect = () =>
	fetch(url)
		.then((data) => data.json())
		.then((data) => {
			const arr = [...Object.keys(data.rates)];
			arr.forEach((curr) => {
				currencyOne.insertAdjacentHTML(
					'beforeend',
					`<option value="${curr}">${curr}</option>`
				);
				currencyTwo.insertAdjacentHTML(
					'beforeend',
					`<option value="${curr}">${curr}</option>`
				);
			});
			currencyOne.value = 'USD';
			currencyTwo.value = 'INR';
			calculate();
		});

window.addEventListener('load', renderSelect);

const calculate = () => {
	const selectedCurrOne = currencyOne.value;
	const selectedCurrTwo = currencyTwo.value;

	fetch(`${url}?base=${selectedCurrOne}`)
		.then((data) => data.json())
		.then((data) => {
			const rate = Math.round(data.rates[selectedCurrTwo] * 1000) / 1000;

			rateDOM.innerText = `1 ${selectedCurrOne} = ${rate} ${selectedCurrTwo}`;

			amountTwo.value = amountOne.value * rate;
		});
};

const swap = () => {
	let a = currencyOne.value;
	currencyOne.value = currencyTwo.value;
	currencyTwo.value = a;

	calculate();
};

//event Listeners
currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
amountTwo.addEventListener('input', calculate);
swapBtn.addEventListener('click', swap);
