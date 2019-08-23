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
					<input disabled="true" placeholder-style="color:#AEB3C0" placeholder="请输入公司名称" class="register-input" type="text" value="" v-model="businessNsername" />
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					银行卡号
				</view>
				<view class="register-right">
					<input @blur="overBank" maxlength="19" v-model="bankId" placeholder-style="color:#AEB3C0" placeholder="请输入银行卡" class="register-input" type="text" value="" />
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					选择银行
				</view>
				<view class="register-right">
					<input @click="xuanbank" disabled="true" v-model="bank" placeholder-style="color:#AEB3C0" placeholder="请输选择银行" class="register-input" type="text" value="" />
					<image src="/static/image/jt.png" mode="" class="shangjian"></image>
				</view>
			</view>
			<view v-if="qiBank" class="register-li">
				<view class="register-name">
					输入银行
				</view>
				<view class="register-right">
					<input @blur="qimodel"  v-model="qibankInput" placeholder-style="color:#AEB3C0" placeholder="请输入银行" class="register-input" type="text" value="" />
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
				pickerValueDefault: [0],
				 username:'',//姓名
				 businessNsername:'',//公司名称
				 bankId:'',
				 yinId:'',//银行id
				 subbranch:'',
				 bank:'',
				 typeShow:true,
				 qibankInput:null,
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
			this.businessNsername=options.companyName
			this.session=uni.getStorageSync('session');
			this.queryBankList()
		},
		methods: {
			// 添加银行阿卡信息
			addBankInfo(){
				let self=this
				let param={
					address:self.subbranch,//支行地址
					bankId:self.yinId,//银行id
					bankName:self.qibankInput,
					cardNumber:self.bankId,//银行卡号
					name:self.username,//账户名称
				}
				http.Request(api.addBankInfo,'POST',param,function(res){
					console.log(res)
					uni.showToast({
						title:'添加成功'
					});
					setTimeout(()=>{
						uni.reLaunch({
							url: '../postal/postal?type=2'
						});
					},1000)
				})					
			},
			//根据卡号获取信息
			queryBankInfoByCardNumber(){
				let self=this
				// self.pickerValueDefault=[6]
				let param={
					cardNumber:self.bankId,//银行卡号
				}
				http.Request(api.queryBankInfoByCardNumber,'POST',param,function(res){
					console.log(res.id*1)
					self.pickerValueDefault=[]
					self.bank=res.bankName;
					self.yinId=res.id
					// self.pickerValueDefault=self.pickerValueDefault.push(res.id*1)
					// console.log(self.pickerValueDefault)
				})					
			},
			// 获取银行列表
			queryBankList(){
				let self=this
				let param={
				}
				http.Request(api.queryBankList,'POST',param,function(res){
					console.log(res)
					self.pickerValueArray=res
				})					
			},
			// 输完银行卡
			overBank(){
				// this.bankId=this.qibankInput;
				 this.queryBankInfoByCardNumber()
			},
			qimodel(){
			  this.bank=this.qibankInput;
			},
			xuanbank(){
				this.qiBank=false
				this.$refs.mpvuePicker.show();
			},
			onConfirm(e) {
			  console.log(e);
			  this.bank=e.label
			  this.yinId=e.value[0]
			  if(e.label=="其他银行"){
				  this.qiBank=true
			  }
			  this.$refs.mpvuePicker.hide();
			},
			onChange(e) {
			  console.log(e);
			 
			},
			onCancel(e) {
			  console.log(e);
			  if(e.label=="其他银行"){
			  		this.qiBank=true
			  }
			   this.$refs.mpvuePicker.hide();
			},
			join(){
				if(this.typeShow==true){
					if(this.username==''){
						uni.showToast({
							icon:'none',
							title:'请输入姓名'
						});
						return
					}

				}else{
					if(this.businessNsername==''){
						uni.showToast({
							icon:'none',
							title:'请输入公司名称'
						});
						return
					};	
				};
				if(this.bankId==''){
					uni.showToast({
						icon:'none',
						title:'请输入银行卡号'
					});
					return
				}
				if(this.subbranch==''){
					uni.showToast({
						icon:'none',
						title:'请输入支行'
					});
					return
				}
				if(this.bank==''){
					uni.showToast({
						icon:'none',
						title:'请选择银行'
					});
					return
				}
				
				console.log(this.bank)
				this.addBankInfo()
				
			}
		}
	}
</script>

<style scoped>
	@import url("./index.css");
</style>
