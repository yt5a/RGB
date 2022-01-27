function canvas_img(data,type){
  if (data) {
    var path=data.data.map(function(v) {return [v.path,v.col]})
  }
  //canvas = document.getElementById('logo_ori');
  canvas = document.createElement("canvas")
  canvas.width = 550 ;
  canvas.height = 550 ;
  var ctx = canvas.getContext('2d');
  var width = ctx.canvas.width ;
  var height = ctx.canvas.height;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  //mode_
  if (type==1){
    ctx.beginPath();
    ctx.arc(width/2,height/2,height/2, 0, 2 * Math.PI, false);
    ctx.stroke();
    // clip
    ctx.clip();
  }
  //--------------------
  if (bcol){
    /*
    if ('bcol' in data) {
      ctx.fillStyle = rgbTo16(data.bcol);
      ctx.fillRect(0, 0,canvas.width, canvas.height);
    }else{
    ctx.fillStyle = rgbTo16(bcol);
    ctx.fillRect(0, 0,canvas.width, canvas.height);
    }
    */
    ctx.fillStyle = rgbTo16(bcol);
    ctx.fillRect(0, 0,canvas.width, canvas.height);
  }

  for (var f = 0; f < path.length; f++) {
    if (path[f][0].length>=1){
      ctx.beginPath();
      ctx.fillStyle = path[f][1];
      var p = path[f][0]
      if(p[0].length==2){
        for (var q = 0; q < p.length; q++) {
          if (q==0) {ctx.moveTo(p[q][0],p[q][1])}
          else{ctx.lineTo(p[q][0],p[q][1])}
        }
      }else if(p[0].length==3){
        ctx.arc(p[0][0],p[0][1],p[0][2],0,360*Math.PI/180,false);
      }
    ctx.fill();
    }
  }

  if (type==1){
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(width/2,height/2,height/8,0, Math.PI*2, false);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }else if (type==2){
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(width/2,height/2,height/2,0, Math.PI*2, false);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }

  return canvas.toDataURL()
}
