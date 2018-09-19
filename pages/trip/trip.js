
const data1 = require('../../components/data1.js');

const app = getApp();
Page({
  data: {
    articleType: 1,
    article: null,
    options: null,
    windowWidth: 0,
  },
  onReady() {
    const self = this;
    // wx.setNavigationBarTitle({
    //   title: self.data.options.name,
    // });
  },
  onLoad(options) {
    const self = this;
    const id = options.id;
    self.setData({
      windowWidth: app.systemInfo.windowWidth,
    });
    self.setData({
      articleType: options.type,
    });
    self.setData({
      article: data1.data[id],
    });
    // wx.showToast({
    //   title: '正在加载',
    //   icon: 'loading',
    //   duration: 10000,
    // });

  },
  // viewWaypoint(e) {
  //   const self = this;
  //   const ds = e.currentTarget.dataset;
  //   wx.navigateTo({
  //     url: `../waypoint/waypoint?waypointId=${ds.waypoint}&tripId=${self.data.trip.id}`,
  //   });
  // },
  // gotoUser(e) {
  //   const userId = e.target.dataset.id;
  //   wx.navigateTo({
  //     url: `../user/user?id=${userId}`,
  //   });
  // },
});
