const currencyCode = document.querySelectorAll(".currency-code");
const amount = document.getElementById("input-amount");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const icon = document.getElementById("icon");
const btn = document.getElementById("btn");
const exchangeRateText = document.querySelector(".exchange-rate");

for(let i = 0; i < currencyCode.length; i++){
    for(countryCode in countryCurrencyCode){
        // selecting USD as FROM default currency and NGN as TO default currency
        let selected;
        if(i == 0){
            selected = countryCode == "USD" ? "selected" : ""; 
        }else if(i == 1){
            selected = countryCode == "NGN" ? "selected" : "";
        }
        // creating option tag and passing currency code as text and value
        currencyCode[i].innerHTML += `<option value="${countryCode}" ${selected}>${countryCode}</option>`   
    }

    currencyCode[i].addEventListener("change", e => {
        updateFlag(e.target);
    });
}

function updateFlag(element){
    for(code in countryCurrencyCode){
        //if country currency code in countryCurrencyCode is equal to option value
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            // passing of a selected country currency code in a img url
            imgTag.src = `https://www.countryflags.io/${countryCurrencyCode[code]}/flat/64.png`
        }
    }
}

btn.addEventListener("click", e => {
    e.preventDefault(); 
    getExchangeRate();
}); 

icon.addEventListener("click", () => {
    // setting temporary currency code
  let exchangeIcon = fromCurrency.value;
  //passing tocurrency code to fromcurrency
  fromCurrency.value = toCurrency.value;
  // passing temporary currency code to tocurrency code
  toCurrency.value = exchangeIcon;
  updateFlag(fromCurrency);
  updateFlag(toCurrency); 
  getExchangeRate(); 
})
 
function getExchangeRate(){
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        alert("Please enter amount")
        amountVal = 1;
    }

       fetch(`https://v6.exchangerate-api.com/v6/820c64357e1ad6a0139e3949/latest/${fromCurrency.value}`)
       .then(response => response.json())
       .then(result => {
           let exchangeRate = result.conversion_rates[toCurrency.value];
           //console.log(exchangeRate);
           let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
           //console.log(totalExchangeRate);
           exchangeRateText.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
  
       })
       
} 
