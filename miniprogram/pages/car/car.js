// pages/car/car.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList:[],
    AllChecked:false,
    totalPrice:0.00,
    openid:"oGPBK5O_7-nNf1t1g1nGmn1eDsjE",
    orderArr:[]
  },
  /**
   * 选择数量
   */
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
       
        const { carList } = this.data;
        console.log(carList)
        const obj = carList.find(item => item._id === priceid);
        obj.carItemNum = event.detail;
        this.uploadTotalPrice(carList)

        this.setData({
          carList,

        })
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
  /**
   * 全选
   */
  onChangeAllChecked:function(event){
    
    const { AllChecked, carList}=this.data;
    console.log(AllChecked)
    if(AllChecked===true){
      for(let item in carList){
        carList[item].checked=false
      }
    }else{
      for (let item in carList) {
        carList[item].checked = true
      }
    }
    this.uploadTotalPrice(carList);
    this.setData({
      AllChecked: !AllChecked,
      carList,
    })
    console.log(AllChecked)
  },
  /**
   * 勾选
   */
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
    this.uploadTotalPrice(carList)
   
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
    const {openid}=this.data;
    db.collection("carList").where({ _openid: openid}).get({
      success:res=>{
        console.log(res.data)
        const carList=res.data;
        this.uploadTotalPrice(carList)
        this.setData({
          carList,
         
        })
      }
    })
  
  },
  /**
   * 修改价格
   */
  uploadTotalPrice: function (carList){
  
    const newCarList = carList.filter(item => item.checked === true);
    console.log(newCarList)
    let orderArr=[];
    for(let item in newCarList){
      orderArr.push(newCarList[item]._id)
    }
    console.log(orderArr)
    if(newCarList.length<carList.length){
      this.setData({
        AllChecked:false
      })
    }else{
      this.setData({
        AllChecked: true
      })
    }
    let totalPrice = 0;
    for (let item in newCarList) {
      totalPrice = totalPrice + Number(newCarList[item].productPrice) * newCarList[item].carItemNum
    }
    console.log(totalPrice)
    this.setData({
      totalPrice,
      orderArr,
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
      this.uploadTotalPrice(carList)
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
    
    const accountInfo = wx.getAccountInfoSync();
    console.log(accountInfo.miniProgram.appId) // 小程序 appId
    wx.cloud.callFunction({
      name: 'productInfo',
      complete: res => {
        console.log('callFunction test result: ', res.result.openid)
        this.setData({
          openid: res.result.openid,
        })
      }
    })
    
  },
  goOrder:function(event){
    const {orderArr}=this.data;
    console.log(orderArr)
    wx.navigateTo({
      url: '../order/order',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
         
        },
        someEvent: function(data) {
          console.log(data)
        }
       
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: orderArr })
      }
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