let acceptedQuote="";


function getRonQuote() {
  console.log('in getRonQuote');
  $('#my-quote-to-submit').hide();
  fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => {
      alert('Something went wrong. Try again later.')
      console.log(error)
    })
}

function getPirateTranslation(quote) {
  console.log('in getPirateTranslation');
  console.log(quote);

  responseJson = {
    "success": {
        "total": 1
    },
    "contents": {
        "translated": "Cryin': acceptable at funerals and th' Grand Canyon.",
        "text": "Crying: acceptable at funerals and the Grand Canyon.",
        "translation": "pirate"
    }
}
  // fetch(`https://api.funtranslations.com/translate/pirate.json?text=${quote}`)
  //   .then(response => response.json())
  //   .then(responseJson => 
  //     displayResults(responseJson))
  //   .catch(error => {
  //     alert('Something went wrong. Try again later.')
  //     console.log(error)
  //   })

  document.getElementById('display-text-p').innerHTML=responseJson.contents.translated;
}

function useMyQuote() {
  document.getElementById('display-text-p').innerHTML = document.getElementById('display-text-input').value;
  $('#display-text-p').show();
  $('#display-text-input').hide();
  setUpQuoteFilterPage();

}

function getPhoto() {
  console.log('in getPhoto');
  fetch('https://picsum.photos/600/400')
    .then(response => response.blob())
    .then(responseBlob => 
      displayNewPhoto(responseBlob))
    .catch(error => {
      alert('Something went wrong. Try again later.')
      console.log(error)
    });
}

function displayResults(responseJson) {
  console.log(responseJson);
  //put the quote in the text box
  document.getElementById('display-text-p').innerHTML=responseJson[0];
  $('#display-text-p').show();
  $('#display-text-input').hide();
}

function displayNewPhoto(responseBlob) {
  console.log('in displayNewPhoto')
  console.log(responseBlob);
  let imgUrl = URL.createObjectURL(responseBlob);
  document.getElementById('background-image').src=imgUrl;
  console.log('The url is '+imgUrl);
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
  $('#display-text-p').hide();
  $('#use-this-quote2').hide();
  $('#yoda-ize').hide();
  $('#pirate-ize').hide();
  $('#shakespear-ize').hide();
  $('#background-image').show();
  $('#use-this-photo').show();
  $('#new-photo').show();
}

function displayFinalResultsPage() {
  $('#cycle-quote-background').show();
  $('#default-font').show();
  $('#manly-font').show();
  $('#liberal-font').show();
  $('#use-this-photo').hide();
  $('#new-photo').hide();
  $('#save-design').show();
  $('#go-home').show();
  
  console.log(document.getElementById('display-text-input').value);
  console.log(document.getElementById('display-text-p').innerHTML);
  console.log(document.getElementById('final-quote').innerHTML);

  document.getElementById('final-quote').innerHTML = document.getElementById('display-text-p').innerHTML;
  $('#final-quote').show();
  console.log(document.getElementById('background-image').src);
}

function cycleQuoteBackground() {
  // document.getElementsByClassName(module)

        // $('#display-module').removeClass('lr');
        // $('#display-module').addClass('cap');
        
        var element = document.getElementById("display-module");
  element.classList.toggle("top");

}

function defaultFont() {
  $('#display-module').removeClass('manly-font');
  $('#display-module').removeClass('liberal-font');
}

function manlyFont() {
  $('#display-module').addClass('manly-font');
  $('#display-module').removeClass('liberal-font');
}

function liberalFont() {
  $('#display-module').removeClass('manly-font');
  $('#display-module').addClass('liberal-font');
}



function watchForm() {

  console.log('in watchForm');

  $('#new-ron-quote').click(event => {
    event.preventDefault();
    console.log('#new-ron-quote is clicked');
    getRonQuote();
  });

  $('#use-my-quote').click(event => {
    event.preventDefault();
    console.log('#use-my-quote is clicked');
    $('#display-text-input').show();
    $('#display-text-input').focus();
    $('#my-quote-to-submit').show();
  });

  $('#my-quote-to-submit').click(event => {
    event.preventDefault();
    console.log('#home-get-quote is clicked');
    $('.start-page').hide();
    $('#my-quote-to-submit').hide();
    useMyQuote();
    setUpQuoteFilterPage();
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
    acceptedQuote = document.getElementById('display-text-p').innerHTML;
    console.log('acceptedQuote is '+ acceptedQuote);
    getPhoto();
    setUpPhotoPage();
  }); 

  $('#new-photo').click(event => {
    event.preventDefault();
    console.log('#new-photo is clicked');
    getPhoto();
  }); 

  $('#pirate-ize').click(event => {
    event.preventDefault();
    console.log('#pirate-ize is clicked');
    let quote = document.getElementById('display-text-p').value;
    console.log(quote);
    getPirateTranslation(quote);
  }); 

  $('#use-this-photo').click(event => {
    event.preventDefault();
    console.log('#use-this-photo is clicked');
    displayFinalResultsPage();
  }); 

  $('#go-home').click(event => {
    event.preventDefault();
    console.log('#go-home is clicked');
    location.reload();
  }); 

  $('#cycle-quote-background').click(event => {
    event.preventDefault();
    console.log('#go-home is clicked');
    cycleQuoteBackground();
  }); 

  $('#default-font').click(event => {
    event.preventDefault();
    console.log('#go-home is clicked');
    defaultFont();
  }); 

  $('#manly-font').click(event => {
    event.preventDefault();
    console.log('#go-home is clicked');
    manlyFont();
  }); 

  $('#liberal-font').click(event => {
    event.preventDefault();
    console.log('#go-home is clicked');
    liberalFont();
  }); 

}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
})