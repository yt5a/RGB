

function random(min,max){
  num=Math.floor(Math.random()*(max-min))+min
  return num
}

//-----start-----
screen_w = screen.width;
screen_h = screen.height;

can = document.createElement("canvas");
can.setAttribute("id","canvas")
document.body.appendChild(can);

console.log(screen_w,screen_h)

for (var i = 0; i < 30; i++) {
  p_y=0
  p_x=0
  var el=document.createElement("p")
  var text1 = document.createTextNode("");
  el.setAttribute("class","window");
  el.setAttribute("onclick","gets(this)");
  el.style.backgroundImage = "背景.jpg"
  el.appendChild(text1);

  p_y=random(30,screen_h-260)
  p_x=random(0,screen_w-300)
  el.style.top = p_y+'px';
  el.style.left = p_x+'px';
  document.getElementById('main').appendChild(el);

  var rect = el.getBoundingClientRect();//スクロール量
  p_y=Number(parseInt(rect.top,10))
  p_x=rect.left
  el.style.backgroundPosition = Number(-p_x)+'px ' + Number(-p_y)+'px';
  el.style.backgroundSize=screen_w+'px '+screen_h+'px'

  if (i==1||i==2||i==3) {
    el.style.zIndex = 2;
    el.className += ' win';
  }else{
    el.style.zIndex = 1;
  }
}

var path = "背景.jpg";
var element = new Image();
element.src = path ;
element.onload = function () {
		var width = element.naturalWidth ;
		var height = element.naturalHeight ;
    console.log(width,height)
}

function gets(e){
  console.log(e.style.left)
  console.log(e.style.top)
  var left = Number(parseInt(e.style.left,10))
  var top = Number(parseInt(e.style.top,10))


  var path = "背景.jpg";
  var img = new Image();
  img.src = path ;
  img.onload = function () {
    var canvas = document.getElementById("canvas");
    can = canvas.getContext('2d');
    console.log(can)
    can.drawImage(img,left*-1,top*-1,screen_w,screen_h);
    var a = document.createElement('a');
    a.href = canvas.toDataURL('image/png', 0.85);
    console.log(a)
  }
}
