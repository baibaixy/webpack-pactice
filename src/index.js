import './banner.js';
import './tab.js';
import $ from 'jquery';
import './style/index.css';
import './style/index.less';

import './assets/fonts/iconfont.css';
import './app.vue'
// $('#swiper').css('background-color', 'red');

// index.js
import imgUrl from './pic/v2-640f2d0ba0bce1b07f7a0dff5f874909_r.jpg';

let img = document.createElement('img');
img.src = imgUrl;
document.body.appendChild(img);
// 引入图片-使用
import imgUrl1 from './pic/Snipaste_2022-06-19_23-23-08.png';
const theImg = document.createElement('img');
theImg.src = imgUrl1;
document.body.appendChild(theImg);

class App {
  static a = 123;
}

console.log(App.a);
