<template>
	<view class="income-box">
		<view class="income-top">
			<view class="income-top-left">
				<image src="/static/image/s1.png" class="income-img" mode=""></image>
			</view>
			<view class="income-right">
				<view class="income-name">
					企业业绩
				</view>
				<view class="income-num">
					27,889,00
				</view>
			</view>
			
			<view class="income-content">
				<view class="income-content-left">
					<image src="/static/image/shouicon.png" class="income-content-img" mode=""></image>
					<view class="income-text-box">
						<view class="income-title">
							可提现总金额（元）
						</view>
						<view class="income-money">
							277,888,99
						</view>
					</view>
				</view>
				<view @click="postal" class="income-content-right">
					提现
				</view>
			</view>
		</view>
		<view class="income-ul">
			<view class="income-list">
				
			</view>
			<view @click="residence(0)" class="income-list">
				<view class="income-list-name">
					入驻奖励
				</view>
				<view class="income-list-more">
					<image  class="income-list-more" src="/static/image/more.png" mode=""></image>
				</view>
			</view>
			<view  @click="residence(1)" class="income-list">
				<view class="income-list-name">
					交易分佣
				</view>
				<!-- <view class="income-list-more"> -->
					<image  class="income-list-more" src="/static/image/more.png" mode=""></image>
					
				<!-- </view> -->
			</view>
			<view @click="residence(2)" class="income-list">
				<view class="income-list-name">
					提现记录
				</view>
				<view class="income-list-more">
					<image  class="income-list-more" src="/static/image/more.png" mode=""></image>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			types:null
		},
		data() {
			return {
				
			}
		},
		created(){
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
			
		},
		methods: {
			setColor(){
			     uni.setNavigationBarColor({
			         // 字体颜色 仅支持 #ffffff 和 #000000
			         frontColor: '#ffffff',
					 titleSize:'16px',
			         //     背景颜色值，有效值为十六进制颜色
			         backgroundColor: '#545DFF',
			         // animation 结构
			         // animation: {
			             // duration: 动画时间
			             // duration: 500,
			             // timingFunc:动画效果
			                 // linear    动画从头到尾的速度是相同的。
			                 // easeIn    动画以低速开始
			                 // easeOut    动画以低速结束。
			                 // easeInOut    动画以低速开始和结束
			             // timingFunc: 'easeIn'
			         // }
			     });
			},
			residence(type){
				if(type==2){
					uni.navigateTo({
						url: '../discountRecord/discountRecord?type='+type
					});
				}else{
					uni.navigateTo({
						url: '../residenceAward/residenceAward?type='+type
					});
				}
				
			},
			// 提现
			postal(){
				uni.navigateTo({
					url: '../postal/postal'
				});
			}
		}
	}
</script>

<style>
@import url("./index.css");
</style>
