const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//Show new Quote
function newQuote() {
  // Pick a random quote from apiQuoate array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // check if Author field is blank and replae it with 'Unknow'
  if (!quote.author) {
    authorText.textContent = "Unknow";
  } else {
    authorText.textContent = quote.author;
  }

  //Check Quote length to determine styling
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //Set Quote, Hide Loader
  quoteText.textContent = quote.text;
}

// Get Quote From API
async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //Catch Error Here
  }
}
//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On load
getQuotes();
