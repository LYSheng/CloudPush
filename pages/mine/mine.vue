<template>
	<view class="mine-box">
		<view class="mine-list">
			<view class="mine-left">
				<image class="mine-img" :src="tou" mode=""></image>
			</view>
			<view class="mine-con">
				<view class="mine-name">
					{{userName}}
				</view>
				<view class="mine-phone">
					{{phone}}
				</view>
			</view>
			<view class="mine-right" @click="out">
				<image  src="/static/image/outImg.png" mode="" class="mine-out"></image>
			</view>
		<!-- 	<uni-popup ref="popup" type="center">
				弹出层示例
				<button @click="closePopup">关闭弹出层</button>
			</uni-popup> -->
		</view>
	</view>
</template>

<script>
	// import {uniPopup} from '@dcloudio/uni-ui'
	export default {
		data() {
			return {
				tou:'',
				userName:'',
				phone:'',
			}
		},
		// components: {uniPopup},
		onLoad() {
			let userInfo=uni.getStorageSync('userInfo');
			this.tou=userInfo.avatarUrl;
			this.userName=userInfo.nickName;
			this.phone=uni.getStorageSync('phone')
		},
		methods: {
			openPopup(){
				this.$refs.popup.open()
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
		}
	}
</script>

<style scoped>
@import url("./index.css");
</style>
