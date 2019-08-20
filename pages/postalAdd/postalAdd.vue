<template>
	<view class="register-box">
		<mpvue-picker ref="mpvuePicker" :mode="mode" :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<view class="register-ul">
			<view v-if="typeShow==true" class="register-li">
				<view class="register-name">
					姓名
				</view>
				<view class="register-right">
					<input placeholder-style="color:#AEB3C0" placeholder="请输入姓名" class="register-input" type="text" value="" v-model="username" />
				</view>
			</view>
			<view v-else class="register-li">
				<view class="register-name">
					公司名称
				</view>
				<view class="register-right">
					<input placeholder-style="color:#AEB3C0" placeholder="请输入公司名称" class="register-input" type="text" value="" v-model="businessNsername" />
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
					<input @click="xuanbank" disabled="true" v-model="bank" placeholder-style="color:#AEB3C0" placeholder="请输选择银行" class="register-input" type="text" value="" />
				</view>
			</view>
			<view v-if="qiBank" class="register-li">
				<view class="register-name">
					输入银行
				</view>
				<view class="register-right">
					<input @blur="qimodel" v-model="qibankInput" placeholder-style="color:#AEB3C0" placeholder="请输入银行" class="register-input" type="text" value="" />
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					输入支行
				</view>
				<view class="register-right">
					<input v-model="subbranch" placeholder-style="color:#AEB3C0" placeholder="请输入支行" class="register-input" type="text" value="" />
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
				pickerValueDefault: [22],
				 username:'',//姓名
				 businessNsername:'',//公司名称
				 bankId:'',
				 subbranch:'',
				 bank:'',
				 typeShow:true,
				 qibankInput:'',
				 qiBank:false,//选择其他银行
				 pickerValueArray:[
				 	{
				 	  label: '中国银行',
				 	  value: 11
				 	},
				 	{
				 	  label: '工商银行',
				 	  value: 22
				 	},{
				 	  label: '招商银行',
				 	  value: 33
				 	},
				 	{
				 	  label: '其他',
				 	  value: 100
				 	}
				 ]
			}
		},
		components: {
			mpvuePicker
		},
		onLoad(options) {
			if(options.types==1){//个人提现
				this.typeShow=true
			}else if(options.types==2){//公司提现
				this.typeShow=false
			}
			this.session=uni.getStorageSync('session');
		},
		methods: {
			qimodel(){
			  this.bank=this.qibankInput	
			},
			xuanbank(){
				this.$refs.mpvuePicker.show();
			},
			onConfirm(e) {
			  console.log(e);
			  this.bank=e.label
			  if(e.value[0]==100){
				  this.qiBank=true
			  }
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
				console.log(this.bank)
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
