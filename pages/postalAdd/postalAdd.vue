<template>
	<view class="register-box">
		<mpvue-picker ref="mpvuePicker" :mode="mode" :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<view class="register-ul">
			<view class="register-li">
				<view class="register-name">
					公司名称
				</view>
				<view class="register-right">
					<input placeholder-style="color:#AEB3C0" placeholder="请输入姓名" class="register-input" type="text" value="" v-model="username" />
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					银行卡号
				</view>
				<view class="register-right">
					<input v-model="bankId" placeholder-style="color:#AEB3C0" placeholder="请输入详细地址" class="register-input" type="text" value="" />
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					选择银行
				</view>
				<view class="register-right">
					<input @click="xuanbank" disabled="true" v-model="bank" placeholder-style="color:#AEB3C0" placeholder="请输入负责人名称" class="register-input" type="text" value="" />
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					输入支行
				</view>
				<view class="register-right">
					<input v-model="subbranch" placeholder-style="color:#AEB3C0" placeholder="请输入验证码" class="register-input" type="text" value="" />
				</view>
			</view>
		</view>
		
		<!-- 加入云推 -->
		<view class="join" @click='join'>
			添加
		</view>
		<!-- phone   盒子 -->
		<view v-if="phoneMask" class="phone-mask">
	
		</view>
	</view>
</template>

<script>
	import mpvuePicker from '../../components/ly-picker.vue';
	import http from '../../utils/http.js'
	import api from '../../utils/api.js'
	export default {
		data() {
			return {
				deepLength:1,
				mode: 'selector',
				pickerValueDefault: [1],
				 username:'',
				 bankId:'',
				 subbranch:'',
				 bank:'',
				 pickerValueArray:[
				 	{
				 	  label: '住宿费',
				 	  value: 1
				 	},
				 	{
				 	  label: '活动费',
				 	  value: 2
				 	}
				 ]
			}
		},
		components: {
			mpvuePicker
		},
		onLoad() {
			this.session=uni.getStorageSync('session');
		},
		methods: {
			xuanbank(){
				this.$refs.mpvuePicker.show();
			},
			onConfirm(e) {
			  console.log(e);
			  this.$refs.mpvuePicker.hide();
			},
			onChange(e) {
			  console.log(e);
			 
			},
			onCancel(e) {
			  console.log(e);
			   this.$refs.mpvuePicker.hide();
			},
			join(){
				uni.navigateTo({
					url: '../postal/postal?type=2'
				});
			}
		}
	}
</script>

<style scoped>
	@import url("./index.css");
</style>
