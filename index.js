let acceptedQuote="";
let imgUrl = '';
let photoURL;
let photoBaseURL;
let photoGrayscale = false;
let photoBlur = false;
let quoteVar ='';
let fontVar='';
let fontSize = 1;
let leftMargin = 20;
let maxTextWidth;
let yAdjust = 0;


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
    maxTextWidth = $('#display-module').width() - 20;
}

function getPhoto() {
  console.log('in getPhoto');
  photoGrayscale = false;
  photoBlur = false;
  fetch('https://picsum.photos/1600/1200')
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
  });
}

function displayResults(responseJson) {
  console.log(' in displayResults --'+responseJson);
  //put the quote in the text box
  document.getElementById('display-text-p').innerHTML=responseJson[0];
  // save quote for canvas
  quoteVar=responseJson[0];
  $('#display-text-p').hide();
  $('#display-text-input').hide();
  $('#display-text').show();
  $('#use-this-quote').click();
  $('#save-design').click();
}

function displayNewPhoto(responseBlob) {
  console.log('in displayNewPhoto')
  console.log(responseBlob);
  console.log('size is '+responseBlob.size);
  if (responseBlob.size===0){
    console.log('blank pic ************************');
    getPhoto();
  }
  imgUrl = URL.createObjectURL(responseBlob);
  document.getElementById('background-image').src=imgUrl;
  $('#new-ron-quote').hide();
  $('#home-get-quote').hide();
  $('.start-page').hide();
  $('#use-this-photo').click();
  console.log('The url is '+imgUrl);
  $('#save-design').click();
  $('.nav').show();
}

// function setUpQuoteGeneratorPage() {
//   console.log('in setUpQuoteGeneratorPage');
//   $('.start-page').hide();
//   $('#display-text').show();
//   $('#use-this-quote').show();
//   $('#new-ron-quote').show();
// }

function setUpPhotoPage() {
  console.log('in setUpPhotoPage');
  $('#display-text-p').hide();
  $('#use-this-quote2').hide();
  $('#background-image').show();
  $('#use-this-photo').show();
  $('#new-photo').show();
  $('#grayscale').show();
  $('#blur').show();
  $('#use-this-quote').hide();
  // $('#new-ron-quote').hide();
}

function displayFinalResultsPage() {
  console.log('in displayFinalResultsPage');
  $('#cycle-quote-background').show();
  $('#default-font').show();
  $('#manly-font').show();
  $('#liberal-font').show();
  $('#use-this-photo').hide();
  // $('#new-photo').hide();
  $('#save-design').show();
  $('#go-home').show();
  $('#add-tag-line').show();
  // $('#grayscale').hide();
  // $('#blur').hide();
  
 

  document.getElementById('final-quote').innerHTML = document.getElementById('display-text-p').innerHTML;
  $('#final-quote').show();
  console.log(document.getElementById('background-image').src);

  // new
  $('#default-font').click();
  $('#display-module').hide();
  
}

// rename this function
function cycleQuoteBackground() {
  console.log('in cycleQuoteBackground');
  $('#quote-container').toggleClass('justify-end')
  $('#save-design').click();
}

function defaultFont() {
  console.log('in defaultFont');
  $('#display-module').removeClass('manly-font');
  $('#display-module').removeClass('liberal-font');
  fontVar='Arial';
  $('#save-design').click();
}

function manlyFont() {
  console.log('in manlyFont');
  $('#display-module').addClass('manly-font');
  $('#display-module').removeClass('liberal-font');
  fontVar='Staatliches';
  $('#save-design').click();
}

function liberalFont() {
  console.log('in liberalFont');
  $('#display-module').removeClass('manly-font');
  $('#display-module').addClass('liberal-font');
  fontVar = 'Dancing Script';
  $('#save-design').click();
}


function toggleGrayscale() {
  console.log('in toggleGrayscale');
  if (photoGrayscale) {
    photoGrayscale = false;
    console.log('photoGrayscale is false');
  } else {
    photoGrayscale = true;
    console.log('photoGrayscale is true');
  };
  reloadPhoto();
  $('#save-design').click();
}

function toggleBlur(idx) {
  console.log('in toggleBlur');
  if (photoBlur) {
    photoBlur = false;
    console.log('photoBlur is false');
  } else {
    photoBlur = true;
    console.log('photoBlur is true')
  };
  reloadPhoto(idx);
  $('#save-design').click();
}

function reloadPhoto(idx) {
  console.log('in reloadPhoto');
  if ((photoGrayscale) && (!photoBlur)) {
    photoURL = photoBaseURL+'?grayscale'
    document.getElementById('background-image').src=photoURL;
    console.log('photoURL is '+photoURL);
    // to update save photo
    imgUrl=photoURL;
  };

  if ((photoGrayscale) && (photoBlur)) {
    photoURL = photoBaseURL+'?grayscale&blur='+idx;
    document.getElementById('background-image').src=photoURL;
    console.log('photoURL is '+photoURL);
    // to update save photo
    imgUrl=photoURL;
  };

  if ((!photoGrayscale) && (!photoBlur)) {
    photoURL = photoBaseURL
    document.getElementById('background-image').src=photoURL;
    console.log('photoURL is '+photoURL);
    // to update save photo
    imgUrl=photoURL;
  };

  if ((!photoGrayscale) && (photoBlur)) {
    photoURL = photoBaseURL+'?blur='+idx;
    document.getElementById('background-image').src=photoURL;
    console.log('photoURL is '+photoURL);
    // to update save photo
    imgUrl=photoURL;
  };
  $('#save-design').click();
}

function refreshScreen() {
  $('#save-design').click();
}

function watchForm() {

  console.log('in watchForm');

  $('#new-ron-quote').click(event => {
    event.preventDefault();
    console.log('#new-ron-quote is clicked');
    getRonQuote();
    $('#use-this-quote').click();
  });

  

  $('#home-get-quote').click(event => {
    event.preventDefault();
    console.log('#home-get-quote is clicked');
    getRonQuote();
    // setUpQuoteGeneratorPage();
  });


  $('#increase-font').on('click', event => {
    event.preventDefault();
    fontSize += 0.1
    $('#final-quote').css('font-size', `${fontSize}rem`)
    $('#save-design').click();
  })

  $('#decrease-font').on('click', event => {
    event.preventDefault();
    fontSize -= 0.1
    $('#final-quote').css('font-size', `${fontSize}rem`)
    $('#save-design').click();
  })

  $('#text-left').on('click', event => {
    event.preventDefault();
    leftMargin-= 10;
    // maxTextWidth+=10;
    $('#save-design').click();
  })

  $('#text-right').on('click', event => {
    event.preventDefault();
    leftMargin+= 10;
    // maxTextWidth-=10;
    $('#save-design').click();
  })

  $('#reset-text-width').on('click', event => {
    event.preventDefault();
    maxTextWidth = $('#display-module').width() - 20;
    console.log('reset text width- maxTextWidth is '+maxTextWidth);
    $('#save-design').click();
    
  })

  $('#text-field-narrow').on('click', event => {
    event.preventDefault();
    
    maxTextWidth-=10;
    $('#save-design').click();
  })

  $('#text-field-wide').on('click', event => {
    event.preventDefault();
    
    maxTextWidth+=10;
    $('#save-design').click();
  })

  $('#down-small').on('click', event => {
    event.preventDefault();
     yAdjust+=10;
    $('#save-design').click();
  })

  $('#down-large').on('click', event => {
    event.preventDefault();
     yAdjust+=30;
    $('#save-design').click();
  })

  $('#up-small').on('click', event => {
    event.preventDefault();
    
    yAdjust-=10;
    $('#save-design').click();
  })

  $('#up-large').on('click', event => {
    event.preventDefault();
    
    yAdjust-=30;
    $('#save-design').click();
  })

  $('#save-design').on('click', (event) => {
    event.preventDefault()
    console.log('in save-design');

    let containerOffset = $('#display-module').offset().top
    let textOffset = $('#final-quote').offset().top
    let offsetDifference = containerOffset - textOffset
    if (offsetDifference < 0) offsetDifference = offsetDifference * -1

    offsetDifference += 50 //window.innerWidth / 20 
    offsetDifference += yAdjust;

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext('2d');
    var imageObj = new Image();
    ctx.canvas.width = $('#display-module').width();
    ctx.canvas.height = $('#display-module').height();
    imageObj.onload = function() {
      ctx.drawImage(imageObj, 0, 0,$('#display-module').width(),$('#display-module').height());
      console.log('fontsize is '+fontSize);
      ctx.font = `${fontSize}rem ${fontVar}`;
      ctx.fillStyle = "white";
      printAt(ctx, quoteVar, leftMargin, offsetDifference, fontSize * 15, maxTextWidth)
      console.log('maxTextWidth is '+ maxTextWidth);
    };
    imageObj.src = imgUrl; 
       
  })

function printAt( context , text, x, y, lineHeight, fitWidth) {
    fitWidth = fitWidth || 0;
    
    if (fitWidth <= 0) {
        context.fillText( text, x, y );
        return;
    }
    
    for (let idx = 1; idx <= text.length; idx++) {
        let str = text.substr(0, idx);
        if (context.measureText(str).width > fitWidth) {  
          let lastWhiteSpace = text.substr(0, idx-1).lastIndexOf(' ');     
          let indexCutString = text.substr(0, lastWhiteSpace);
          context.fillText( indexCutString, x, y );
          let remainingString = text.substr(lastWhiteSpace).trim();
          return printAt(context, remainingString, x, y + lineHeight, lineHeight,  fitWidth);
        }
    }
    context.fillText( text, x, y );
    
}


  $('#use-this-quote').click(event => {
    event.preventDefault();
    console.log('#use-this-quote is clicked');
    // setUpQuoteFilterPage();
    acceptedQuote = document.getElementById('display-text-p').innerHTML;
    console.log('acceptedQuote is '+ acceptedQuote);
    $('#myCanvas').hide();
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


  $('#use-this-photo').click(event => {
    event.preventDefault();
    console.log('#use-this-photo is clicked');
    $('#myCanvas').show();
    displayFinalResultsPage();
  }); 

  $('#go-home').click(event => {
    event.preventDefault();
    console.log('#go-home is clicked');
    location.reload();
  }); 

  $('#cycle-quote-background').click(event => {
    event.preventDefault();
    console.log('#cycle-quote-background is clicked');
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

  $('#blur-light').click(event=> {
    event.preventDefault();
    console.log('blur-light is clicked');
    //toggle grayscale
    toggleBlur(3);
  })
  
  $('#blur-heavy').click(event=> {
    event.preventDefault();
    console.log('blur-heavy is clicked');
    //toggle grayscale
    toggleBlur(6);
  })

  $('#nav-icon').click(event=> {
    // event.preventDefault();
    console.log('nav-cion is clicked');
    // toggle hide
    // let menuBar = document.querySelector('.multi-level');
    // console.log('.multi-level display is set to '+menuBar.style.display);
    // if (menuBar.style.display !== 'block') {
    //   menuBar.style.display = 'block';
    //   } else {
    //     menuBar.style.display = 'none';
    //   }

    $('.multi-level').toggle();
  })

  $('#A').click(event=> {
    // toggle hide

    // $('#blur').toggle();

    $('#photo-options-ul').toggle();

    
    $('#quote-options-bar').toggle();
    $('#font-options-bar').toggle();
    $('#text-position-bar').toggle();
    $('#text-options-bar').toggle();
    $('#other-bar').toggle();
  })

  $('#B').click(event=> {
    // toggle hide

    // $('#blur').toggle();

    $('#quote-options-ul').toggle();

    $('#photo-options-bar').toggle();
    // $('#quote-options-bar').toggle();
    $('#font-options-bar').toggle();
    $('#text-position-bar').toggle();
    $('#text-options-bar').toggle();
    $('#other-bar').toggle();
  })

  $('#C').click(event=> {
    // toggle hide

    // $('#blur').toggle();

    $('#font-options-ul').toggle();

    $('#photo-options-bar').toggle();
    $('#quote-options-bar').toggle();
    // $('#font-options-bar').toggle();
    $('#text-position-bar').toggle();
    $('#text-options-bar').toggle();
    $('#other-bar').toggle();
  })

  $('#D').click(event=> {
    // toggle hide

    // $('#blur').toggle();

    $('#text-position-ul').toggle();

    $('#photo-options-bar').toggle();
    $('#quote-options-bar').toggle();
    $('#font-options-bar').toggle();
    // $('#text-position-bar').toggle();
    $('#text-options-bar').toggle();
    $('#other-bar').toggle();
  })

  $('#E').click(event=> {
    // toggle hide

    // $('#blur').toggle();

    $('#text-options-ul').toggle();

    $('#photo-options-bar').toggle();
    $('#quote-options-bar').toggle();
    $('#font-options-bar').toggle();
    $('#text-position-bar').toggle();
    // $('#text-options-bar').toggle();
    $('#other-bar').toggle();
  })

  $('#F').click(event=> {
    // toggle hide

    // $('#blur').toggle();

    $('#other-ul').toggle();

    $('#photo-options-bar').toggle();
    $('#quote-options-bar').toggle();
    $('#font-options-bar').toggle();
    $('#text-position-bar').toggle();
    $('#text-options-bar').toggle();
    // $('#other-bar').toggle();
  })

  $('#G').click(event=> {
    $('#blur-ul').toggle();

    $('#new-photo').toggle();
    $('#grayscale').toggle();
    
  })

  $('#H').click(event=> {

    $('#text-down-ul').toggle();

    $('#text-up').toggle();
    $('#text-right').toggle();
    $('#text-left').toggle();

  })

  $('#I').click(event=> {

    $('#text-up-ul').toggle();

    $('#text-down').toggle();
    $('#text-right').toggle();
    $('#text-left').toggle();

  })
    


  // $('#I').click(event=> {


  window.addEventListener("resize", refreshScreen);
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
})