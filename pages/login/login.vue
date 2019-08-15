<template>
	<view class="login-box">
		<view class="login-img-box">
			<image class="login-img" src="/static/image/loginimg.png" mode=""></image>
		</view>
		<!-- #ifdef MP-WEIXIN --> 
		<button @click="login" class="login-list flex align-items_center justify-content_space-between" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo">
			<view class="list-icon pn">
				<image class="list-iconIcon" src="/static/image/wx.png" mode=""></image>
			</view> 
			<button class="list-cons pn" :loading="loading">
				微信一键授权   
			</button>
			<view class="list-icon pn">
				<!-- <image class="list-iconIcon" src="/static/image/wx.png" mode=""></image> -->
			</view>
		</button>
		<!-- #endif -->
		<button @click="login" class="login-list login-xia flex align-items_center justify-content_space-between" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo">
			<view class="list-icon pn">
				<image class="list-iconIcon" src="/static/image/zhu.png" mode=""></image>
			</view>
			<view class="list-con pn" >
				成为合伙人
			</view>
			<view class="list-icon pn">
				<!-- <image class="list-iconIcon" src="/static/image/wx.png" mode=""></image> -->
			</view>
		</button>
		
		<!-- 企业合伙人 -->
		<view class="enterprisePortal" @click="enterprise">
			企业合伙人
		</view>
	</view>
</template>
<script>
	import http from '../../utils/http.js'
	import api from '../../utils/api.js'
	export default {
		data() {
			return {
				back:false,
				loading:false,
			}
		},
		onLoad(options){
			if(options.type==1){
				this.back=true
			}
		},
		methods: {
			login(){
				this.getProvider()
			},
			getProvider(){
				let self=this;
				self.loading=true;
				uni.getProvider({
					service: 'oauth',
					success: function (res) {
						console.log(res.provider)
						if (~res.provider.indexOf('qq')) {
							uni.login({
								provider: 'qq',
								success: function (loginRes) {
									console.log(JSON.stringify(loginRes));
								}
							});
						}else if(~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: function (loginRes) {
									console.log(loginRes);
									let code=loginRes.code
									self.getuserinfo(code)
								}
							});
						}else if(~res.provider.indexOf('sinaweibo')) {
							uni.login({
								provider: 'sinaweibo',
								success: function (loginRes) {
									console.log(JSON.stringify(loginRes));
								}
							});
						}else if(~res.provider.indexOf('xiaomi')) {
							uni.login({
								provider: 'xiaomi',
								success: function (loginRes) {
									console.log(JSON.stringify(loginRes));
								}
							});
						}
					}
				});
			},
			// 获取openid
			queryMiniOpenid(authcode){
				let self=this;
				let param={
					authcode:authcode
				}
				http.LoginPost(api.queryMiniOpenid,param,function(res){
					self.loading=false
					console.log(res)
					uni.setStorageSync('token', res.token);
					uni.setStorageSync('uid', res.userId);
					uni.setStorageSync('session', res.session);
					uni.setStorageSync('secret', res.secret);
					if(res.isRegister==0){ //去注册
						uni.navigateTo({
							url: '../register/register'
						});
					}else{
						if(self.back==true){
							uni.navigateBack({
							    delta: 1
							});
						}else{
							uni.switchTab({
								url: '/pages/home/home'
							});
						}
					}
				})
			},
			// 获取用户基本信息    merchantManage
			getuserinfo(code){
				let self=this
				uni.getUserInfo({
				  provider: 'weixin',
				  success: function (infoRes) {
					  console.log(infoRes)
					self.queryMiniOpenid(code)
					uni.setStorageSync('encrypted', infoRes.encryptedData);
					uni.setStorageSync('iv', infoRes.iv);
					uni.setStorageSync('userInfo', infoRes.userInfo);
					console.log('用户昵称为：' + infoRes.userInfo.nickName);
				  },
				  fail:function (res) {
				  	console.log(res)
				  }
				});
			},
			// 企业登录
			enterprise(){
				uni.setTabBarItem({
				  index: 0,
				  text: 'text',
				  // pagePath:'pages/merchantManage/merchantManage'
				  iconPath: 'static/image/t11.png',
				  selectedIconPath: 'static/image/t12.png'
				})
			}
		}
	}
</script>

<style scoped>
 @import url("./index.css");
</style>
