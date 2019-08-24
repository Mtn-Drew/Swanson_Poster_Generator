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
let firstRun = true;


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
    // window.addEventListener("resize", refreshCanvas1); 
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
  fetch('https://picsum.photos/1200/1200')
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
  
    
  // $('.menu-bar').show();
  if (firstRun) { 
    $('.main-container').append(barHTML);
  };
  firstRun=false;
  refreshCanvas();
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
// limit total size of poster
  
  imageObj.onload = function() {
    ctx.drawImage(imageObj, 0, 0,$('#display-module').width(),$('#display-module').height());
    ctx.font = `${fontSize}rem ${fontVar}`;
    ctx.fillStyle = canvasTextColor;
    printAt(ctx, quoteVar, leftMargin, offsetDifference, fontSize * 15, maxTextWidth)
  };
  
  imageObj.src = imgUrl; 
  // getElementById('large-bar').width=getElementById('display-module').width;
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
  fontVar='Special Elite';
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

  
  $('.main-container').on('click', '.change-ron-quote', event => {
    newRonQuote();
    acceptedQuote = document.getElementById('display-text-p').innerHTML;
    console.log('acceptedQuote is '+ acceptedQuote);
  })
  
  $('.main-container').on('click', '.increase-font', event => {
    fontSize += 0.1
    $('#final-quote').css('font-size', `${fontSize}rem`)
    refreshCanvas();
  })

  $('.main-container').on('click', '.decrease-font', event => {
    fontSize -= 0.1
    $('#final-quote').css('font-size', `${fontSize}rem`)
    refreshCanvas();
  })

  $('.main-container').on('click', '.text-left', event => {
    leftMargin-= 10;
    refreshCanvas();
  })

  $('.main-container').on('click', '.text-right', event => {
    leftMargin+= 10;
    refreshCanvas();
  })

  $('.main-container').on('click', '.reset-text-width', event => {
    maxTextWidth = $('#display-module').width() - 20;
    console.log('reset text width- maxTextWidth is '+maxTextWidth);
    refreshCanvas();
  })

  $('.main-container').on('click', '.text-field-narrow', event => {
    maxTextWidth-=10;
    refreshCanvas();
  })

  $('.main-container').on('click', '.text-field-wide', event => {
    maxTextWidth+=10;
    refreshCanvas();
  })

  $('.main-container').on('click', '.down-small', event => {
    yAdjust+=10;
    refreshCanvas();
  })

  $('.main-container').on('click', '.down-large', event => {
     yAdjust+=50;
     refreshCanvas();
  })

  $('.main-container').on('click', '.up-small', event => {
    yAdjust-=10;
    refreshCanvas();
  })

  $('.main-container').on('click', '.up-large', event => {
    yAdjust-=50;
    refreshCanvas();
  })

  $('.main-container').on('click', '.save-design', event => {

    console.log('#save-design is clicked');

    refreshCanvas();
  })

  $('.use-this-quote').click(event => {

    console.log('#use-this-quote is clicked');

    event.preventDefault();
    getPhoto();
    $('#background-image').show();
  }); 

  
  // $('.new-photo').click(event => {
  $('.main-container').on("click",".new-photo", event => {
    console.log('#new-photo is clicked');
    getPhoto();
  });
  //   console.log('#new-photo is clicked');

  //   getPhoto();
  // }); 


  $('.main-container').on('click', '.go-home', event => {

    console.log('#go-home is clicked');

    location.reload();
  }); 

  $('.main-container').on('click', '.default-font', event => {

    console.log('#manly-font is clicked');

    defaultFont();
  })

  $('.main-container').on('click', '.manly-font', event => {

    console.log('#manly-font is clicked');

    manlyFont();
  }); 

  $('.main-container').on('click', '.liberal-font', event => {

    console.log('#liberal-font is clicked');

    liberalFont();
  }); 

  $('.main-container').on('click', '.grayscale', event=> {

    console.log('grayscale is clicked');

    toggleGrayscale();
  })

  $('.main-container').on('click', '.blur-light', event=> {

    console.log('blur-light is clicked');

    toggleBlur(3);
  })
  
  $('.main-container').on('click', '.blur-heavy', event=> {

    console.log('blur-heavy is clicked');

    toggleBlur(6);
  })

  $('.main-container').on('click', '.font-white', event=> {
    canvasTextColor="white";
    refreshCanvas();
  })

  $('.main-container').on('click', '.font-black', event=> {
    canvasTextColor="black";
    refreshCanvas();
  })


  //Small Menu bar -------------------------------------------//
  $('.main-container').on('click', '#nav-icon', event => {
    $('.item').toggle();
  })


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

  $('.main-container').on('click', '#cb-font-options', event=> {
  
    $('#photo-options-bar').toggle();
    $('#quote-options-bar').toggle();
    $('#text-position-bar').toggle();
    $('#text-options-bar').toggle();
    $('#other-bar').toggle();
  })

  $('.main-container').on('click', '#cb-text-position', event=> {
  
    $('#photo-options-bar').toggle();
    $('#quote-options-bar').toggle();
    $('#font-options-bar').toggle();
    $('#text-options-bar').toggle();
    $('#other-bar').toggle();
  })

  $('.main-container').on('click', '#cb-text-options', event=> {
  
    $('#photo-options-bar').toggle();
    $('#quote-options-bar').toggle();
    $('#font-options-bar').toggle();
    $('#text-position-bar').toggle();
    $('#other-bar').toggle();
  })

  $('.main-container').on('click', '#cb-other', event=> {
  
    $('#photo-options-bar').toggle();
    $('#quote-options-bar').toggle();
    $('#font-options-bar').toggle();
    $('#text-position-bar').toggle();
    $('#text-options-bar').toggle();
  })

  $('.main-container').on('click', '.save-pic', event => {
    save2();
  })
/* Menu-------------------------------------*/


  window.addEventListener("resize", refreshCanvas1);
  
  }

function refreshCanvas1() {
  fontSize= $('#display-module').width()/300;
  refreshCanvas();
}

function save2() {
  window.open(myCanvas.toDataURL('image/png'));
  var gh = myCanvas.toDataURL('png');

  var a  = document.createElement('a');
  a.href = gh;
  a.download = 'image.png';

  a.click()
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
})



const barHTML = `<!-- Small Menu ------------------------------------------- -->
<div id="small-bar" class="menu-bar hide">

  <input type="checkbox" id="menu"/>
  <label for="menu" id="nav-icon">&#9776; Menu</label>

  <div class="item" id="photo-options-bar">
    <input type="checkbox" id="cb-photo-options"/>
    <label for="cb-photo-options">Photo Options</label>

      <ul id="photo-options-ul">
        <li><a href="#"  id="new-photo" class="new-photo">New photo</a></li>
        <li><a href="#"  id="grayscale" class="grayscale">Grayscale</a></li>
        <li><a href="#"  id="blur-light" class="blur-light">Light Blur</a></li>
        <li><a href="#"  id="blur-heavy" class="blur-heavy">Heavy Blur</a></li>
      </ul>
  </div>

  <div class="item" id="quote-options-bar">
    <input type="checkbox" id="cb-quote-options"/>
    <label for="cb-quote-options">Quote Options</label>

      <ul id="quote-options-ul">
        <li><a href="#"  id="change-ron-quote" class="change-ron-quote">New Ron quote</a></li>
        <li><a href="#"  id="font-white" class="font-white">In White</a></li>
        <li><a href="#"  id="font-black" class="font-black">In Black</a></li>
      </ul>
  </div>
    
  <div class="item" id="font-options-bar">
    <input type="checkbox" id="cb-font-options"/>
    <label for="cb-font-options">Font Options</label>

      <ul id="font-options-ul">
        <li><a href="#"  id="default-font" class="default-font">Default Font</a></li>
        <li><a href="#"  id="manly-font" class="manly-font">Libertarian Font</a></li>
        <li><a href="#"  id="liberal-font" class="liberal-font">Hippy Font</a></li>
      </ul>
  </div>

  <div class="item" id="text-position-bar">
    <input type="checkbox" id="cb-text-position"/>
    <label for="cb-text-position">Text Postion</label>
 
      <ul id="text-position-ul">
        <li><a href="#"  id="text-left" class="text-left">Text Left</a></li>
        <li><a href="#"  id="text-right" class="text-right">Text Right</a></li> 
        <li><a href="#"  id="down-small" class="down-small">Down Small</a></li>
        <li><a href="#"  id="down-large" class="down-large">Down Large</a></li>
        <li><a href="#"  id="up-small" class="up-small">Up Small</a></li>
        <li><a href="#"  id="up-large" class="up-large">Up Large</a></li>
      </ul>
  </div>

  <div class="item" id="text-options-bar">
    <input type="checkbox" id="cb-text-options"/>
    <label for="cb-text-options">Text Options</label>

      <ul id="text-options-ul">
        <li><a href="#"  id="increase-font" class="increase-font">Increase Font</a></li>
        <li><a href="#"  id="decrease-font" class="decrease-font">Decrease Font</a></li>
        <li><a href="#"  id="text-field-narrow" class="text-field-narrow">Text Field Narrower</a></li>
        <li><a href="#"  id="text-field-wide" class="text-field-wide">Text Field Wider</a></li> 
        <li><a href="#"  id="reset-text-width" class="reset-text-width">Reset Text Width</a></li>
      </ul>
  </div>    
            
  <div class="item" id="other-bar">
    <input type="checkbox" id="cb-other"/>
    <label for="cb-other">Save</label>    

      <ul id="other-ul">
        <li><a href="#" class="save-pic">Save Image</a></li>
        <li><a href="#"  id="save-design" class="save-design">Refresh</a></li>
        <li><a href="#"  id="go-home" class="go-home">Start Over</a></li>
      </ul>

  </div>
</div>


<!-- Large Menu ---------------------------------- -->

<div id="large-bar" class="l-menu-bar hide">

  <ul>
    <li class="dropdown">
      <a href="javascript:void(0)" class="dropbtn">Photo Options</a>

          <div id="l-photo-options-ul" class="dropdown-content">
            <a href="#"  id="l-new-photo" class="new-photo">New photo</a>
            <a href="#"  id="l-grayscale" class="grayscale">Grayscale</a>
            <a href="#"  id="l-blur-light" class="blur-light">Light Blur</a>
            <a href="#"  id="l-blur-heavy" class="blur-heavy">Heavy Blur</a>
          </div></li>
  
  
    <li class="dropdown">
      <a href="javascript:void(0)" class="dropbtn">Quote Options</a>

        <div id="l-quote-options-ul" class="dropdown-content">
          <a href="#"  id="l-change-ron-quote" class="change-ron-quote">New Ron quote</a>
          <a href="#"  id="l-font-white" class="font-white">In White</a>
          <a href="#"  id="l-font-black" class="font-black">In Black</a>
        </div></li>
  
      <li class="dropdown"><a href="javascript:void(0)" class="dropbtn">Font Options</a>
  
          <div id="l-font-options-ul" class="dropdown-content">
            <a href="#"  id="l-default-font" class="default-font">Default Font</a>
            <a href="#"  id="l-manly-font" class="manly-font">Libertarian Font</a>
            <a href="#"  id="l-liberal-font" class="liberal-font">Hippy Font</a>
          </div></li>
 
      <li class="dropdown"><a href="javascript:void(0)" class="dropbtn">Text Position</a>
     
          <div id="l-text-position-ul" class="dropdown-content">
            <a href="#"  id="l-text-left" class="text-left">Text Left</a>
            <a href="#"  id="l-text-right" class="text-right">Text Right</a>
            <a href="#"  id="l-down-small" class="down-small">Down Small</a>
            <a href="#"  id="l-down-large" class="down-large">Down Large</a>
            <a href="#"  id="l-up-small" class="up-small">Up Small</a>
            <a href="#"  id="l-up-large" class="up-large">Up Large</a>
          </div></li>
 
      <li class="dropdown"><a href="javascript:void(0)" class="dropbtn">Text Options</a>
    
          <div id="l-text-options-ul" class="dropdown-content">
            <a href="#"  id="l-increase-font" class="increase-font">Increase Font</a>
            <a href="#"  id="l-decrease-font" class="decrease-font">Decrease Font</a>
            <a href="#"  id="l-text-field-narrow" class="text-field-narrow">Text Field Narrower</a>
            <a href="#"  id="l-text-field-wide" class="text-field-wide">Text Field Wider</a> 
            <a href="#"  id="l-reset-text-width" class="reset-text-width">Reset Text Width</a>
          </div></li>
     
      <li class="dropdown"><a href="javascript:void(0)" class="dropbtn">Save</a>
  
            <div id="l-other-ul" class="dropdown-content">
            <a href="#" class="save-pic">Save Image</a>
            <a href="#"  id="l-save-design" class="save-design">Refresh</a>
            <a href="#"  id="l-go-home" class="go-home">Start Over</a>
            </div></li>


  </ul>
</div>`