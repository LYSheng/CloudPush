<template>
	<view class="mycodeBgBox">
		<view v-if="flag==true" class="mycodeBox">
			<view class="mycode">
				<tki-qrcode class="code-img"
				    ref="qrcode"
				    :val="val"
				    :size="size"
					:onval="true"  
					:icon="icon" 
					:iconSize="iconsize"
					:loadMake="false"
					:pdground='pdground'
				    @result="qrR" />
			</view>
			<view class="code-text">
				请出示二维码，由公司扫码绑定公司关系
			</view>
		</view>
		<view v-else class="mycodeNone">
			<image class="mycodeNoneImg" src="/static/image/wu.png" mode=""></image>
			<view class="mycodeNoneText">
				你当前已关联{{companyName}}公司，关联新公司需先退出原公司
			</view>
			<view @click="loginOut" class="join joinOut" >
				退出
			</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from "tki-qrcode";
	import http from '../../utils/http.js'
	import api from '../../utils/api.js'
	export default {
		data() {
			return {
				youFlag:false,//判断是否有公司绑定  leave
				ifShow: true,
				val: 'oiygtreploijubgv', // 要生成的二维码值
				size: 400, // 二维码大小
				unit: 'upx', // 单位
				background: '#b4e9e2', // 背景色
				foreground: '#309286', // 前景色
				pdground: '#545DFF', // 角标色
				icon: '', // 二维码图标
				iconsize:50, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: false, // 组件加载完成后自动生成二维码
				src: '', // 二维码生成后的图片地址或base64
				id:'',
				companyName:'',
				flag:true,
			}
		},
		components: {tkiQrcode},
		onLoad(options){
			this.val=options.code
			this.companyName=options.companyName
			let userInfo=uni.getStorageSync('userInfo');
			this.icon=userInfo.avatarUrl;
			console.log(111)
		},
		onShow(){
			console.log(222)
			if(this.companyName==''){
				this.flag=true
			}else{
				this.flag=false
			}
		},
		onPullDownRefresh() {
			 console.log(22222)
		     // this.getQueryBasicInfo()
		},
		created(){
			console.log(111)
			
		},
		methods: {
			// 退出登录
			leave(){
				let self=this
				let param={
					
				}
				http.Request(api.leave,'POST',param,function(res){
					console.log(res)
					uni.navigateTo({
					    url: '../businessHome/businessHome?idx=3&type=2'
					});
				})					
			},
			qrR(res) {
				console.log(res)
						this.src = res
					},
			loginOut(){
				let self=this;
				uni.showModal({
				    title: '提示',
					confirmText:'退出',
				    content: '确定退出当前公司？',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							self.leave()
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>

<style>
@import url("./index.css");
</style>
