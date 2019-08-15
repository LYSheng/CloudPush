<template>
	<view class="content">
		<view class="push-top">
			<image class="logo" src="/static/image/zhu.jpg"></image>
		</view>
		<view class="con">
			<view class="push-li">
				<view class="li-left ">
					<text class="bi">*</text>
					<view class="li-name">
						姓名
					</view>
				</view>
				<view class="li-right">
					<input v-model="name" type="text" value="" />
				</view>
			</view>
			<view class="push-li">
				<view class="li-left ">
					<text class="bi">*</text>
					<view class="li-name">
						电话
					</view>
				</view>
				<view class="li-right">
					<input v-model="phone" type="text" value="" />
				</view>
			</view>
			<view class="push-li">
				<view class="li-left ">
					<text class="bi"> </text>
					<view class="li-name">
						微信
					</view>
				</view>
				<view class="li-right">
					<input v-model="wxid" type="text" value="" />
				</view>
			</view>
			 <button :data-userid='11' @click='submit' class="btn" type="primary" :loading="loading" >确定提交</button>
		</view>
	</view>
</template>

<script>
	import http from '../../utils/http.js'
	import api from '../../utils/api.js'
	export default {
		data() {
			return {
				title: 'Hello',
				loading:false,
				name:'',
				phone:'',
				wxid:''
			}
		},
		onLoad() {

		},
		methods: {
			// 提交信息
			submit(e){
				let self=this
				self.loading=true
				console.log('名字：'+self.name)
				console.log('手机号：'+self.phone)
				console.log(e.currentTarget.dataset.userid)
				// uni.navigateTo({
				// 	url: '',
				// 	success: res => {},
				// 	fail: () => {},
				// 	complete: () => {}
				// });
				let param={
					key:'9022',
					phone:self.phone,
					passwd:self.wxid
				}
				http.post(api.journalismApi,'post',param,function(res){
					self.loading=false
					console.log(res)
				})
			}
		}
	}
</script>
<style scoped >
	@import url("./index.css");
</style>
