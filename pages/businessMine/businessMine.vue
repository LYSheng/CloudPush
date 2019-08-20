<template>
	<view class="mine-bgbox">
		<view class="mine-box">
			<view class="mine-top" @click="mineContent">
				<view class="mine-li-left">
					<image :src="tou" class="mine-li-img" mode="aspectFit"></image>
					<view class="mine-con">
						<view class="mine-name">
							{{userName}}
						</view>
						<view class="mine-phone">
							{{phone}}
						</view>
					</view>
				</view>
				<image src="/static/image/xx.png" class="mine-right" mode="aspectFit"></image>
			</view>
			<!--  -->
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
	export default {
		data() {
			return {
				tou:'',
				userName:'',
				phone:'',
			}
		},
		// components: {uniPopup},
		created() {
			let userInfo = uni.getStorageSync('userInfo');
			this.tou=userInfo.avatarUrl;
			this.userName=userInfo.nickName;
			this.phone=uni.getStorageSync('phone')
		},
		methods: {
			openPopup(){
				this.$refs.popup.open()
			},
			// 设置
			setUp(){
				uni.navigateTo({
					url: '../setUp/setUp'
				});
			},
			// 编辑信息
			mineContent(){
				uni.navigateTo({
					url: '../enterpriseInfo/enterpriseInfo'
				});
			},
			out(){
				uni.showModal({
					title: '温馨提示',
					content: '退出登录',
					success: function (res) {
						if (res.confirm) {
							uni.clearStorageSync();
							uni.navigateTo({
								url: '../login/login'
							});
						} else if (res.cancel) {
							
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
