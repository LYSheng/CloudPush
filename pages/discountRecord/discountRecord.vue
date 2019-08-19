<template>
	<view class="income-list-box">
		<view class="list-box-top"> 
			<view class="income-list-top">
				<image class="incomeListTopImg" src="/static/image/b1.png" mode=""></image>
				<view class="income-detail-box">
					<view class="income-detail-title">
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
				<view class="income-li-left">
					<view class="income-txz">
						提现中
					</view>
			<!-- 		<view class="income-gg">
						提现成功
					</view>
					<view class="income-fail">
						提现失败
					</view> -->
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
				
				<view class="income-li-left">
					<view class="income-gg">
						提现成功
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
				
				<view class="income-li-left">
					<view class="income-fail">
						提现失败
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
			
		},
		methods: {
			
		}
	}
</script>

<style>
@import url("./index.css");
</style>
