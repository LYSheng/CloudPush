<template>
	<view class="income-list-box">
		<view class="list-box-top"> 
			<view class="income-list-top">
				<image class="incomeListTopImg" src="/static/image/b1.png" mode=""></image>
				<view class="income-detail-box">
					<view v-if="types==0" class="income-detail-title">
						累计入驻奖励金额（元）
					</view>
					<view v-if="types==1" class="income-detail-title">
						累计交易分佣金额（元）
					</view>
					<view v-if="types==2" class="income-detail-title">
						累计提现金额（元）
					</view>
					<view class="income-detail-money">
						397,999,00
					</view>
				</view>
				<view class="income-bian">
					
				</view>
			</view>
		</view>
		<!-- list -->
		<view class="income-uls">
			<view class="income-li">
				<view class="income-jiaobiao">
					个人
				</view>
				<view class="income-li-left">
					<view class="income-name">
						杨老板的小店
					</view>
					<view class="income-yuan">
						业务员：杨某
					</view>
					<view class="income-time">
						<text>2018-09-13</text>
						<text>12:30:98</text>
					</view>
				</view>
				<view class="income-li-right">
					￥345，67
				</view>
			</view>
			<view class="income-li">
				<view class="income-jiaobiaoge ">
					公司
				</view>
				<view class="income-li-left">
					<view class="income-name">
						杨老板的小店
					</view>
					<view class="income-yuan">
						业务员：杨某
					</view>
					<view class="income-time">
						<text>2018-09-13</text>
						<text>12:30:98</text>
					</view>
				</view>
				<view class="income-li-right">
					￥345，67
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				types:0,
			}
		},
		onLoad(options) {
			this.types=options.type
			if(this.types==0){
				uni.setNavigationBarTitle({
				　　title:'入驻奖励'
				})
			}else if(this.types==1){
				uni.setNavigationBarTitle({
				　　title:'交易分佣'
				})
			}
		},
		methods: {
			
		}
	}
</script>

<style>
@import url("./index.css");
</style>
