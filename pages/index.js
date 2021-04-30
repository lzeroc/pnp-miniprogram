var { measuringMobile } = require("../utils/index");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    queryStatus: false,
    gender: 1,
    analyze: [], // 星位解析
    character: '', // 性格
    family: '', // 家庭
    cause: '', // 事业
    wealth: '', // 财富
    health: '', // 健康
    summary: '', // 总结
    suggest: '', // 建议
    summaryStatus: false,
    suggestStatus: false,
    mobileText: '',
    genderText: '',
    summarySwitch: true, // 总结开关 分享
    suggestSwitch: true, // 建议开关 等视频激励开通
  },

  start: function() {
    if (this.data.mobile == '') {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none'
      });
      return false;
    }
    if (!/^1[3456789]\d{9}$/.test(this.data.mobile)) {
      wx.showToast({
        title: '手机号有误',
        icon: 'none'
      });
      return false; 
    }
    var res = measuringMobile(this.data.mobile, this.data.gender);
    this.setData({
      mobileText: this.data.mobile,
      genderText: this.data.gender,
      summaryStatus: this.data.summarySwitch,
      suggestStatus: this.data.suggestSwitch,
      analyze: res.analyze,
      character: res.character,
      family: res.family,
      cause: res.cause,
      wealth: res.wealth,
      health: res.health,
      summary: res.summary,
      suggest: res.suggest
    })
    this.setData({
      queryStatus: true
    })
  },

  updateSummaryStatus(e) {
    this.setData({
      summarySwitch: true,
    })
  },

  updateSuggestStatus(e) {
    this.setData({
      suggestStatus: true,
    })
  },

  radioChange(e) {
    this.setData({
      gender: e.detail.value
    })
  },

  mobileInput: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
