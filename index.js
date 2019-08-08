
function startPage() {
  //set up the home page

}


function getRonQuote() {
  console.log('in getRonQuote');
  fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => {
      alert('Something went wrong. Try again later.')
      console.log(error)
    })
}

function displayResults(responseJson) {
  console.log(responseJson);
  //put the quote in the text box
  document.getElementById('display-text').value=responseJson[0];
}

function watchForm() {
  console.log('in watchForm');
  $('#new-ron-quote').click(event => {
    event.preventDefault();
    console.log('#new-ron-quote is clicked');
    getRonQuote();
  });

  $('#home-get-quote').click(event => {
    event.preventDefault();
    console.log('#home-get-quote is clicked');
    getRonQuote();
    setUpQuoteGeneratorPage();
  });

  $('#use-this-quote').click(event => {
    event.preventDefault();
    console.log('#use-this-quote is clicked');
    setUpQuoteFilterPage();
  }); 

  $('#use-this-quote2').click(event => {
    event.preventDefault();
    console.log('#use-this-quote2 is clicked');
    setUpPhotoPage();
  }); 


}

function setUpQuoteGeneratorPage() {
  console.log('in setUpQuoteGeneratorPage');
  $('.start-page').hide();
  $('#display-text').show();
  $('#use-this-quote').show();
  $('#new-ron-quote').show();
}

function setUpQuoteFilterPage() {
  console.log('in setUpQuoteFilterPage');
  
  $('#use-this-quote').hide();
  $('#new-ron-quote').hide();
  $('#use-this-quote2').show();
  $('#yoda-ize').show();
  $('#pirate-ize').show();
  $('#shakespear-ize').show();

}


function setUpPhotoPage() {
  console.log('in setUpPhotoPage');
  $('#display-text').hide();
  $('#use-this-quote2').hide();
  $('#yoda-ize').hide();
  $('#pirate-ize').hide();
  $('#shakespear-ize').hide();

  $('#background-image').show();
  $('#use-this-photo').show();
  $('#new-photo').show();
}



$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});