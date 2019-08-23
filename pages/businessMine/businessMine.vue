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
				<image class="mine-more" src="/static/image/more.png" mode=""></image>
			</view>
			<view @click="setUp" class="mine-list">
				<view class="mine-liname">
					设置
				</view>
				<image class="mine-more" src="/static/image/more.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '../../utils/http.js'
	import api from '../../utils/api.js'
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
			// let userInfo = uni.getStorageSync('userInfo');
			// this.tou = userInfo.avatarUrl;
			// this.userName = userInfo.nickName;
			// this.phone = uni.getStorageSync('phone');
			
			this.FirmInfo();
		},
		methods: {
			FirmInfo(){
				http.Request(api.FirmInfo, 'POST', {}, (res) => {
					uni.setStorageSync('FirmInfo',res);
					this.userName = res.name;
					this.phone = res.mobile;
				});
				
			},
			mineContent(){
				uni.navigateTo({
					url:'../enterpriseInfo/enterpriseInfo'
				})
			},
			openPopup(){
				this.$refs.popup.open()
			},
			// 设置
			setUp(){
				uni.navigateTo({
					url: '../setUp/setUp?type=1'
				});
			}
		}
	}
</script>

<style scoped>
@import url("./index.css");
</style>
