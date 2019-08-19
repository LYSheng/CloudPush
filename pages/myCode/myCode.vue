<template>
	<view class="mycodeBgBox">
		<view v-if="youFlag" class="mycodeBox">
			<view class="mycode">
				<image class="code-img" src="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQE08TwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyMG8yOE5hLV9jX2sxMDAwMGcwN0cAAgSnJVVdAwQAAAAA" mode=""></image>
			</view>
			<view class="code-text">
				请出示二维码，由公司扫码绑定公司关系
			</view>
		</view>
		<view v-else class="mycodeNone">
			<image class="mycodeNoneImg" src="/static/image/wu.png" mode=""></image>
			<view class="mycodeNoneText">
				你当前已关联xxxx公司，关联新公司需先退出原公司
			</view>
			<view @click="loginOut" class="join joinOut" >
				退出
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				youFlag:false
			}
		},
		methods: {
			loginOut(){
				uni.showModal({
				    title: '提示',
					confirmText:'退出',
				    content: '确定退出当前公司？',
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
