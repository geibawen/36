const App = getApp();
const util = require('../../utils/util.js');

const data1 = require('../../components/data1.js');

const formatTime = util.formatTime;

Page({
  data: {
    articleType:1,
    articles: [],
    windowWidth: App.systemInfo.windowWidth,
    windowHeight: App.systemInfo.windowHeight,
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
  jumpApp(e) {
    const ds = e.currentTarget.dataset;
    const self = this;
    wx.navigateToMiniProgram({
      appId: 'wx156da3a11c0274a5',
      path: 'pages/index/index',
      extraData: {
        foo: 'bar'
      },
      // envVersion: 'develop',
      success(res) {
        // 打开成功
      }
    })
  },
});
