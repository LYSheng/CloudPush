<template>
	<view class="income-box">
		<scroll-view class="shua" :scroll-top="scrollTop" scroll-y="true" @scrolltoupper="upper" @scrolltolower="lower">

		
		<view class="income-top">
			<view class="income-top-left">
				<image src="/static/image/s1.png" class="income-img" mode=""></image>
			</view>
			<view v-if="dataJson.transAmount*1>0" class="income-right">
				<view class="income-name">
					企业业绩
				</view>
				<view class="income-num">
					{{dataJson.transAmount}}
				</view>
			</view>
			
			<view class="income-content">
				<view class="income-content-left">
					<image src="/static/image/shouicon.png" class="income-content-img" mode=""></image>
					<view class="income-text-box">
						<view class="income-title">
							可提现总金额（元）
						</view>
						<view v-if="dataJson.withdrawAmount*1>0" class="income-money">
							{{dataJson.withdrawAmount}}
						</view>
						<view v-else class="income-money">
							0.00
						</view>
					</view>
				</view>
				<view @click="postal(dataJson.withdrawAmount,types)" class="income-content-right">
					提现
				</view>
			</view>
		</view>
		<view class="income-ul">
			<view class="income-list">
				
			</view>
			<view @click="residence(0,dataJson.totalPrizeAmount,dataJson.id)" class="income-list">
				<view class="income-list-name">
					入驻奖励
				</view>
				<view class="income-list-more">
					<image  class="income-list-more" src="/static/image/more.png" mode=""></image>
				</view>
			</view>
			<view  @click="residence(1,dataJson.totalCommissionAmount,dataJson.id)" class="income-list">
				<view class="income-list-name">
					交易分佣
				</view>
				<!-- <view class="income-list-more"> -->
					<image  class="income-list-more" src="/static/image/more.png" mode=""></image>
					
				<!-- </view> -->
			</view>
			<view @click="residence(2,dataJson.historyWithdrawAmount,1)" class="income-list">
				<view class="income-list-name">
					提现记录
				</view>
				<view class="income-list-more">
					<image  class="income-list-more" src="/static/image/more.png" mode=""></image>
					
				</view>
			</view>
		</view>
		</scroll-view>
	</view>
</template>

<script>
	import http from '../../utils/http.js'
	import api from '../../utils/api.js'
	
	export default {
		props:{
			types:null
		},
		data() {
			return {
				dataJson:{}
			}
		},
		onBackPress(options) {
			console.log('onBackPress')
		    if (options.from === 'navigateBack') {
		      return false;
		    }
		    // this.onreturn();
		    return true;
		  },
		mounted(){
			console.log('mounted')
		},
		beforeCreate(){
			console.log('beforeCreate')
		},
		created(){
			console.log('created')
			console.log(this)
			this.setColor()
			if(this.types==1){ //个人
				uni.setNavigationBarTitle({
				　　title:'我的收入'
				})
				
			}else if(this.types==2){//企业
				uni.setNavigationBarTitle({
				　　title:'企业收入'
				})
			}
			this.getQueryBasicInfo()
		},
		onLoad(){
			
		},
		// computed:{
		// 	console.log(111)
		// },
		onPullDownRefresh() { 
			 // console.log(22222)
		     this.getQueryBasicInfo()
		},
		onReady(){
			console.log(111)
		},
		methods: {
			// 顶部事件
			upper(e){
				console.log(e)
			},
			// 底部事件
			lower(e){
				console.log(e)
			},
			setColor(){
			     uni.setNavigationBarColor({
			         // 字体颜色 仅支持 #ffffff 和 #000000
			         frontColor: '#ffffff',
					 titleSize:'16px',
			         //     背景颜色值，有效值为十六进制颜色
			         backgroundColor: '#545DFF',
			     });
			},
			residence(type,money,id){
				if(type==2){
					uni.navigateTo({
						url: '../discountRecord/discountRecord?type='+type+'&money='+money+'&id='+id
					});
				}else{
					uni.navigateTo({
						url: '../residenceAward/residenceAward?type='+type+'&money='+money+'&id='+id
					});
				}
				
			},
			// 提现
			postal(money,types){
				// if(this.dataJson.withdrawAmount*1<=0){
				// 	console.log('您还没有可提现金额')
				// 	return 
				// }
				uni.navigateTo({
					url: '../postal/postal?money='+money+'&types='+types
				});
			},
			getQueryBasicInfo(){
				let self=this
				let param={
					
				}
				http.Request(api.queryBasicInfo,'POST',param,function(res){
					console.log(res)
					self.dataJson=res
				})				
			}
		}
	}
</script>

<style>
@import url("./index.css");
</style>
