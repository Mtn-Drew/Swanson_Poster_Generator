let acceptedQuote="";
let imgUrl = '';
let photoURL;
let photoBaseURL;
let photoGrayscale = false;
let photoBlur = false;


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

// function getPirateTranslation(quote) {
//   console.log('in getPirateTranslation');
//   console.log(quote);

//   responseJson = {
//     "success": {
//         "total": 1
//     },
//     "contents": {
//         "translated": "Cryin': acceptable at funerals and th' Grand Canyon.",
//         "text": "Crying: acceptable at funerals and the Grand Canyon.",
//         "translation": "pirate"
//     }
// }
//   // fetch(`https://api.funtranslations.com/translate/pirate.json?text=${quote}`)
//   //   .then(response => response.json())
//   //   .then(responseJson => 
//   //     displayResults(responseJson))
//   //   .catch(error => {
//   //     alert('Something went wrong. Try again later.')
//   //     console.log(error)
//   //   })

//   document.getElementById('display-text-p').innerHTML=responseJson.contents.translated;
// }

function useMyQuote() {
  document.getElementById('display-text-p').innerHTML = document.getElementById('display-text-input').value;
  $('#display-text-p').show();
  $('#display-text-input').hide();
  // setUpQuoteFilterPage();
  setUpPhotoPage();

}

function getPhoto() {
  console.log('in getPhoto');



  fetch('https://picsum.photos/600/400')

    .then(function(response) {
    console.log('response url is '+response.url);
    photoBaseURL = response.url; 
    response.blob()

    .then(responseBlob => 
        displayNewPhoto(responseBlob))

        .catch(error => {
                alert('Something went wrong. Try again later.')
                console.log(error)
              })


    // .then(function(myBlob) {
    //   var objectURL = URL.createObjectURL(myBlob);
    //   myImage.src = objectURL;
    // });
  });





//   fetch('https://picsum.photos/600/400')


//     .then(response => {
//       response.blob())
//     .then(responseBlob => 
//       displayNewPhoto(responseBlob))
//     .catch(error => {
//       alert('Something went wrong. Try again later.')
//       console.log(error)
//     }));

  
//     var pathname = window.location.pathname;
// console.log('the path is '+pathname);


}

function displayResults(responseJson) {
  console.log(responseJson);
  //put the quote in the text box
  document.getElementById('display-text-p').innerHTML=responseJson[0];
  // $('#display-text-p')
  //   .append(`<br><p style="font-align:right">
  //   -Ron Swanson</p>  `);
  $('#display-text-p').show();
  $('#display-text-input').hide();
}

function displayNewPhoto(responseBlob) {
  console.log('in displayNewPhoto')
  console.log(responseBlob);
  imgUrl = URL.createObjectURL(responseBlob);
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

// function setUpQuoteFilterPage() {
//   console.log('in setUpQuoteFilterPage');
//   $('#use-this-quote').hide();
//   $('#new-ron-quote').hide();
//   $('#use-this-quote2').show();
//   $('#yoda-ize').show();
//   $('#pirate-ize').show();
//   $('#shakespear-ize').show();
// }

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
  $('#grayscale').show();
  $('#blur').show();
  $('#use-this-quote').hide();
  $('#new-ron-quote').hide();
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
  $('#add-tag-line').show();
  $('#grayscale').hide();
  $('#blur').hide();
  
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
        
  //var element = document.getElementById("display-module");
 // element.classList.toggle("top");
  $('#quote-container').toggleClass('justify-end')
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

function addTagLine() {
 /* $('#final-quote')
    .append(`<br><p class="tag-line">
    -Ron Swanson</p>  `);
   */
  $('#tag-line').text('-Ron Swanson') 
  $('#tag-line').show()
}

function toggleGrayscale() {
  if (photoGrayscale) {
    photoGrayscale = false;
  } else {
    photoGrayscale = true;
  };

  reloadPhoto();

}

function toggleBlur() {
  if (photoBlur) {
    photoBlur = false;
  } else {
    photoBlur = true;
  };

  reloadPhoto();

}



function reloadPhoto() {
  if ((photoGrayscale) && (!photoBlur)) {
    photoURL = photoBaseURL+'?grayscale'
    document.getElementById('background-image').src=photoURL;
    console.log('photoURL is '+photoURL);
  };

  if ((photoGrayscale) && (photoBlur)) {
    photoURL = photoBaseURL+'?grayscale&blur=2';
    document.getElementById('background-image').src=photoURL;
    console.log('photoURL is '+photoURL);
  };

  if ((!photoGrayscale) && (!photoBlur)) {
    photoURL = photoBaseURL
    document.getElementById('background-image').src=photoURL;
    console.log('photoURL is '+photoURL);
  };

  if ((!photoGrayscale) && (photoBlur)) {
    photoURL = photoBaseURL+'?blur=2';
    document.getElementById('background-image').src=photoURL;
    console.log('photoURL is '+photoURL);
  };

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
    // setUpQuoteFilterPage();
  });

  $('#home-get-quote').click(event => {
    event.preventDefault();
    console.log('#home-get-quote is clicked');
    getRonQuote();
    setUpQuoteGeneratorPage();
  });

  $('#save-design').on('click', (event) => {
    event.preventDefault()
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext('2d');
    var imageObj = new Image();
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    imageObj.onload = function() {
      ctx.drawImage(imageObj, 0, 0,window.innerWidth,window.innerHeight);
      ctx.font = "40pt Calibri";
      ctx.fillText("My TEXT!", 20, 20); // replace with quote
    };
    imageObj.src = imgUrl; 
    setTimeout(() => {
      // this code saves to an image
      var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
      window.location.href=image;
    }, 1000)
  })








  $('#use-this-quote').click(event => {
    event.preventDefault();
    console.log('#use-this-quote is clicked');
    // setUpQuoteFilterPage();
    acceptedQuote = document.getElementById('display-text-p').innerHTML;
    console.log('acceptedQuote is '+ acceptedQuote);
    getPhoto();
    setUpPhotoPage();
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
    console.log('#default-font is clicked');
    defaultFont();
  }); 

  $('#manly-font').click(event => {
    event.preventDefault();
    console.log('#manly-font is clicked');
    manlyFont();
  }); 

  $('#liberal-font').click(event => {
    event.preventDefault();
    console.log('#liberal-font is clicked');
    liberalFont();
  }); 

  $('#add-tag-line').click(event => {
    event.preventDefault();
    console.log('#add-tag-line is clicked');
    addTagLine();
  }); 


  $('#grayscale').click(event=> {
    event.preventDefault();
    console.log('grayscale is clicked');
    //toggle grayscale
    toggleGrayscale();
  })

  $('#blur').click(event=> {
    event.preventDefault();
    console.log('blur is clicked');
    //toggle grayscale
    toggleBlur();
  })

}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
})