<template>
	<view class="postal-box">
		<view class="postal-top">
			<view v-if="types==2" class="postal-bank">
				<view class="postal-header">
					到账银行卡
				</view>
				<view class="postal-bank-content">
					<view class="postal-bank-xx">
						<image class="postal-bank-icon" src="/static/image/b1.png" mode=""></image>
						<view class="postal-bank-name">
							工商银行
						</view>
					</view>
					<view class="postal-time">
						2小时到账
					</view>
				</view>
			</view>
			<view v-else class="postal-none" @click="postalAdd">
				<view class="postal-add-btn">
					添加银行卡
				</view>
				<view class="postal-add-icon">
					+
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
			<text class="postal-text-miao">可提现金额{{Withdrawable}}</text>
			<text @click="whole" class="postal-ti">全部提现</text>
		</view>
		<!-- 按钮 -->
		<view class="postal-ti-box">
			<view class="postal-btn" @click="expressive">
				提现
			</view>
			<view class="postal-ci">
				*本月可提现次数2次
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				types:null,
				Withdrawable:500,//可提现金额
				expressiveMoney:'',//提现金额
			}
		},
		onLoad(options) {
			this.types=options.type
		},
		methods: {
			postalAdd(){
				uni.navigateTo({
					url: '../postalAdd/postalAdd'
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
					this.expressiveMoney=this.Withdrawable
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
				}
				console.log(this.expressiveMoney)
			}
		}
	}
</script>

<style>
@import url("./index.css");
</style>
