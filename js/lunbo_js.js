window.onload = function () {
  let container = document.getElementsByClassName("container")[0];
  let img_left = window.getComputedStyle(document.getElementsByClassName("imglist")[0], null).left;
  let img = document.getElementsByTagName("img");
  let next = document.getElementsByClassName("next")[0];
  let prev = document.getElementsByClassName("prev")[0];
  let frag = document.createDocumentFragment();
  let index = 1;
  let timer;

  function animate(offset) {
    let newLeft = parseInt(img_left) + offset;
    img_left = newLeft + 'px';
    //无限滚动判断
    if (newLeft > -img[0].width) {
      img_left = -(img[0].width * img.length) + 'px';
    }
    if (newLeft < -(img[0].width * (img.length - 1))) {
      img_left = 0 + 'px';
    }
    if (img_left === "-16000px" && buttons[0].className === "on") {
      img_left = "0px";
    }
    if (img_left === "-16000px" && buttons[7].className === "on") {
      img_left = "-14000px";
    }
    document.getElementsByClassName("imglist")[0].style.left = img_left;
  }

  function play() {
    //重复执行的定时器
    timer = setInterval(function () {
      // $(".next").click();
      next.click();
    }, 5000)
  }

  function stop() {
    clearInterval(timer);
  }

  // for (let i = 1; i <= img.length; i++) {
  //   span += "<span index='" + i + "'></span>"
  // }
  // $(".buttons").append(span);
  // let buttons = $('span');
  for (let i = 1; i <= img.length; i++) {
    let span = document.createElement("span");
    span.setAttribute("index", i);
    frag.appendChild(span);
  }
  document.getElementsByClassName("buttons")[0].appendChild(frag);
  let buttons = document.getElementsByTagName("span");

  buttons[0].className = "on";

  function buttonsShow() {
    //将之前的小圆点的样式清除
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].className == "on") {
        buttons[i].className = "";
      }
    }
    //数组从0开始，故index需要-1
    buttons[index - 1].className = "on";
  }

  prev.onclick = function () {
    index -= 1;
    if (index < 1) {
      index = img.length;
    }
    buttonsShow();
    animate(img[0].width);
  };

  next.onclick = function () {
    //由于上边定时器的作用，index会一直递增下去
    index += 1;
    if (index > img.length) {
      index = 1
    }
    animate(-img[0].width);
    buttonsShow();
  };
  for (let i = 0; i < buttons.length; i++) {
    (function (i) {
      buttons[i].onclick = function () {
        /*  这里获得鼠标移动到小圆点的位置，用this把index绑定到对象buttons[i]上，去谷歌this的用法  */
        /*  由于这里的index是自定义属性，需要用到getAttribute()这个DOM2级方法，去获取自定义index的属性*/
        let clickIndex = parseInt(this.getAttribute('index'));
        let offset = img[0].width * (index - clickIndex); //这个index是当前图片停留时的index
        animate(offset);
        index = clickIndex; //存放鼠标点击后的位置，用于小圆点的正常显示
        buttonsShow();
      }
    })(i)
  }
  container.onmouseover = stop;
  container.onmouseout = play;
  play();
}