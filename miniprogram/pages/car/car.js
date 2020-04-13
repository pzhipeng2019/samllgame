// pages/car/car.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList:[],
  },
  onChange(event) {
    wx.showLoading({
      title: '处理中...',
    })
    console.log(event.detail);
    console.log(event.currentTarget.dataset.priceid);
    const priceid = event.currentTarget.dataset.priceid;
    db.collection('carList').doc(
      priceid
    ).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        carItemNum: event.detail
      }
    })
      .then(res => {
        wx.hideLoading();
        // wx.showToast({
        //   title: '添加成功！',
        // })
      })
      .catch(err => {
        wx.hideLoading();
        // wx.showToast({
        //   title: '添加失败!',
        // })
      })
  },
  onChangeChecked:function(event){
    const priceid = event.currentTarget.dataset.priceid;
    console.log(event);
    let checkedNum=0;
    wx.showLoading({
      title: '处理中...',
    })

   
    const { carList } = this.data;
    console.log(carList)
    const obj = carList.find(item => item._id === priceid);
    obj.checked = !obj.checked;
    console.log(carList)
    this.setData({
      carList,
    })
    console.log(event.detail, !event.detail);
   
    db.collection('carList').doc(
      priceid
    ).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        checked: obj.checked,
      }
    })
      .then(res => {
        wx.hideLoading();
        // wx.showToast({
        //   title: '添加成功！',
        // })
      
      })
      .catch(err => {
        wx.hideLoading();
        // wx.showToast({
        //   title: '添加失败!',
        // })
      })
  },
  getCarList:function(){
    db.collection("carList").get({
      success:res=>{
        console.log(res.data)
        this.setData({
          carList:res.data,
        })
      }
    })
  
  },
  /**
   * 删除
   */
  closeDel: function (event) {
    const id = event.currentTarget.dataset.product
    console.log(event.currentTarget.dataset.product)

    db.collection("carList").doc(id).remove().then(res => {
      wx.showToast({
        title: '成功删除此商品！',
      })
      const { carList } = this.data;
      const obj = carList.find(item => item._id === id);
      carList.splice(carList.indexOf(obj), 1)
      console.log(carList)
      this.setData({
        carList,
      })
    }).catch(err => {
      wx.showToast({
        title: '删除失败！',
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCarList();
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
    this.getCarList();
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