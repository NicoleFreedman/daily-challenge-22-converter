const from = document.getElementById('from');
const to = document.getElementById('to');
const amountInput = document.getElementById('amount');
const result = document.getElementById('result');
const countries = document.getElementById('countries');
let obj = {};

const fetchData = async () => {
  let response = await fetch('http://api.currencylayer.com/live?access_key=b7848156fa0dedcc9edd03577e1015b7');
      obj = await response.json();
  // obj1 = {...obj};
  chooseCurrency(obj);
}
fetchData();

const chooseCurrency = data => {
  for (let i in data.quotes){
     i = i.replace('USD', '');
     var option = document.createElement("option");
         option.text = i;
         option.value = i;
         to.add(option);
  } 
}

const convert = async () => {
      result.innerHTML = '';
      countries.innerHTML = '';
  let amount = amountInput.value;
  let currency1 = from.value;
  let currency2 = to.value;
  let currentRate = `${currency1}${currency2}`;

  let rates = obj.quotes;
    for (rate in rates){
      if(rate == `${currency1}${currency2}`){
        let finalResult = `${amount}${currency1} = ${amount * rates[rate]}${currency2}`;
        result.append(finalResult);
      }
    }
    showCountries();
}

const showCountries = () => {
  fetch(`https://restcountries.eu/rest/v2/currency/${to.value}`)
  .then(response => response.json())
  .then(data => data.map(el => {
    let country = document.createElement('p');
    country.innerHTML = el.name;
    countries.append(country);
  }))
}
