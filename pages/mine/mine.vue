<template>
	<view class="mine-bgbox">
		<view class="mine-box">
			<view class="mine-top">
				<view class="mine-li-left">
					<image :src="tou" class="mine-li-img" mode=""></image>
					<view class="mine-con">
						<view class="mine-name">
							{{userName}}
						</view>
						<view class="mine-phone">
							{{dataJson.mobile}}
						</view>
					</view>
				</view>
				<image @click="mineContent" src="/static/image/xx.png" class="mine-right" mode=""></image>
			</view>
			<!--  -->
			<view class="mine-list" @click="mycode(dataJson.id,dataJson.companyName)">
				<view class="mine-liname">
					我的二维码
				</view>
				<image class="mine-more" src="/static/image/jt.png" mode=""></image>
			</view>
			<view class="mine-list">
				<view class="mine-liname">
					流程手册
				</view>
				<image class="mine-more" src="/static/image/jt.png" mode=""></image>
			</view>
			<view @click="setUp" class="mine-list">
				<view class="mine-liname">
					设置
				</view>
				<image class="mine-more" src="/static/image/jt.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	// import {uniPopup} from '@dcloudio/uni-ui'
	import http from '../../utils/http.js'
	import api from '../../utils/api.js'
	export default {
		data() {
			return {
				tou:'',
				userName:'',
				phone:'',
				dataJson:{},
			}
		},
		created(){
			let userInfo=uni.getStorageSync('userInfo');
			console.log(userInfo)
			this.tou=userInfo.avatarUrl;
			this.userName=userInfo.nickName;
			this.phone=uni.getStorageSync('phone')
			uni.setNavigationBarTitle({
			　　title:'我的'
			})
			this.setColor();
			this.getQueryBasicInfo();
		},
		methods: {
			// 获取基本信息
			getQueryBasicInfo(){
				let self=this
				let param={
					
				}
				http.Request(api.queryBasicInfo,'POST',param,function(res){
					console.log(res)
					self.dataJson=res
				})				
			},
			// 设置导航背景色

					             setColor(){
					                 uni.setNavigationBarColor({
					                     // 字体颜色 仅支持 #ffffff 和 #000000
					                     frontColor: '#000000',
										 titleSize:'16px',
					                     //     背景颜色值，有效值为十六进制颜色
					                     backgroundColor: '#FFFFFF',
					                     // animation 结构
					                     // animation: {
					                         // duration: 动画时间
					                         // duration: 500,
					                         // timingFunc:动画效果
					                             // linear    动画从头到尾的速度是相同的。
					                             // easeIn    动画以低速开始
					                             // easeOut    动画以低速结束。
					                             // easeInOut    动画以低速开始和结束
					                         // timingFunc: 'easeIn'
					                     // }
					                 });
								},
			openPopup(){
				this.$refs.popup.open()
			},
			mycode(id,companyName){
				uni.navigateTo({
					url: '../myCode/myCode?code='+id+'&companyName='+companyName
				});
			},
			// 设置
			setUp(){
				uni.navigateTo({
					url: '../setUp/setUp'
				});
			},
			// 编辑嘻嘻
			mineContent(){
				uni.navigateTo({
					url: '../mineContent/mineContent'
				});
			},
			out(){
				uni.showModal({
					title: '温馨提示',
					content: '退出登录',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.clearStorageSync();
							uni.navigateTo({
								url: '../login/login'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		},
	}
</script>

<style scoped>
@import url("./index.css");
</style>
