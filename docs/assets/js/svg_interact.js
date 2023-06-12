var svg = document.getElementById('map-svg');
var input = document.getElementById('map-scale');

input.addEventListener('input', zoom_scalar(this.value));

function zoom_scalar(scale){
    var newScale = "scale(" + scale + ")";
    matrixGroup.setAttributeNS(null, "transform", newScale);
    var sub1 = document.getElementsByClassName('substructure');
    if(scale<1.2){
        for(i=0;i<sub1.length;i++){
          sub1[i].style.opacity = '0';
           }
      }
    else if(scale>=1.2){
        for(i=0;i<sub1.length;i++){
           sub1[i].style.opacity = '.5';
        }
    }
    else{
      for(i=0;i<sub1.length;i++){
         sub1[i].style.opacity = '.8';
        }
    }
}
// from https://codepen.io/Mamboleoo/pen/WzqmoY

if (window.PointerEvent) {
  svg.addEventListener('pointerdown', onPointerDown);
  svg.addEventListener('pointerup', onPointerUp); 
  svg.addEventListener('pointerleave', onPointerUp); 
  svg.addEventListener('pointermove', onPointerMove); 
} 
else {
  svg.addEventListener('mousedown', onPointerDown);
  svg.addEventListener('mouseup', onPointerUp);
  svg.addEventListener('mouseleave', onPointerUp);
  svg.addEventListener('mousemove', onPointerMove);

  svg.addEventListener('touchstart', onPointerDown); 
  svg.addEventListener('touchend', onPointerUp);
  svg.addEventListener('touchmove', onPointerMove);
}
var point = svg.createSVGPoint();

function getPointFromEvent (event) {
  if (event.targetTouches) {
    point.x = event.targetTouches[0].clientX;
    point.y = event.targetTouches[0].clientY;
  } 
  else {
    point.x = event.clientX;
    point.y = event.clientY;
  }
  var invertedSVGMatrix = svg.getScreenCTM().inverse();
return point.matrixTransform(invertedSVGMatrix);
}

                     
var isPointerDown = false;
var pointerOrigin;

                     
function onPointerDown(event) {
   isPointerDown = true;
   pointerOrigin = getPointFromEvent(event);
}
var viewBox = svg.viewBox.baseVal;
                     
function onPointerMove (event) {
  if (!isPointerDown) {
    return;
  }
  event.preventDefault();
  var pointerPosition = getPointFromEvent(event);
  viewBox.x -= (pointerPosition.x - pointerOrigin.x);
  viewBox.y -= (pointerPosition.y - pointerOrigin.y);
}

function onPointerUp() {
  isPointerDown = false;
}
