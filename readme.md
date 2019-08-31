<a href="https://ron-swanson-motivational-poster-generator.netlify.com"><img src="https://i.imgur.com/pn6j4r0.jpg" title="Ron Swanson Motavational Poster Generator" alt="Ron Swanson Motavational Poster Generator"></a>

***Ron Swanson***

# [_The Ron Swanson Motivational Poster Generator_](https://ron-swanson-motivational-poster-generator.netlify.com/#)
# [_Live link_](https://ron-swanson-motivational-poster-generator.netlify.com/#)

> A front side web application that combines random quotes from America's favorite curmedgeon with a random picture to create a special inspirational picture you can save.

> Ron Swanson is a fictional character from the American TV series [_Parks and Rec_.](https://www.nbc.com/parks-and-recreation)


[![Netlify Status](https://api.netlify.com/api/v1/badges/be4739e9-2c31-45fa-9916-d098808295d9/deploy-status)](https://app.netlify.com/sites/ron-swanson-motivational-poster-generator/deploys) 

***How it works***

Two third party API's are used to generate the content
- First, https://ron-swanson-quotes.herokuapp.com/v2/quotes is used to get a random Ron Swanson quote.
- Then Lorem Picsum is used to generate a random photo
- Additional calls to Lorem Picsum can be made to apply a grayscale or blur effect

![Recordit GIF](http://recordit.co/KdvESMWW0M.gif)

- After styling and customization are complete, the image can be saved to the device.

![Recordit GIF](https://recordit.co/0r7jVbPyeS.gif)

> Technology Used

- HTML, CSS, Javascript, JQuery
- HTML5 Canvas is used to enable saving to computer as an image file


> Features

- HTML5 Canvas - In order to make the final image available to save using only front end tools, this app used HTML5 canvas to 'paint' the picture and quote
```
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
```
![Canvas](https://i.imgur.com/s8E1mcL.png)   
- Recursion - In order to keep the quote from running off the canvas, a recursive function is used to paint a line of quote, and drop to a new line when it runs off the canvas   
```
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
```

![Recursion](https://i.imgur.com/zPTPclm.png)   

---

## API Reference
- https://github.com/jamesseanwright/ron-swanson-quotes
- https://picsum.photos/

---

### Clone

- Clone this repo to your local machine using `https://github.com/Mtn-Drew/ron-quote.git`


```

