<template>
	<view class="setUpBox">
		<view class="setUpUl">
			<view v-if="type" class="setUpList" @click="Change">
				<view class="setUpName">
					更换负责人
				</view>
				<image class="setUpMore" src="/static/image/jt.png" mode=""></image>
			</view>
			<view class="setUpList">
				<view class="setUpName">
					用户协议
				</view>
				<image class="setUpMore" src="/static/image/jt.png" mode=""></image>
			</view>
		</view>
		<view @click="out" class="join setUpJoin">
			退出登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:false
			}
		},
		onLoad(options){
			if(options.type==1){
				this.type=true
			}
		},
		methods: {
			Change(){
				uni.navigateTo({
					url:'../changePrincipal/changePrincipal'
				})
			},
			out(){
				uni.showModal({
					title: '确认退出登陆',
					content: '退出登陆后，您将重新授权登录',
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

<style>
@import url("./index.css");
</style>
