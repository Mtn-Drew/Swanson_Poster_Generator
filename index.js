let acceptedQuote="";
let imgUrl = '';
let fullUrl;
let photoBaseURL;
let photoGrayscale = false;
let photoBlur = false;
let quoteVar ='';
let fontVar='';
let fontSize = 2;
let leftMargin = 20;
let maxTextWidth;
let yAdjust = 0;
let canvasTextColor="white";
let firstRun = true;
const errorMessages = [
  "The government invented the internet.  That's why it doesn't work.  Try again.", 
  "It didn't work.  You should have used a camera and a typewriter like God intended.  Try again.",
  "Something didn't work.  Try again.  Or don't.  I don't care.",
  "Something didn't work.  I suspect Tammy One.  Or Tammy Two.  Try again.",
  "Your taxes dollars at work, ladies and gentlemen.  It broke.  Try again.",
  "That didn't work.  Try again.  Please and thank you."];
const landingPageImage = [
  "images/ron1.jpg", "images/ron2.jpg","images/ron3.png","images/ron4.jpg","images/ron5.jpg","images/ron6.jpg","images/ron7.jpg","images/ron8.jpg","images/ron9.jpg"
];

// carousel
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');
const prevButton = document.querySelector('#prev-button');
const nextButton = document.querySelector('#next-button');
let imgCounter =1;
let size = carouselImages[0].clientWidth;
carouselSlide.style.transform = 'translateX(' + (-size * imgCounter) + 'px)';

// Ron pic for top of landing page
let rando = `'${landingPageImage[Math.floor(Math.random()*9)]}'`;
$('#ron-image').prepend(`<img id="main-image" src=${rando} alt="Ron Swanson" />`);

function getRonQuote() {
  fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => {
      alert(errorMessages[Math.floor(Math.random()*5)]);
      console.log(error);
    })
  maxTextWidth = $('#display-module').width() - 20;
}

function newRonQuote() {
  fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
    .then(response => response.json())
    .then(responseJson => {
      quoteVar=responseJson[0];
      refreshCanvas();
    })      
    .catch(error => {
      alert(errorMessages[Math.floor(Math.random()*5)]);
      console.log(error)
    })
  maxTextWidth = $('#display-module').width() - 20;
}

function displayResults(responseJson) {
  quoteVar=responseJson[0];
  getPhoto();
  $('#background-image').show();
}

function getPhoto() {
  photoGrayscale = false;
  photoBlur = false;
  fetch('https://picsum.photos/1200/1200')
    .then(function(response) {
      photoBaseURL = response.url; 
      response.blob()
    .then(responseBlob => 
        displayNewPhoto(responseBlob))
    .catch(error => {
      alert(errorMessages[Math.floor(Math.random()*5)])
      console.log(error);
    })
  });
}

function displayNewPhoto(responseBlob) {
  //if returned image is blank, call for new image
  if (responseBlob.size===0){ 
    getPhoto();
  }
  imgUrl = URL.createObjectURL(responseBlob);
  document.getElementById('background-image').src=imgUrl;
  $('.start-page').hide();
  $('#myCanvas').show();
  displayFinalResultsPage();
  if (firstRun) { 
    $('.carousel-container').hide();
    $('.main-container').append(barHTML);
    firstRun=false;
  };
}

function displayFinalResultsPage() {
  document.getElementById('final-quote').innerHTML = document.getElementById('display-text-p').innerHTML;
  defaultFont();
  $('#display-module').hide();
}

function refreshCanvas() {
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
  // unexpected behavior in firefox and edge make height too small, this corrects that
   ctx.canvas.height = ctx.canvas.width; 

  imageObj.onload = function() {
    ctx.drawImage(imageObj, 0, 0,ctx.canvas.width ,ctx.canvas.height);
    ctx.font = `${fontSize}rem ${fontVar}`;
    ctx.fillStyle = canvasTextColor;
    printAt(ctx, quoteVar, leftMargin, offsetDifference, fontSize * 15, maxTextWidth);
  };
  imageObj.src = imgUrl; 
  if (firstRun) {firefoxCarousel()};
}

function printAt(context , text, x, y, lineHeight, fitWidth) {
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

function firefoxCarousel() {
    //To make carousel work in Firefox when screen size will fit; remove carousel when screen size is too small (Firefox only)
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1 )  {  
      console.log('screen size is '+ $(window).width());
      if ($(window).width() < 620) { 
      $('.carousel-container').hide();
    }else{
      size=600;
      document.getElementById('carousel-slide').style.width="600px";
      document.getElementById('carousel-slide').style.height="605px";
      document.getElementById('carousel-container').style.width="600px";
      $('#next-button').click();
      $('#prev-button').click();
      $('.carousel-container').show();
      }
   }
}

function displayFinalResultsPage() {
  document.getElementById('final-quote').innerHTML = document.getElementById('display-text-p').innerHTML;
  defaultFont();
  $('#display-module').hide();
}

function defaultFont() {
  $('#display-module').removeClass('manly-font');
  $('#display-module').removeClass('liberal-font');
  fontVar='Special Elite';
  refreshCanvas();
}

function manlyFont() {
  $('#display-module').addClass('manly-font');
  $('#display-module').removeClass('liberal-font');
  fontVar='Staatliches';
  refreshCanvas();
}

function liberalFont() {
  $('#display-module').removeClass('manly-font');
  $('#display-module').addClass('liberal-font');
  fontVar = 'Dancing Script';
  refreshCanvas();
}

function toggleGrayscale() {
  if (photoGrayscale) {
    photoGrayscale = false;
  } else {
    photoGrayscale = true;
  };
  reloadPhoto();
  // refreshCanvas();
}

function toggleBlur(idx) {
  if (photoBlur) {
    photoBlur = false;
  } else {
    photoBlur = true;
  };
  reloadPhoto(idx);
  // refreshCanvas();
}

function reloadPhoto(idx) {
  if ((photoGrayscale) && (!photoBlur)) {
    fullUrl = photoBaseURL+'?grayscale'
    document.getElementById('background-image').src=fullUrl;
     // to update save photo
    imgUrl=fullUrl;
  };

  if ((photoGrayscale) && (photoBlur)) {
    fullUrl = photoBaseURL+'?grayscale&blur='+idx;
    document.getElementById('background-image').src=fullUrl;
    // to update save photo
    imgUrl=fullUrl;
  };

  if ((!photoGrayscale) && (!photoBlur)) {
    fullUrl = photoBaseURL
    document.getElementById('background-image').src=fullUrl;
      // to update save photo
    imgUrl=fullUrl;
  };

  if ((!photoGrayscale) && (photoBlur)) {
    fullUrl = photoBaseURL+'?blur='+idx;
    document.getElementById('background-image').src=fullUrl;
     // to update save photo
    imgUrl=fullUrl;
  };
   refreshCanvas();
}


function watchForm() {
  
  $('#home-get-quote').click(event => {
    event.preventDefault();
    getRonQuote();
  });
  
  $('.main-container').on('click', '.change-ron-quote', event => {
    newRonQuote();
    acceptedQuote = document.getElementById('display-text-p').innerHTML;
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
    refreshCanvas();
  })

  $('.use-this-quote').click(event => {
    event.preventDefault();
    getPhoto();
    $('#background-image').show();
  }); 

  $('.main-container').on("click",".new-photo", event => {
    getPhoto();
  });

  $('.main-container').on('click', '.go-home', event => {
    location.reload();
  }); 

  $('.main-container').on('click', '.default-font', event => {
    defaultFont();
  })

  $('.main-container').on('click', '.manly-font', event => {
    manlyFont();
  }); 

  $('.main-container').on('click', '.liberal-font', event => {
    liberalFont();
  }); 

  $('.main-container').on('click', '.grayscale', event=> {
    toggleGrayscale();
  })

  $('.main-container').on('click', '.blur-light', event=> {
    toggleBlur(3);
  })
  
  $('.main-container').on('click', '.blur-heavy', event=> {
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

  $('.main-container').on('click', '.save-pic', event => {
    save2();
  })

  //Small Menu bar -------------------------------------------//
  $('.main-container').on('click', '#nav-icon', event => {
    $('.item').slideToggle();
  })

  $('.main-container').on('click', '#cb-photo-options', event=> {
    $('#quote-options-bar').slideToggle();
    $('#font-options-bar').slideToggle();
    $('#text-position-bar').slideToggle();
    $('#text-options-bar').slideToggle();
    $('#other-bar').slideToggle();
  })

  $('.main-container').on('click', '#cb-quote-options', event=> {
    $('#photo-options-bar').slideToggle();
    $('#font-options-bar').slideToggle();
    $('#text-position-bar').slideToggle();
    $('#text-options-bar').slideToggle();
    $('#other-bar').slideToggle();
  })

  $('.main-container').on('click', '#cb-font-options', event=> {
    $('#photo-options-bar').slideToggle();
    $('#quote-options-bar').slideToggle();
    $('#text-position-bar').slideToggle();
    $('#text-options-bar').slideToggle();
    $('#other-bar').slideToggle();
  })

  $('.main-container').on('click', '#cb-text-position', event=> {
    $('#photo-options-bar').slideToggle();
    $('#quote-options-bar').slideToggle();
    $('#font-options-bar').slideToggle();
    $('#text-options-bar').slideToggle();
    $('#other-bar').slideToggle();
  })

  $('.main-container').on('click', '#cb-text-options', event=> {
    $('#photo-options-bar').slideToggle();
    $('#quote-options-bar').slideToggle();
    $('#font-options-bar').slideToggle();
    $('#text-position-bar').slideToggle();
    $('#other-bar').slideToggle();
  })

  $('.main-container').on('click', '#cb-other', event=> {
    $('#photo-options-bar').slideToggle();
    $('#quote-options-bar').slideToggle();
    $('#font-options-bar').slideToggle();
    $('#text-position-bar').slideToggle();
    $('#text-options-bar').slideToggle();
  })

/* End Menu-------------------------------------*/
}

window.addEventListener("load", () => {
firefoxCarousel();
});

window.addEventListener("resize", () => {
  refreshCanvas1();
  // on resize, the carousel will need reset by reloading page
  if (firstRun) {location.reload();}
});

carouselSlide.addEventListener('transitionend', () => {
  if (carouselImages[imgCounter].id === 'last-clone') {
    carouselSlide.style.transition = "none";
    imgCounter = carouselImages.length - 2;
    carouselSlide.style.transform = 'translateX(' + (-size * imgCounter) + 'px)';
  }
  if (carouselImages[imgCounter].id === 'first-clone') {
    carouselSlide.style.transition = "none";
    imgCounter = carouselImages.length - imgCounter;
    carouselSlide.style.transform = 'translateX(' + (-size * imgCounter) + 'px)';
  }
})
  
nextButton.addEventListener('click', event => {
  if (imgCounter >= carouselImages.length -1) return;
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  imgCounter++;
  carouselSlide.style.transform = 'translateX(' + (-size * imgCounter) + 'px)';
})

prevButton.addEventListener('click', event => {
  if (imgCounter <= 0) return;
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  imgCounter--;
  carouselSlide.style.transform = 'translateX(' + (-size * imgCounter) + 'px)';
})

function refreshCanvas1() {
  fontSize= $('#display-module').width()/300;
  refreshCanvas();
}

function save2() {
  let canvasURL = myCanvas.toDataURL('png');
  let imageElement  = document.createElement('a');
  document.body.appendChild(imageElement);
  imageElement.href = canvasURL;
  imageElement.download = 'Ron_quote_poster.png';
  imageElement.click()
  document.body.removeChild(imageElement)
}

$(function() {
  watchForm();
})

const barHTML = `<!-- Small Menu ------------------------------------------- -->
<div id="small-bar" class="menu-bar hide">

  <input type="checkbox" id="menu"/>
  <label for="menu" id="nav-icon">&#9776; Menu</label>

  <div class="item" id="photo-options-bar">
    <input type="checkbox" id="cb-photo-options"/>
    <label for="cb-photo-options">Picture</label>

      <ul id="photo-options-ul">
        <li class="small-menu-drop"><a href="#"  id="new-photo" class="new-photo">New photo</a></li>
        <li class="small-menu-drop"><a href="#"  id="grayscale" class="grayscale">Grayscale</a></li>
        <li class="small-menu-drop"><a href="#"  id="blur-light" class="blur-light">Light Blur</a></li>
        <li class="small-menu-drop"><a href="#"  id="blur-heavy" class="blur-heavy">Heavy Blur</a></li>
      </ul>
  </div>

  <div class="item" id="quote-options-bar">
    <input type="checkbox" id="cb-quote-options"/>
    <label for="cb-quote-options">Words</label>

      <ul id="quote-options-ul">
        <li class="small-menu-drop"><a href="#"  id="change-ron-quote" class="change-ron-quote">New Ron quote</a></li>
        <li class="small-menu-drop"><a href="#"  id="font-white" class="font-white">In White</a></li>
        <li class="small-menu-drop"><a href="#"  id="font-black" class="font-black">In Black</a></li>
      </ul>
  </div>
    
  <div class="item" id="font-options-bar">
    <input type="checkbox" id="cb-font-options"/>
    <label for="cb-font-options">Style</label>

      <ul id="font-options-ul">
        <li class="small-menu-drop"><a href="#"  id="default-font" class="default-font">Typewriter</a></li>
        <li class="small-menu-drop"><a href="#"  id="manly-font" class="manly-font">Libertarian</a></li>
        <li class="small-menu-drop"><a href="#"  id="liberal-font" class="liberal-font">Hippy</a></li>
      </ul>
  </div>

  <div class="item" id="text-position-bar">
    <input type="checkbox" id="cb-text-position"/>
    <label for="cb-text-position">Placement</label>
 
      <ul id="text-position-ul">
        <li class="small-menu-drop"><a href="#"  id="text-left" class="text-left">Left</a></li>
        <li class="small-menu-drop"><a href="#"  id="text-right" class="text-right">Right</a></li> 
        <li class="small-menu-drop"><a href="#"  id="down-small" class="down-small">Down</a></li>
        <li class="small-menu-drop"><a href="#"  id="down-large" class="down-large">Down More</a></li>
        <li class="small-menu-drop"><a href="#"  id="up-small" class="up-small">Up</a></li>
        <li class="small-menu-drop"><a href="#"  id="up-large" class="up-large">Up More</a></li>
      </ul>
  </div>

  <div class="item" id="text-options-bar">
    <input type="checkbox" id="cb-text-options"/>
    <label for="cb-text-options">Word Options</label>

      <ul id="text-options-ul">
        <li class="small-menu-drop"><a href="#"  id="increase-font" class="increase-font">Bigger</a></li>
        <li class="small-menu-drop"><a href="#"  id="decrease-font" class="decrease-font">Smaller</a></li>
        <li class="small-menu-drop"><a href="#"  id="text-field-narrow" class="text-field-narrow">Narrower</a></li>
        <li class="small-menu-drop"><a href="#"  id="text-field-wide" class="text-field-wide">Wider</a></li> 
        <li class="small-menu-drop"><a href="#"  id="reset-text-width" class="reset-text-width">Reset</a></li>
      </ul>
  </div>    
            
  <div class="item" id="other-bar">
    <input type="checkbox" id="cb-other"/>
    <label for="cb-other">Save</label>    

      <ul id="other-ul">
        <li class="small-menu-drop"><a href="#" class="save-pic">Save Image</a></li>
        <li class="small-menu-drop"><a href="#"  id="go-home" class="go-home">Start Over</a></li>
      </ul>

  </div>
</div>


<!-- Large Menu ---------------------------------- -->

<div id="large-bar" class="l-menu-bar hide">

  <ul>
    <li class="dropdown">
      <a href="javascript:void(0)" class="dropbtn">Picture</a>

          <div id="l-photo-options-ul" class="dropdown-content">
            <a href="#"  id="l-new-photo" class="new-photo">New photo</a>
            <a href="#"  id="l-grayscale" class="grayscale">Grayscale</a>
            <a href="#"  id="l-blur-light" class="blur-light">Light Blur</a>
            <a href="#"  id="l-blur-heavy" class="blur-heavy">Heavy Blur</a>
          </div></li>
  
  
    <li class="dropdown">
      <a href="javascript:void(0)" class="dropbtn">Words</a>

        <div id="l-quote-options-ul" class="dropdown-content">
          <a href="#"  id="l-change-ron-quote" class="change-ron-quote">New Ron Quote</a>
          <a href="#"  id="l-font-white" class="font-white">In White</a>
          <a href="#"  id="l-font-black" class="font-black">In Black</a>
        </div></li>
  
      <li class="dropdown"><a href="javascript:void(0)" class="dropbtn">Style</a>
  
          <div id="l-font-options-ul" class="dropdown-content">
            <a href="#"  id="l-default-font" class="default-font">Typewritter</a>
            <a href="#"  id="l-manly-font" class="manly-font">Libertarian</a>
            <a href="#"  id="l-liberal-font" class="liberal-font">Hippy</a>
          </div></li>
 
      <li class="dropdown"><a href="javascript:void(0)" class="dropbtn">Placement</a>
     
          <div id="l-text-position-ul" class="dropdown-content">
            <a href="#"  id="l-text-left" class="text-left">Left</a>
            <a href="#"  id="l-text-right" class="text-right">Right</a>
            <a href="#"  id="l-down-small" class="down-small">Down</a>
            <a href="#"  id="l-down-large" class="down-large">Down More</a>
            <a href="#"  id="l-up-small" class="up-small">Up</a>
            <a href="#"  id="l-up-large" class="up-large">Up More</a>
          </div></li>
 
      <li class="dropdown"><a href="javascript:void(0)" class="dropbtn">Word Options</a>
    
          <div id="l-text-options-ul" class="dropdown-content">
            <a href="#"  id="l-increase-font" class="increase-font">Bigger</a>
            <a href="#"  id="l-decrease-font" class="decrease-font">Smaller</a>
            <a href="#"  id="l-text-field-narrow" class="text-field-narrow">Narrower</a>
            <a href="#"  id="l-text-field-wide" class="text-field-wide">Wider</a> 
            <a href="#"  id="l-reset-text-width" class="reset-text-width">Reset</a>
          </div></li>
     
      <li class="dropdown"><a href="javascript:void(0)" class="dropbtn">Save</a>
  
            <div id="l-other-ul" class="dropdown-content">
            <a href="#" class="save-pic">Save Image</a>

            <a href="#"  id="l-go-home" class="go-home">Start Over</a>
            </div></li>


  </ul>
</div>`