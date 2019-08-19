<template>
	<view class="setUpBox">
		<view class="setUpUl">
			<view class="setUpList">
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
		<view @click="join" class="join setUpJoin">
			退出登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			join(){
				uni.showModal({
				    title: '提示',
					confirmText:'是',
				    content: '退出登录',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
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
