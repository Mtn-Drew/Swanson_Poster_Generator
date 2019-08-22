let acceptedQuote="";
let imgUrl = '';
let fullUrl;
let photoBaseURL;
let photoGrayscale = false;
let photoBlur = false;
let quoteVar ='';
let fontVar='';
let fontSize = 1;
let leftMargin = 20;
let maxTextWidth;
let yAdjust = 0;
let canvasTextColor="white";


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
    maxTextWidth = $('#display-module').width() - 20;
     
}

function displayResults(responseJson) {

  console.log(' in displayResults --'+responseJson);

  quoteVar=responseJson[0];
  getPhoto();
  $('#background-image').show();
  refreshCanvas();
}

function getPhoto() {

  console.log('in getPhoto');

  photoGrayscale = false;
  photoBlur = false;
  fetch('https://picsum.photos/1600/1200')
    .then(function(response) {
      photoBaseURL = response.url; 
      response.blob()
    .then(responseBlob => 
        displayNewPhoto(responseBlob))
    .then (refreshCanvas())
    .catch(error => {
      alert('Something went wrong. Try again later.')
      console.log(error);
    })
  });
}

function displayNewPhoto(responseBlob) {

  console.log('in displayNewPhoto')

  //if returned image is blank, call for new image
  if (responseBlob.size===0){ 
    getPhoto();
  }
  imgUrl = URL.createObjectURL(responseBlob);
  document.getElementById('background-image').src=imgUrl;
  $('.start-page').hide();
  $('#myCanvas').show();
  displayFinalResultsPage();
  refreshCanvas();
  
  //$('.menu-bar').show();
  $('.main-container').append(barHtml)
}

function displayFinalResultsPage() {

  console.log('in displayFinalResultsPage');

  document.getElementById('final-quote').innerHTML = document.getElementById('display-text-p').innerHTML;
  defaultFont();
  $('#display-module').hide();
  }



function newRonQuote() {

  console.log('in newRonQuote');
  
  fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
    .then(response => response.json())
    .then(responseJson => {
      quoteVar=responseJson[0];
      refreshCanvas();
    })      
    .catch(error => {
      alert('Something went wrong. Try again later.')
      console.log(error)
    })
  maxTextWidth = $('#display-module').width() - 20;
}





function refreshCanvas() {

  console.log('in refreshCanvas');

  
  let containerOffset = $('#display-module').offset().top
  let textOffset = $('#final-quote').offset().top
  let offsetDifference = containerOffset - textOffset
  if (offsetDifference < 0) offsetDifference = offsetDifference * -1
  offsetDifference += 50 
  offsetDifference += yAdjust;
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext('2d');
  let imageObj = new Image();
  ctx.canvas.width = $('#display-module').width();
  ctx.canvas.height = $('#display-module').height();
  console.log('display-module height is '+ctx.canvas.height);
  imageObj.onload = function() {
    ctx.drawImage(imageObj, 0, 0,$('#display-module').width(),$('#display-module').height());
    ctx.font = `${fontSize}rem ${fontVar}`;
    ctx.fillStyle = canvasTextColor;
    printAt(ctx, quoteVar, leftMargin, offsetDifference, fontSize * 15, maxTextWidth)
  };
  
  imageObj.src = imgUrl; 
}

function printAt(context , text, x, y, lineHeight, fitWidth) {

  console.log('in printAt');

  //if fitWidth is falsey, set to 0
  fitWidth = fitWidth || 0;
  //if text will fit on one line, print to canvas
  if (fitWidth <= 0) {
      context.fillText( text, x, y );
      return refreshCanvas();
  }
  //if text is too long for a single line, break it at the last space and rerun function
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



function displayFinalResultsPage() {

  console.log('in displayFinalResultsPage');

  document.getElementById('final-quote').innerHTML = document.getElementById('display-text-p').innerHTML;
  defaultFont();
  $('#display-module').hide();
  }

function defaultFont() {
  console.log('in defaultFont');
  $('#display-module').removeClass('manly-font');
  $('#display-module').removeClass('liberal-font');
  fontVar='Arial';
  refreshCanvas();
}

function manlyFont() {
  console.log('in manlyFont');
  $('#display-module').addClass('manly-font');
  $('#display-module').removeClass('liberal-font');
  fontVar='Staatliches';
  refreshCanvas();
}

function liberalFont() {
  console.log('in liberalFont');
  $('#display-module').removeClass('manly-font');
  $('#display-module').addClass('liberal-font');
  fontVar = 'Dancing Script';
  refreshCanvas();
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
  refreshCanvas();
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
  refreshCanvas();
}

function reloadPhoto(idx) {
  console.log('in reloadPhoto');
  if ((photoGrayscale) && (!photoBlur)) {
    fullUrl = photoBaseURL+'?grayscale'
    document.getElementById('background-image').src=fullUrl;
    console.log('fullUrl is '+fullUrl);
    // to update save photo
    imgUrl=fullUrl;
  };

  if ((photoGrayscale) && (photoBlur)) {
    fullUrl = photoBaseURL+'?grayscale&blur='+idx;
    document.getElementById('background-image').src=fullUrl;
    console.log('fullUrl is '+fullUrl);
    // to update save photo
    imgUrl=fullUrl;
  };

  if ((!photoGrayscale) && (!photoBlur)) {
    fullUrl = photoBaseURL
    document.getElementById('background-image').src=fullUrl;
    console.log('fullUrl is '+fullUrl);
    // to update save photo
    imgUrl=fullUrl;
  };

  if ((!photoGrayscale) && (photoBlur)) {
    fullUrl = photoBaseURL+'?blur='+idx;
    document.getElementById('background-image').src=fullUrl;
    console.log('fullUrl is '+fullUrl);
    // to update save photo
    imgUrl=fullUrl;
  };
  refreshCanvas();
}



// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


function watchForm() {

  console.log('in watchForm');

  $('#home-get-quote').click(event => {
    event.preventDefault();
    console.log('#home-get-quote is clicked');
    getRonQuote();
  });

  
  $('#change-ron-quote').click(event => {
    newRonQuote();
    acceptedQuote = document.getElementById('display-text-p').innerHTML;
    console.log('acceptedQuote is '+ acceptedQuote);
  })
  
  $('#increase-font').on('click', event => {
    fontSize += 0.1
    $('#final-quote').css('font-size', `${fontSize}rem`)
    refreshCanvas();
  })

  $('#decrease-font').on('click', event => {
    fontSize -= 0.1
    $('#final-quote').css('font-size', `${fontSize}rem`)
    refreshCanvas();
  })

  $('#text-left').on('click', event => {
    leftMargin-= 10;
    refreshCanvas();
  })

  $('#text-right').on('click', event => {
    leftMargin+= 10;
    refreshCanvas();
  })

  $('#reset-text-width').on('click', event => {
    maxTextWidth = $('#display-module').width() - 20;
    console.log('reset text width- maxTextWidth is '+maxTextWidth);
    refreshCanvas();
  })

  $('#text-field-narrow').on('click', event => {
    maxTextWidth-=10;
    refreshCanvas();
  })

  $('#text-field-wide').on('click', event => {
    maxTextWidth+=10;
    refreshCanvas();
  })

  $('#down-small').on('click', event => {
    yAdjust+=10;
    refreshCanvas();
  })

  $('#down-large').on('click', event => {
     yAdjust+=30;
     refreshCanvas();
  })

  $('#up-small').on('click', event => {
    yAdjust-=10;
    refreshCanvas();
  })

  $('#up-large').on('click', event => {
    yAdjust-=30;
    refreshCanvas();
  })

  $('#save-design').on('click', (event) => {

    console.log('#save-design is clicked');

    refreshCanvas();
  })

  $('#use-this-quote').click(event => {

    console.log('#use-this-quote is clicked');

    event.preventDefault();
    getPhoto();
    $('#background-image').show();
  }); 

  
  $('#new-photo').click(event => {

    console.log('#new-photo is clicked');

    getPhoto();
  }); 


  $('#go-home').click(event => {

    console.log('#go-home is clicked');

    location.reload();
  }); 

  $('#default-font').click(event => {

    console.log('#manly-font is clicked');

    defaultFont();
  })

  $('#manly-font').click(event => {

    console.log('#manly-font is clicked');

    manlyFont();
  }); 

  $('#liberal-font').click(event => {

    console.log('#liberal-font is clicked');

    liberalFont();
  }); 

  $('#grayscale').click(event=> {

    console.log('grayscale is clicked');

    toggleGrayscale();
  })

  $('#blur-light').click(event=> {

    console.log('blur-light is clicked');

    toggleBlur(3);
  })
  
  $('#blur-heavy').click(event=> {

    console.log('blur-heavy is clicked');

    toggleBlur(6);
  })

  $('#font-white').click(event=> {
    canvasTextColor="white";
    refreshCanvas();
  })

  $('#font-black').click(event=> {
    canvasTextColor="black";
    refreshCanvas();
  })


  //Menu bar -------------------------------------------//

  $('.main-container').on('click', '#cb-photo-options', event=> {
    $('#quote-options-bar').toggle();
    $('#font-options-bar').toggle();
    $('#text-position-bar').toggle();
    $('#text-options-bar').toggle();
    $('#other-bar').toggle();
  })

  $('.main-container').on('click', '#cb-quote-options', event=> {
    $('#photo-options-bar').toggle();
    $('#font-options-bar').toggle();
    $('#text-position-bar').toggle();
    $('#text-options-bar').toggle();
    $('#other-bar').toggle();
  })

  $('#cb-font-options').click(event=> {
  
    $('#photo-options-bar').toggle();
    $('#quote-options-bar').toggle();
    $('#text-position-bar').toggle();
    $('#text-options-bar').toggle();
    $('#other-bar').toggle();
  })

  $('#cb-text-position').click(event=> {
  
    $('#photo-options-bar').toggle();
    $('#quote-options-bar').toggle();
    $('#font-options-bar').toggle();
    $('#text-options-bar').toggle();
    $('#other-bar').toggle();
  })

  $('#cb-text-options').click(event=> {
  
    $('#photo-options-bar').toggle();
    $('#quote-options-bar').toggle();
    $('#font-options-bar').toggle();
    $('#text-position-bar').toggle();
    $('#other-bar').toggle();
  })

  $('#cb-other').click(event=> {
  
    $('#photo-options-bar').toggle();
    $('#quote-options-bar').toggle();
    $('#font-options-bar').toggle();
    $('#text-position-bar').toggle();
    $('#text-options-bar').toggle();
  })

  $('#cb-blur').click(event=> {
  
    $('#new-photo').toggle();
    $('#grayscale').toggle();
  })

  $('#cb-text-down').click(event=> {
  
    $('#text-up').toggle();
    $('#text-right').toggle();
    $('#text-left').toggle();
  })

  $('#cb-text-up').click(event=> {
  
    $('#text-down').toggle();
    $('#text-right').toggle();
    $('#text-left').toggle();
  })

  
/* Menu-------------------------------------*/


  window.addEventListener("resize", refreshCanvas1);
}

function refreshCanvas1() {
  fontSize= $('#display-module').width()/300;
  refreshCanvas();
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
})


const barHtml = `
<div id="large-bar" class="menu-bar hide">
  <p> LAAAARTTGGGEEE </p>
</div>

<div id="small-bar" class="menu-bar hide">

    <input type="checkbox" id="menu"/>
    <label for="menu" id="nav-icon">&#9776; Menu</label>

  <div class="multi-level">

    <div class="item" id="photo-options-bar">
      <input type="checkbox" id="cb-photo-options"/>
      <img src="images/Arrow.png" class="arrow small-menu"><label for="cb-photo-options">Photo Options</label>

      <ul id="photo-options-ul">
        <li><a href="#"  id="new-photo">New photo</a></li>
        <li><a href="#"  id="grayscale">Grayscale</a></li>
        <li>
            <div class="sub-item" id="blur">
              <input type="checkbox" id="cb-blur"/>
              <img src="images/Arrow.png" class="arrow"><label for="cb-blur">Blur</label>

              <ul id="blur-ul">
                <li><a href="#"  id="blur-light">Light Blur</a></li>
                <li><a href="#"  id="blur-heavy">Heavy Blur</a></li>
              </ul>
            </div>
        </li>
      </ul>
    </div>

    <div class="item" id="quote-options-bar">
      <input type="checkbox" id="cb-quote-options"/>
      <img src="images/Arrow.png" class="arrow small-menu"><label for="cb-quote-options">Quote Options</label>

      <ul id="quote-options-ul">
        <li><a href="#"  id="change-ron-quote">New Ron quote</a></li>
        <li><a href="#"  id="font-white">In White</a></li>
        <li><a href="#"  id="font-black">In Black</a></li>
      </ul>
    </div>
    
    <div class="item" id="font-options-bar">
      <input type="checkbox" id="cb-font-options"/>
      <img src="images/Arrow.png" class="arrow small-menu"><label for="cb-font-options">Font Options</label>

      <ul id="font-options-ul">
        <li><a href="#"  id="default-font">Default Font</a></li>
        <li><a href="#"  id="manly-font">Libertarian Font</a></li>
        <li><a href="#"  id="liberal-font">Hippy Font</a></li>
      </ul>
    </div>

    <div class="item" id="text-position-bar">
      <input type="checkbox" id="cb-text-position"/>
      <img src="images/Arrow.png" class="arrow small-menu"><label for="cb-text-position">Text Postion</label>
 
      <ul id="text-position-ul">
        <li><a href="#"  id="text-left">Text Left</a></li>
        <li><a href="#"  id="text-right">Text Right</a></li> 
        <li>
          <div class="sub-item" id="text-down">
            <input type="checkbox" id="cb-text-down"/>
            <img src="images/Arrow.png" class="arrow"><label for="cb-text-down">Text Down</label>
            <ul id="text-down-ul">
              <li><a href="#"  id="down-small">Down Small</a></li>
              <li><a href="#"  id="down-large">Down Large</a></li>
            </ul>
          </div></li>
         <li>
          <div class="sub-item" id="text-up">
              <input type="checkbox" id="cb-text-up"/>
              <img src="images/Arrow.png" class="arrow"><label for="cb-text-up">Text Up</label>
              <ul id="text-up-ul">
                <li><a href="#"  id="up-small">Up Small</a></li>
                <li><a href="#"  id="up-large">Up Large</a></li>
              </ul>
            </div></li>
      </ul>
    </div>

    <div class="item" id="text-options-bar">
      <input type="checkbox" id="cb-text-options"/>
      <img src="images/Arrow.png" class="arrow small-menu"><label for="cb-text-options">Text Options</label>

      <ul id="text-options-ul">
        <li><a href="#"  id="increase-font">Increase Font</a></li>
        <li><a href="#"  id="decrease-font">Decrease Font</a></li>
        <li><a href="#"  id="text-field-narrow">Text Field Narrower</a></li>
        <li><a href="#"  id="text-field-wide">Text Field Wider</a></li> 
        <li><a href="#"  id="reset-text-width">Reset Text Width</a></li>
      </ul>
    </div>    
            
    <div class="item" id="other-bar">
      <input type="checkbox" id="cb-other"/>
      <img src="images/Arrow.png" class="arrow small-menu"><label for="cb-other">Other</label>    

      <ul id="other-ul">
        <li><a href="#"  id="save-design">Refresh</a></li>
        <li><a href="#"  id="go-home">Start Over</a></li>
      </ul>
    </div>
  </div>
</div>`
