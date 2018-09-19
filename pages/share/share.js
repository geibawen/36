const App = getApp();
const util = require('../../utils/util.js');

const data1 = require('../../components/data1.js');

const formatTime = util.formatTime;

const wxGetImageInfo = util.wxPromisify(wx.getImageInfo)

const wxCanvasToTempFilePath = util.wxPromisify(wx.canvasToTempFilePath)
const wxSaveImageToPhotosAlbum = util.wxPromisify(wx.saveImageToPhotosAlbum)

Page({
  data: {
    articleType:1,
    articles: [],
    windowWidth: App.systemInfo.windowWidth,
    windowHeight: App.systemInfo.windowHeight,
    shareWidth: 0,
    shareHeight: 0,

    items: [
      { name: '千好万好事事好，月圆情圆人团圆', checked: 'true'},
      { name: '此时相望不相闻，愿逐月华流照君' },
      { name: '献一颗圆圆的心，寄一份圆圆的情' },
      { name: '八月金秋桂送香，十五明月情溢边' },
    ],

    select: '千好万好事事好，月圆情圆人团圆',

    inputValue1: ' ',
    inputValue2: ' ',
  },
  onLoad() {
    this.loadMore();
  },
  onPullDownRefresh() {
    this.loadMore(null, true);
  },
  loadMore(e, needRefresh) {
    const self = this;
    
    // self.setData({
    //   articles: data1.data,
    // });
    // wx.navigateToMiniProgram({
    //   appId: 'wx156da3a11c0274a5',
    //   path: 'pages/index/index',
    //   extraData: {
    //     foo: 'bar'
    //   },
    //   // envVersion: 'develop',
    //   success(res) {
    //     // 打开成功
    //   }
    // })
  },
  test(e) {
    wx.showToast({
      title: 'test'
    })
  },
  bindKeyInput1: function (e) {
    this.setData({
      inputValue1: e.detail.value
    })
  },
  bindKeyInput2: function (e) {
    this.setData({
      inputValue2: e.detail.value
    })
  },
  jumpApp(e) {
    if (this.data.inputValue1 == ' ' || this.data.inputValue2 == ' ') {
      wx.showToast({
        title: '请输入名字'
      })
      return;
    }
    // const ds = e.currentTarget.dataset;
    // const self = this;
    Promise.all([
      wxGetImageInfo({
        src: '../../images/share_bg.png'
      }),
      // wxGetImageInfo({
      //   src: 'https://awsbj0.fds.api.xiaomi.com/apptest/guide/test/share_inner.png'
      // })
    ]).then(res => {
      this.setData({
        shareWidth: App.systemInfo.windowWidth,
        shareHeight: App.systemInfo.windowHeight,
      })


      const ctx = wx.createCanvasContext('shareCanvas')
      

      // console.log('width:', this.data.windowWidth)
      // console.log('height:', this.data.windowHeight)
      // console.log('model:', App.systemInfo.model)
      var margin = 0;
      if (App.systemInfo.model.substr(0, 8) == 'iPhone X') {
        margin = 40;
      }

      var drawHeight = this.data.windowHeight - margin;
      var line1Height = drawHeight * 0.1;
      var line2Height = drawHeight * 0.64;
      // var innerWidth = 380;
      // var innerHeight = 460;
      // var start_x = 0;
      // var start_y = 30;
      // 底图
      ctx.drawImage(res[0].path, 0, 0, this.data.windowWidth, drawHeight)
      ctx.draw(true)
      // ctx.drawImage(res[1].path, start_x, start_y, innerWidth, innerHeight)
      // ctx.draw(true)

      ctx.setLineWidth(4)
      ctx.setStrokeStyle('#fee48b')
      ctx.strokeRect(75, line1Height - 25, 250, 40)
      ctx.strokeRect(70, line2Height - 25, 255, 40)

      var showText = this.data.inputValue1 + '送' + this.data.inputValue2 + '的团圆月饼';
      var showBlank = 0;
      if (showText.length - 26 < 0) {
        showBlank = (26 - showText.length) / 2;
        // wx.showToast({
        //   title: 'test' + showBlank
        // })
      }
      ctx.setFillStyle('#b74369')  // 文字颜色：
      ctx.setFontSize(16)         // 文字字号：22px
      // console.log('width:', mm.width)
      ctx.fillText(showText, 80 + showBlank * 5, line1Height)
      ctx.fillText(this.data.select, 78, line2Height)
      
      
      
      setTimeout(function () {
        ctx.stroke()
        ctx.draw(true)
      }, 100)

      

      

      setTimeout(function () {
        wxCanvasToTempFilePath({
          canvasId: 'shareCanvas'
        }, this).then(res => {
          return wxSaveImageToPhotosAlbum({
            filePath: res.tempFilePath
          })
        }).then(res => {
          wx.showToast({
            title: '已保存到相册'
          })
        })
      }, 200)


    
    })
  },


  checkboxChange: function (e) {
    var that = this;
    var skin = e.detail.value

    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    var new_itmes = [
      { name: '千好万好事事好，月圆情圆人团圆', checked: 'false' },
      { name: '此时相望不相闻，愿逐月华流照君', checked: 'false' },
      { name: '献一颗圆圆的心，寄一份圆圆的情', checked: 'false' },
      { name: '八月金秋桂送香，十五明月情溢边', checked: 'false' },
    ]
    var key = skin[skin.length - 1];

    for (var i = 0; i < new_itmes.length; i++) {
      if (key == new_itmes[i].name) {
        new_itmes[i].checked = true;
      } else {
        new_itmes[i].checked = false;
      }
    }  

    that.setData({
      select: key,
      items: new_itmes
    })
  }
});
