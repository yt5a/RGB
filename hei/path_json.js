var path = [
  {data:[{path:[[200,200],[400,200],[400,400],[200,400]],col:'#ff0000'},
         {path:[[250,500],[250,400],[300,400],[300,300],[350,250],[350,400],[300,500]],col:'#008000'}],
   bcol:"rgb(122,122,122)"},
  {data:[{path:[[100,200],[500,200],[350,400],[250,400]],col:'#87cefa'},
         {path:[[100,200],[500,200],[350,400],[250,400]],col:'#0000ff'},
         {path:[[100,200],[150,200],[150,250],[100,250]],col:'#ff0000'}],
   bcol:"rgb(122,122,122)"},
  {data:[{path:[[100,200],[300,100],[500,200],[400,300],[200,300]],col:'#ff0000'}]
  ,bcol:"rgb(122,0,122)"}
  /*
  [{path:[[100,150],[200,150],[200,250],[100,250]],col:'#000000',bcol:"#4169e1"},
   {path:[[350,150],[450,150],[450,250],[350,250]],col:'#000000'},
   {path:[[100,350],[200,400],[275,400],[350,400],[450,350],[500,400],[450,450],[275,500],[100,450],[50,400]],col:'#ff0000'}]*/
  //[{path:[[200,200],[400,200],[400,400],[200,400]],col:'#ff0000'},
  // {path:[[250,500,50]],col:'#008000'}]
]

//localStorage.setItem('img',JSON.stringify(path[1]));
/*
if (localStorage.getItem('img')){
  date_img = localStorage.getItem('img')
  console.log(date_img)
}*/

function setting(){
  /*
  if (localStorage.getItem('img')){
    date_img = JSON.parse(localStorage.getItem('img'))
    console.log(date_img)
    return path.concat([date_img])
  }else{
    return path
  }*/
  return path
}
