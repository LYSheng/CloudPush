<template>
	<view class="postal-box">
		<view class="postal-top">
			<view v-if="dataJson.bindCard==1" class="postal-bank">
				<view class="postal-header">
					到账银行卡
				</view>
				<view class="postal-bank-content">
					<view class="postal-bank-xx">
						<image class="postal-bank-icon" :src="dataJson.bankLogo" mode=""></image>
						<view class="postal-bank-name">
							{{dataJson.bankName}}{{dataJson.cardNumber}}
						</view>
					</view>
					<view class="postal-time">
						2小时到账
					</view>
				</view>
			</view>
			<view v-else class="postal-none" @click="postalAdd(types,companyName)">
				<view class="postal-add-btn">
					添加银行卡
				</view>
				<view class="postal-add-icon">
					<image class="postal-add-icon" src="/static/image/yuan.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 提现金额 -->
		<view class="postal-content">
			<view class="postal-title">
				提现金额
			</view>
			<view class="postal-input-box">
				<view class="postal-yuan">
					￥
				</view>
				<input @input="shuMoney" v-model="expressiveMoney" type="number" class="postal-input" value="" placeholder-style="font-size:14px;color:#AEB3C0" placeholder="请输入提现金额" />
			</view>
		</view>
		<!-- tixian -->
		<view class="postal-wen">
			<text class="postal-text-miao">可提现金额{{yindata.withdrawAmount}}</text>
			<text @click="whole" class="postal-ti">全部提现</text>
		</view>
		<!-- 按钮 -->
		<view class="postal-ti-box">
			<view class="postal-btn" @click="expressive">
				提现
			</view>
			<view class="postal-btn mtop" @click="back">
				返  回
			</view>
			<view class="postal-ci">
				*本月可提现次数{{dataJson.num}}次
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
				types:null,
				Withdrawable:500,//可提现金额
				expressiveMoney:'',//提现金额
				dataJson:'',
				id:'',//银行卡id
				money:'',
				yindata:{},
				companyName:''
			}
		},
		onLoad(options) {
			this.types=options.types;
		},
		onShow() {
			// this.types=options.type;
			// this.Withdrawable=options.money
			this.queryBankInfo()
			this.getQueryBasicInfo()
		},
		methods: {
			back(){
				console.log(111)
				// uni.redirectTo({
				// 	url: '../businessHome/businessHome?idx=2&type=2'
				// )
				uni.redirectTo({
					url: '../businessHome/businessHome?idx=2&type=2'
				});
			},
			// 查询银行信息
			getQueryBasicInfo(){
				let self=this
				let param={
					
				}
				http.Request(api.queryBasicInfo,'POST',param,function(res){
					console.log(res)
					self.yindata=res
					self.companyName=res.companyName
				})				
			},
			// 查询银行卡信息
			queryBankInfo(){
				let self=this
				let param={
				}
				http.Request(api.queryBankInfo,'POST',param,function(res){
					console.log(res)
					self.dataJson=res
					self.id=res.id
				})					
			},
			postalAdd(type,companyName){
				uni.navigateTo({
					url: '../postalAdd/postalAdd?types='+type+'&companyName='+companyName
				});
			},
			// 全部提现
			whole(){
				this.expressiveMoney=this.Withdrawable
			},
			// 检测金额
			shuMoney(){
				if(this.expressiveMoney*1>this.Withdrawable*1){
					console.log(this.expressiveMoney)
					// this.expressiveMoney=this.Withdrawable
					// uni.showToast({
					//     icon:"none",
					//     title:"纵向滚动 scrollTop 值已被修改为 0"
					// })
				}
			},
			// 提现
			expressive(){
				if(this.expressiveMoney*1>this.Withdrawable*1){
					uni.showToast({
					    icon:"none",
					    title:"提现金额超限"
					})
					return
				};
				if(!this.id){
					uni.showToast({
					    icon:"none",
					    title:"请添加银行卡"
					})
					return
				}
				if(this.expressiveMoney==''){
					uni.showToast({
					    icon:"none",
					    title:"提现金额不可为空"
					})
					return
				}
				if(this.expressiveMoney*1==0){
					uni.showToast({
					    icon:"none",
					    title:"提现金额有误"
					})
					return
				}
				this.withdraw()
				console.log(this.expressiveMoney)
			},
			// 提现接口
			withdraw(){
				let self=this
				let param={
					amount:self.expressiveMoney,
					id:self.id
				}
				http.Request(api.withdraw,'POST',param,function(res){
					console.log(res)
					// self.dataJson=res
					uni.navigateTo({
					    url: '../businessHome/businessHome?idx=2&type=2'
					});
				})					
			}
		}
	}
</script>

<style>
@import url("./index.css");
</style>
