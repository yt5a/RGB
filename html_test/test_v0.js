

function random(min,max){
  num=Math.floor(Math.random()*(max-min))+min
  return num
}

/*
function dom(){
  p_x = p_x
  p_y = p_y+2
  aa = p_x+'px '+p_y+'px'
  target.style.backgroundPosition = aa;
  setTimeout("dom()",100);
}
*/
//-----start-----
screen_w=screen.width
screen_h=screen.height
/*
target=document.getElementById("test");
var rect = target.getBoundingClientRect();
target.style.top=random(30,screen_h-260)+'px';
target.style.left=random(0,screen_w-300)+'px';
var rect = target.getBoundingClientRect();
p_y=Number(parseInt(rect.top,10)-30)
p_x=rect.left
aa=p_y-200+'px '+ p_x+840+'px '
target.innerHTML='<div>h:'+p_y+",w:"+p_x+'</div>'
target.style.backgroundPosition = aa;
target.style.backgroundSize=screen_w+'px '+screen_h+'px'
*/


//setTimeout("dom()",100);
//target.innerHTML='<button type="button" name="button">あああ</button>'
//target.innerHTML='<iframe src="http://www.shurey.com/js/samples/0_bsc4.html"width="auto" height="auto"></iframe>'
//target.style.background="#dcdcdc";
/*
const el=document.createElement("p")
const text1 = document.createTextNode("テスト");
el.setAttribute("class","window");
el.appendChild(text1);
var rect = el.getBoundingClientRect();
p_y=Number(parseInt(rect.top,10)-30)
p_x=rect.left
aa=p_y-200+'px '+ p_x+840+'px '
el.style.backgroundPosition = aa;
el.style.backgroundSize=screen_w+'px '+screen_h+'px'
kkk.appendChild(el);
*/
for (var i = 0; i < 30; i++) {
  p_y=0
  p_x=0
  var el=document.createElement("p")
  var text1 = document.createTextNode("");
  el.setAttribute("class","window");
  //el
  el.appendChild(text1);
  p_y=random(30,screen_h-260)
  p_x=random(0,screen_w-300)
  el.style.top=p_y+'px';
  el.style.left=p_x+'px';
  kkk.appendChild(el);

  var rect = el.getBoundingClientRect();
  p_y=Number(parseInt(rect.top,10)-30)
  p_x=rect.left
  aa=Number(-p_x)+'px ' + Number(-p_y)+'px '
  el.style.backgroundPosition = aa;
  el.style.backgroundSize=screen_w+'px '+screen_h+'px'

  if (i==1||i==2||i==3) {
    el.style.zIndex = 2;
    el.className += ' win';
  }else{
    el.style.zIndex = 1;
  }
}
