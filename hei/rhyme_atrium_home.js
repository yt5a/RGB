(window.onload = function() {

//タイトル画面----------------------------------------------------------------------

model=　window.innerWidth >= 1000;
console.log(model,window.innerWidth)
bcol = 'rgb(122,122,122)'

//title_logo
//var title_text="RHYME ATRIUM(in blank_shape)"
var title_text="Blank Shape"
console.log(document.getElementById('title_word'))
for (const i in title_text){
  console.log(title_text.length)
  var tx = document.createElement("span");
  tx.innerHTML=title_text.charAt(i)
  document.getElementById('title_word').appendChild(tx);
}

//document.getElementById("title_logo").setAttribute("onclick",
document.getElementById("title_logo").addEventListener('click',
  function(){setTimeout("select_set()",500)}
//"select_set()"
  );
});

//メニュー画面----------------------------------------------------------------------
function select_set(){
  bcol = 'rgb(122,122,122)'
  //mainの初期化
  document.getElementById('main').innerHTML = ""
  document.getElementById('option1').innerHTML = ""
  //設定ポップの設置
  var pop_out = Object.assign(document.createElement("div"),{id:"pop_out",classList:"pop_hide"})
  pop_out.addEventListener('click', function(e){
    if(!e.target.closest('.pop_child')) {
      document.getElementById('pop_out').classList.add("pop_hide");
      document.getElementById('pop_out').classList.remove("pop_in");
      document.getElementById('pop_out').innerHTML = ""
    }
  })
  //document.getElementById('option1').appendChild(pop_out);
  document.body.appendChild(pop_out);

  //------------------------------
  var select = document.createElement("div")

  var label = Object.assign(document.createElement("label"),{className:'select_after'})
  var cont_1 = Object.assign(document.createElement("input"),{type:"button",value:"新規作成 / NEW CREATE",className:'select_btn'})
  //cont_1.addEventListener('click', function(){pop_set(setting()[1])})
  cont_1.addEventListener('click', function(){pop_set({data:[]})})
  label.appendChild(cont_1);
  select.appendChild(label);
  //------------------------------
  var label = Object.assign(document.createElement("label"),{className:'select_after'})
  var cont_2 = Object.assign(document.createElement("input"),{type:"button",value:"作品一覧 / ART_WORK",className:'select_btn'})
  //cont_1.addEventListener('click', function(){pop_set(setting()[1])})
  cont_2.addEventListener('click', function(){mode_select()})
  label.appendChild(cont_2);
  select.appendChild(label);
  //------------------------------
  var label = Object.assign(document.createElement("label"),{className:'select_after'})
  var cont_3 = Object.assign(document.createElement("input"),{type:"button",value:"ヒント / Tips",className:'select_btn'})
  //cont_1.addEventListener('click', function(){pop_set(setting()[1])})
  cont_3.addEventListener('click', function(){tips_set(0)})
  label.appendChild(cont_3);
  select.appendChild(label);

  document.getElementById('main').appendChild(select);
}

//pop_set----------------------------------------------------------------------
function pop_set(data){
  //
  document.getElementById('pop_out').classList.add("pop_in");
  document.getElementById('pop_out').classList.remove("pop_hide");
  document.getElementById('pop_out').innerHTML = ""
  //
  var form = Object.assign(document.createElement("form"),{className:"sampleForm"})
  document.getElementById('pop_out').appendChild(form);
  //pop_out
  //img-----
  var inp = document.createElement("img")
  inp.classList.add("pop_child");
  inp.setAttribute("src",canvas_img(data,0))
  //inp.addEventListener('click', function(){draw_set(data)})
  document.getElementsByClassName('sampleForm')[0].appendChild(inp)


  //option-----
  var dot = document.createElement("div")
  dot.classList.add("pop_child");

  //rgb
  console.log(bcol)
  var rgb = ['rgb(255,0,0)','rgb(0,255,0)','rgb(0,0,255)']
  var col = bcol.match(/\d+/g)
  for (var i = 0; i < col.length; i++) {
    var sli = Object.assign(document.createElement("input"),
    {type:"range",classList:"color_set",name:i,min:"0",max:"255",step:"1",value:col[i]})
    sli.style.backgroundColor=rgb[i]
    sli.addEventListener("input",function(e){
      col[this.name]=this.value
      bcol=bcol.replace(/\((.+)\)/,'('+col.join(',')+')')
      var inp = document.getElementsByClassName('pop_child')[0]
      inp.setAttribute("src",canvas_img(data,0))
    });

    dot.appendChild(sli);
  }
  dot.appendChild(document.createElement("br"))
  //plays
  var butt = Object.assign(document.createElement("input"),{type:"button",value:"START"})
  butt.style.width = "50%"
  butt.style.height = "30px"
  butt.addEventListener('click', function(){
    document.getElementById('pop_out').classList.add("pop_hide");
    document.getElementById('pop_out').classList.remove("pop_in");
    document.getElementById('pop_out').innerHTML = ""
    draw_set(data)
  })
  dot.appendChild(butt);

  document.getElementsByClassName('sampleForm')[0].appendChild(dot)
}


function tips_set(n){
  var tip = tips_get()[n]
  console.log(tip)
  //
  document.getElementById('pop_out').classList.add("pop_in");
  document.getElementById('pop_out').classList.remove("pop_hide");
  document.getElementById('pop_out').innerHTML = ""
  //
  var form = Object.assign(document.createElement("form"),{className:"sampleForm"})
  document.getElementById('pop_out').appendChild(form);

  //img-----
  var inp = document.createElement("img")
  const image = new Image();
  image.src = tip.img;
  image.onload = () => {
    inp.style.width = window.innerWidth/2
    inp.style.height = (image.height/image.width)*window.innerWidth/2
  console.log(image.width,image.height)
  }
  //inp.classList.add("pop_child");
  inp.setAttribute("src",tip.img)
  inp.classList.add("pop_child");
  inp.style.width = '50%'
  inp.style.height = '50%'
  //inp.addEventListener('click', function(){draw_set(data)})
  document.getElementsByClassName('sampleForm')[0].appendChild(inp)

  //option-----
  var dot = document.createElement("div")
  dot.classList.add("pop_child");

  dot.appendChild(document.createElement("br"))
  //plays
  for (var i = 0; i < tips_get().length; i++) {
  var butt = Object.assign(document.createElement("input"),{type:"button",value:i})
  butt.addEventListener('click', function(){tips_set(this.value)})
  dot.appendChild(butt);
  }
  dot.appendChild(document.createElement("br"))
  var txtt = document.createElement("h1")
  txtt.innerHTML = tip.title
  dot.appendChild(txtt)
  var txtt = document.createElement("div")
  txtt.innerHTML = tip.data
  txtt.style.margin = "2px";
  dot.appendChild(txtt)

  document.getElementsByClassName('sampleForm')[0].appendChild(dot)
}

function save_pop(data){
  //
  document.getElementById('pop_out').classList.add("pop_in");
  document.getElementById('pop_out').classList.remove("pop_hide");
  document.getElementById('pop_out').innerHTML = ""
  //
  var form = Object.assign(document.createElement("form"),{className:"sampleForm"})
  document.getElementById('pop_out').appendChild(form);
  document.getElementById('pop_out').onclick = function() {
    drawing()
  }
  //pop_out
  //img-----
  var inp = document.createElement("img")
  inp.classList.add("pop_child");
  inp.setAttribute("src",canvas_img(data,0))
  //inp.addEventListener('click', function(){draw_set(data)})
  document.getElementsByClassName('sampleForm')[0].appendChild(inp)


  //option-----
  var dot = document.createElement("div")
  dot.classList.add("pop_child");

  //rgb
  console.log(bcol)
  var rgb = ['rgb(255,0,0)','rgb(0,255,0)','rgb(0,0,255)']
  var col = bcol.match(/\d+/g)
  for (var i = 0; i < col.length; i++) {
    var sli = Object.assign(document.createElement("input"),
    {type:"range",classList:"color_set",name:i,min:"0",max:"255",step:"1",value:col[i]})
    sli.style.backgroundColor=rgb[i]
    sli.addEventListener("input",function(e){
      col[this.name]=this.value
      bcol=bcol.replace(/\((.+)\)/,'('+col.join(',')+')')
      back_set=bcol
      var inp = document.getElementsByClassName('pop_child')[0]
      inp.setAttribute("src",canvas_img(data,0))
    });

    dot.appendChild(sli);
  }
  dot.appendChild(document.createElement("br"))
  //plays
  var butt = Object.assign(document.createElement("input"),{type:"button",value:"SAVE"})
  butt.style.width = "50%"
  butt.style.height = "30px"
  butt.addEventListener('click', function(){
    document.getElementById('pop_out').classList.add("pop_hide");
    document.getElementById('pop_out').classList.remove("pop_in");
    document.getElementById('pop_out').innerHTML = ""
    cat=-1
    drawing()
    var can = document.getElementById("canvas");
  	var a = document.createElement('a');
  	a.href = canvas.toDataURL('image/png', 0.85);
  	a.download = 'download.png';
  	a.click()
    cat=dog
    drawing()
    console.log(sel_path)
    //localStorage.setItem('img',JSON.stringify({data:{path:[sel_path],bcol:rgbTo16(bcol)}]));
    var get_yet = JSON.parse(localStorage.getItem('img'))
    if (get_yet instanceof Array == false) {
      localStorage.setItem('img',[JSON.stringify(
        {data:sel_path,bcol:bcol})]);
    }else{
      get_yet = get_yet.push(JSON.stringify(
        {data:sel_path,bcol:bcol}))
      localStorage.setItem('img',get_yet);
    }
    alert('画像が保存されました。')
    //draw_set(data)
  })
  dot.appendChild(butt);

  document.getElementsByClassName('sampleForm')[0].appendChild(dot)
  /*canvas.width = width;
  canvas.height = height;
  pcanvas.width = width
  pcanvas.height = height;
  mcanvas.width = width;
  mcanvas.height = height;*/
}

//mode_select----------------------------------------------------------------------
function mode_select(){
  /*
  document.getElementById('main').innerHTML = ""
  //var mode=['album_mode()','poster_mode()']
  var mode=['album_mode()']

  var cont_1 = Object.assign(document.createElement("input"),{type:"button",value:"HOME",className:'select_btn'})
  //cont_1.addEventListener('click', function(){pop_set(setting()[1])})
  cont_1.addEventListener('click', function(){select_set()})
  document.getElementById('main').appendChild(cont_1);
  for (var i = 0; i < mode.length; i++) {
    var inp = document.createElement("img")
    inp.setAttribute("width","200")
    inp.setAttribute("height","200")
    //inp.setAttribute("onclick","draw_set()");
    inp.setAttribute("src",'インターフィールド.png')
    inp.setAttribute("onclick",mode[i]);
    document.getElementById('main').appendChild(inp);
  }
  */
  album_mode()
}

function album_mode(){
  document.getElementById('main').innerHTML = ""

  var ddiv = document.createElement("div")

  var label = Object.assign(document.createElement("label"),{className:'select_after'})
  var cont_1 = Object.assign(document.createElement("input"),{type:"button",value:"HOME",className:'select_btn'})
  cont_1.addEventListener('click', function(){select_set()})
  label.appendChild(cont_1);
  ddiv.appendChild(label);

  var div = document.createElement("div")
  for (var i = 0; i < setting().length; i++) {
    var inp = Object.assign(document.createElement("img"),{className:'photo_',name:i})
    bcol=setting()[i].bcol
    inp.setAttribute("src",canvas_img(setting()[i],0))
    inp.addEventListener('click', function(){bcol=setting()[this.name].bcol;pop_set(setting()[this.name])})
    //inp.addEventListener('click', function(){bcol=setting()[this.name].bcol;view_mode(setting()[this.name])})
    //inp.addEventListener('click', function(){draw_set(data)})
  div.appendChild(inp)
  ddiv.appendChild(div)
  }
  document.getElementById('main').appendChild(ddiv)
}

/*function view_mode(date){
  view_part = 0
  //view_set()
  function view_set(date){
    bcol=date.bcol;
    document.getElementById('view_rt').innerHTML = ""

    if (view_part == 0) {
      var inp = Object.assign(document.createElement("img"),{className:''})
      inp.setAttribute("src",canvas_img(date,1))
    }else if(view_part == 1){
      var inp = Object.assign(document.createElement("img"),{className:''})
      inp.setAttribute("src",canvas_img(date,0))
    }else if(view_part == 2){
      var inp = Object.assign(document.createElement("img"),{className:''})
      inp.setAttribute("src",canvas_img(date,0))
    }

    document.getElementById('view_rt').appendChild(inp)
  }

  document.getElementById('main').innerHTML = ""

  var port = Object.assign(document.createElement("div"),{id:'view_port'})
  var port_l = Object.assign(document.createElement("div"),{id:'view_left'})
  var port_r = Object.assign(document.createElement("div"),{id:'view_right'})
  var port_rt = Object.assign(document.createElement("div"),{id:'view_rt'})
  var port_rb = Object.assign(document.createElement("div"),{id:'view_rb'})
  port.appendChild(port_l)
  port_r.appendChild(port_rt)
  port_r.appendChild(port_rb)
  port.appendChild(port_r)
  document.getElementById('main').appendChild(port)

  var ddiv = document.createElement("div")

  var cont_1 = Object.assign(document.createElement("input"),{type:"button",value:"HOME"})
  cont_1.addEventListener('click', function(){album_mode()})
  ddiv.appendChild(cont_1);

  var tags = ['album','icon','logo']
  for (var i = 0; i < tags.length; i++) {
    var cont_1 = Object.assign(document.createElement("input"),{type:"button",value:tags[i],name:i})
    cont_1.addEventListener('click', function(){view_part=this.name;view_set(date)})
    ddiv.appendChild(cont_1);
  }
  /*var inp = Object.assign(document.createElement("img"),{className:'photo_'})
  inp.setAttribute("src",canvas_img(date,1))
  ddiv.appendChild(inp)

  document.getElementById('view_left').appendChild(ddiv)

  var cont_1 = Object.assign(document.createElement("input"),{type:"button",value:"HOME"})
  cont_1.addEventListener('click', function(){pop_set(date)})
  document.getElementById('view_rb').appendChild(cont_1);

  view_set(date)
}*/


//メイン画面----------------------------------------------------------------------
function draw_set(n){
  var main = document.getElementById('main')
  main.innerHTML=""
  document.getElementById('option1').innerHTML = ""
  //<div id='layers'>
  var left_opt = document.createElement("div");
  var lay_set = document.createElement("div");
  var indent = document.createElement("div");
  var canva = document.createElement("div");
  //indent.setAttribute("style","position:fixed;bottom:0;");
  lay_set.setAttribute("id","layers");
  canva.setAttribute("id","canvasBack");
  left_opt.setAttribute("id","left_option");
  indent.setAttribute("id","indent");
  left_opt.appendChild(lay_set);
  left_opt.appendChild(indent);
  main.appendChild(left_opt);
  main.appendChild(canva);

  //camvas
  var canvas_option = document.createElement("div");
  canvas_option.setAttribute("id","canvas_option");
  var mcav = document.createElement("canvas");
  mcav.setAttribute("id","mouse_canvas");
  mcav.setAttribute("class","canvas");
  var pcav = document.createElement("canvas");
  pcav.setAttribute("id","pic_canvas");
  pcav.setAttribute("class","canvas");
  var cav = document.createElement("canvas");
  cav.setAttribute("id","canvas");
  cav.setAttribute("class","canvas");
  document.getElementById('canvasBack').appendChild(mcav)
  document.getElementById('canvasBack').appendChild(pcav)
  document.getElementById('canvasBack').appendChild(cav)
  /*document.getElementById('canvasBack').appendChild(canvas_option)
  document.getElementById('canvasBack').onscroll = function(){
    var pix = this.scrollHeight - this.offsetHeight
    if (pix/3 <=this.scrollTop) {
      this.scrollBy(0,pix);
    }else if(pix/3*2 >=this.scrollTop){
      this.scrollTo(0,0);
    }
  }*/
  /*
  var mode = document.createElement("input");
  mode.setAttribute("type","radio");
  mode.setAttribute("name","mode");
  mode.setAttribute("id","mode_0");
  mode.setAttribute("value","0");
  mode.setAttribute("checked","");
  var lab = document.createElement("label");
  lab.setAttribute("for","mode_0");
  lab.setAttribute("class","mode");
  var imag = document.createElement("img");
  imag.setAttribute("src","マイ鉛筆.png");
  lab.appendChild(imag);
  //mode.textContent="編集"
  document.getElementById('option1').appendChild(mode);
  document.getElementById('option1').appendChild(lab);

  mode = document.createElement("input");
  mode.setAttribute("type","radio");
  mode.setAttribute("name","mode");
  mode.setAttribute("id","mode_1");
  mode.setAttribute("value","1");
  lab = document.createElement("label");
  lab.setAttribute("for","mode_1");
  lab.setAttribute("class","mode");
  var imag = document.createElement("img");
  imag.setAttribute("src","マイ消しゴム.png");
  lab.appendChild(imag);
  //mode.textContent="消しゴム"
  document.getElementById('option1').appendChild(mode);
  document.getElementById('option1').appendChild(lab);
  */
  var mode = document.createElement("input");
  mode.setAttribute("type","button");
  mode.setAttribute("id","home_0");
  mode.addEventListener("click",function(){
    var rr = window.confirm('保存されていない場合編集データは消去されます。\n編集を終了しますか？');
    if (rr == true) {
      select_set()
    }
  });

  mode.style.display = "none"
  var lab = document.createElement("label");
  lab.setAttribute("for","home_0");
  lab.setAttribute("class","mode");
  lab.innerHTML = "終了"
  //mode.textContent="編集"
  document.getElementById('option1').appendChild(mode);
  document.getElementById('option1').appendChild(lab);

  mode = document.createElement("input");
  mode.setAttribute("type","radio");
  mode.setAttribute("name","mode");
  mode.setAttribute("id","mode_0");
  mode.setAttribute("value","0");
  mode.setAttribute("checked","");
  var lab = document.createElement("label");
  lab.setAttribute("for","mode_0");
  lab.setAttribute("class","mode");
  lab.innerHTML = "編集"
  //mode.textContent="編集"
  document.getElementById('option1').appendChild(mode);
  document.getElementById('option1').appendChild(lab);

  mode = document.createElement("input");
  mode.setAttribute("type","radio");
  mode.setAttribute("name","mode");
  mode.setAttribute("id","mode_1");
  mode.setAttribute("value","1");
  lab = document.createElement("label");
  lab.setAttribute("for","mode_1");
  lab.setAttribute("class","mode");
  lab.innerHTML = "消しゴム"
  //mode.textContent="消しゴム"
  document.getElementById('option1').appendChild(mode);
  document.getElementById('option1').appendChild(lab);
  //-----
  //var sli = Object.assign(document.createElement("input"),{
  var slitx = document.createElement("span");
  slitx.innerHTML = "マウスの大きさ："
  slitx.style.fontWeight = "bold";
  slitx.setAttribute("class","moded");
  document.getElementById('option1').appendChild(slitx);
  var sli = document.createElement("input");
  sli.setAttribute("id","mouse_slide");
  sli.setAttribute("type","range");
  sli.setAttribute("name","range-1");
  sli.setAttribute("value","0");
  sli.setAttribute("min","10");
  sli.setAttribute("max","50");
  sli.setAttribute("step","1");
  sli.addEventListener("input",mouse_sizes);
  slitx.appendChild(sli);
  document.getElementById('option1').appendChild(slitx);
  //document.getElementById('mouse_slide').addEventListener('input', mouse_sizes)
  var col = document.createElement("input");
  col.setAttribute("type","color");
  col.setAttribute("id","colors");
  col.setAttribute("value","#000000");
  col.style.display = "none"
  document.getElementById('option1').appendChild(col);



  var mode = document.createElement("input");
  mode.setAttribute("type","button");
  mode.setAttribute("id","save_0");
  mode.addEventListener("click",function(){
    save_pop({data:sel_path,bcol:bcol})
  });

  mode.style.display = "none"
  var lab = document.createElement("label");
  lab.setAttribute("for","save_0");
  lab.setAttribute("class","mode");
  lab.innerHTML = "背景色・保存"
  //mode.textContent="編集"
  document.getElementById('option1').appendChild(mode);
  document.getElementById('option1').appendChild(lab);

  /*var save = document.createElement("input")
  save.setAttribute("type","button")
  save.setAttribute("value","背景色・保存")
  save.addEventListener('click', function(){
    save_pop({data:sel_path,bcol:bcol})
    /*
    cat=-1
    drawing()
    var can = document.getElementById("canvas");
  	var a = document.createElement('a');
  	a.href = canvas.toDataURL('image/png', 0.85);
  	a.download = 'download.png';
  	a.click()
    cat=dog
    drawing()
    console.log(sel_path)
    //localStorage.setItem('img',JSON.stringify({data:{path:[sel_path],bcol:rgbTo16(bcol)}]));
    var get_yet = JSON.parse(localStorage.getItem('img'))
    if (typeof get_yet.length == "undefined") {
      localStorage.setItem('img',[JSON.stringify(
        {data:sel_path,bcol:bcol})]);
    }else{
      get_yet = get_yet.push(JSON.stringify(
        {data:sel_path,bcol:bcol}))
      localStorage.setItem('img',get_yet);
    }*/



    //console.log(JSON.parse(localStorage.getItem('img')).length)
    /*if (typeof JSON.parse(localStorage.getItem('img')).length == "undefined") {
      console.log("BAN")
    }else{
      console.log("success")
    }*/
  /*})
  document.getElementById('option1').appendChild(save);*/

  //canvas_opthion
  /*
  var canop = document.createElement("input")
  canop.setAttribute("type","button")
  canop.setAttribute("value","SAVE")
  canop.addEventListener('click', function(){
    this.value = Math.random().toString(32).substring(2)
    var ccc = back_set[0]
    back_set[0] = back_set[1]
    back_set[1] = ccc
  })
  document.getElementById('canvas_option').appendChild(canop);
  */

  reload(n)
}
//<label><input type="radio" name="layer" value=0 onchange="on_layer()" checked>レイヤー1</label>
//<label><input type="radio" name="layer" value=1 onchange="on_layer()" >レイヤー2</label>
function layer_event(div){
  div.addEventListener('mousedown',function(){
    var id=this.parentElement.getAttribute('id')
    var pac=this.parentElement.children//
    var bnum = 0
    num = [].slice.call(pac).indexOf(this)

    //ホールド状態かどうか
    var clas=document.getElementsByClassName('drag')
    if (clas.length>=1) {
      //document.getElementById("delete_layer").remove()
      for (var i = 0; i < clas.length; i++) {
        clas.item(i).remove()
      }
      var opa_class =document.getElementsByClassName('drag_now')
      for (var ii = 0; ii < opa_class.length; ii++) {
        opa_class.item(ii).classList.remove("drag_now");
      }
      document.body.removeAttribute("mousemove");
      layer_shuffle(bnum,num)
      layer_join()
    }else{//ホールド状態では無い場合

    //一定時間長押し
  /*  this.value=setTimeout(function(){
      layer_dlete()
      var get = document.getElementById(id).children[num]
      c=get.children[1].cloneNode(true)
      c.setAttribute('class','drag');
      c.removeAttribute("mousedown");
      c.removeAttribute('value');
      document.getElementById('left_option').appendChild(c);
      //マウスに追従
      document.body.addEventListener("mousemove",function(e){
        var clas=document.getElementsByClassName("drag")
        if (clas.length>=1) {
          for (var i = 1; i < clas.length; i++) {
            clas.item(i).remove()
          }
          drag = document.getElementsByClassName("drag")[0];
          drag.style.top = e.clientY - 30 + "px";
        }
      }, false);
      //長押しされたレイヤーのCSS
      get.classList.add("drag_now");
    },1000)//10秒間*/
    }
  },false);

  //一定時間内にボタンを離した場合
  div.addEventListener('click',function(){
    clearInterval(this.value);
  });
  //一定時間内にボタンからカーソルを外した場合
  div.addEventListener('mouseleave',function(){
    clearInterval(this.value);
  })

  return div
}


function layer_sel(i){
  var id = Math.random().toString(32).substring(2)

  //input
  var input = document.createElement("input");
  input.setAttribute("type","radio");
  input.setAttribute("name","layer");
  input.setAttribute("class","layers");
  input.setAttribute("value",i);
  input.setAttribute("id",id);
  //input.setAttribute("onchange","on_layer()");
  input.setAttribute("onclick","on_layer()");
  input.setAttribute("display","none");
  input.setAttribute("style","display:none")
  if (i==0) {
    input.setAttribute("checked",true);
  }
  //label
  var lab = document.createElement("label");
  lab.setAttribute("for",id);
  lab.setAttribute("name",'layer_col');
  lab.setAttribute("class","layer");
  //lab.style.backgroundColor=sel_path[i].col
  if (sel_path[i]) {
   lab.style.backgroundColor=sel_path[i].col
  }else{
   //lab.style.backgroundColor='#'+['00','00'].splice(Math.floor(Math.random()*3),0,'ff').join("");
   lab.style.backgroundColor=document.getElementById('colors').value
  }
  lab.style.color='#000000'
  //set
  var div = document.createElement("div");
  div.appendChild(input)
  div.appendChild(lab)

  /*event*/
  div=layer_event(div)

  var dac = Object.assign(document.createElement("div"),{classList:"layer_tag"})
  dac.addEventListener("mouseover",function(e){
    console.log(this.children[0].children[0].value)
    line_to(sel_path[this.children[0].children[0].value].path)
  })
  dac.appendChild(div);

  var cdiv = document.createElement("div")
  //piuouppppppp
  var label = Object.assign(document.createElement("label"),{className:'lay_btn'})
  var dell = Object.assign(document.createElement("input"),{type:"button",value:"削除"})
  //cont_1.addEventListener('click', function(){pop_set(setting()[1])})
  dell.addEventListener('click', function(){
    var pac=this.parentElement.parentElement.parentElement//
    num = [].slice.call(pac.parentElement.children).indexOf(pac);
    console.log(num)

    save_path.push(gets_path())
    save_log = []

    document.getElementById("layers").children[num].remove()
    this.remove()
    layer_pop(num)
  })//this.parentElement
  label.appendChild(dell);
  cdiv.appendChild(label);

  var label = Object.assign(document.createElement("label"),{className:'lay_btn'})
  var coll = Object.assign(document.createElement("input"),{type:"button",value:"変色"})
  coll.addEventListener('click', function(){
    //document.getElementById('colors').click();
    //var pac=this.parentElement.parentElement.parentElement//
    //num = [].slice.call(pac.parentElement.children).indexOf(pac);
    //console.log(this.parentElement.parentElement.parentElement.children[0].children[1])
    //color
    this.parentElement.parentElement.children[2].click();
  })

  label.appendChild(coll);
  cdiv.appendChild(label);

  var colll = Object.assign(document.createElement("input"),{type:"color"})
  colll.style.display = 'none'
  colll.addEventListener('input', function(){
    var pac=this.parentElement.parentElement//
    num = [].slice.call(pac.parentElement.children).indexOf(pac);
    var get = document.getElementsByClassName('layer_tag').item(num)
    get.children[0].children[1].style.backgroundColor=this.value
    sel_path[num].col=this.value;
    /*
    console.log(num)
    console.log(this.parentElement.parentElement)
    this.parentElement.parentElement.parentElement.children[0].children[0].children[1].style.backgroundColor=this.value
    sel_path[num].col=this.value;
    //document.getElementsByName('layer_col').item(col_set-1).style.backgroundColor=this.value
    //sel_path[col_set-1].col=this.value;*/
    pic_draw()
    put_draw()
    drawing()
  })
  cdiv.appendChild(colll);


  dac.appendChild(cdiv);


  document.getElementById('layers').appendChild(dac);
}

function layer_set(li){
  var n=li.length
  for (var i = 0; i < n; i++) {
    layer_sel(i)
  }
  layer_join()
}

function layer_join(){
  document.getElementById('indent').innerHTML=""
  var lab = document.createElement("label");
  lab.setAttribute("name",'layer_col');
  lab.setAttribute("class","lay");
  lab.style.backgroundColor='#ff7f7f';
  lab.style.color='#ffeeee'
  var imag = document.createElement("img");
  imag.setAttribute("src","プラス.png");
  imag.setAttribute("width","50px");
  imag.setAttribute("height","50px");
  lab.appendChild(imag);
  //set
  var div = document.createElement("div");
  div.appendChild(lab)
  div.addEventListener('mousedown',function(){
    //save
    save_path.push(gets_path())
    save_log = []

    layer_sel(sel_path.length)
    layer_push()
  })
  //document.getElementById('indent').appendChild(div)
  document.getElementById('indent').appendChild(div)
}

/*
function layer_dlete(){
  document.getElementById('indent').innerHTML=""
  var lab = document.createElement("label");
  lab.setAttribute("name",'layer_col');
  lab.setAttribute("class","layer");
  lab.style.backgroundColor='#afeeee';
  lab.style.color='#afeeee'
  var imag = document.createElement("img");
  imag.setAttribute("src","マイナス.png");
  lab.appendChild(imag);
  //set
  var div = document.createElement("div");
  div.appendChild(lab)
  div.addEventListener('mousedown',function(){
    //save
    save_path.push(gets_path())
    save_log = []

    var opa_class =document.getElementsByClassName('drag_now')
    for (var ii = 0; ii < opa_class.length; ii++) {
      opa_class.item(ii).classList.remove("drag_now");
    }
    var clas=document.getElementsByClassName('drag')
    for (var i = 0; i < clas.length; i++) {
      clas.item(i).remove()
    }
    document.getElementById("layers").children[num].remove()

    document.body.removeAttribute("mousemove");
    this.remove()
    layer_pop(num)
    layer_join()
  })

  document.getElementById('indent').appendChild(div)
}
*/
