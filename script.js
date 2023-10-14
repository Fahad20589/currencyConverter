const fromAmountElement = document.querySelector('.amount')
const fromCurrencyElement = document.querySelector('.fromCurrency')
const convertedAmountElement = document.querySelector('.convertedAmount')
const toCurrencyElement = document.querySelector('.toCurrency')
const result = document.querySelector('.result')
const container = document.querySelector('.container')


const countries = [
    {code : "USD" , name:"United States Dollar"},
    {code : "INR" , name:"Indian Rupee"},
    {code : "NZD" , name:"New Zealand Dollar"},
    {code : "ZAR" , name:"South African Rand"},
    {code : "MXN" , name:"Mexican Peso"},
]

countries.forEach((country) => {
    const option1 = document.createElement('option')
    const option2 = document.createElement('option')

    option1.value = option2.value = country.code;
    option1.textContent = option2.textContent = `${country.code} ${country.name}`;

    fromCurrencyElement.appendChild(option1);
    toCurrencyElement.appendChild(option2);

    fromCurrencyElement.value = "USD"
    toCurrencyElement.value = "INR"
})

const getExchangeRate = async () => {
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;

    result.textContent = 'Fetching Exchange Rate...'

    try {

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();

    console.log(data);

    const conversionRate = data.rates[toCurrency];
    const convertedAmount = conversionRate * fromAmountElement.value;

    convertedAmountElement.value = convertedAmount;
    result.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`
        
    } catch (error) {
        container.innerHTML = 'Exchange Not available'
    }

}


fromAmountElement.addEventListener('input' , getExchangeRate)
fromCurrencyElement.addEventListener('change' , getExchangeRate)
toCurrencyElement.addEventListener('change' , getExchangeRate)
window.addEventListener('load' , getExchangeRate)