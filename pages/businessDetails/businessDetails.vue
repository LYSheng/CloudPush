<template>
	<view class="business-detail">
		<view class="business-lists">
			<view class="business-left">
				<image class="business-icon" :src="BusinessImg" mode=""></image>
			</view>
			<view  class="business-con">
				<view class="business-title">
					<text>{{DetailsData.name}}</text>
					<image @click="call" v-if='allocationBtn' src="../../static/image/phone.png" mode="aspectFit" ></image>
				</view>
				<view class="business-text">
					{{DetailsData.address}}
				</view>
				<view class="business-text">
					商家负责人：{{DetailsData.leadingName}}
				</view>
			</view>
			<view class="business-right">
				<view class="business-biao">
					{{DetailsData.merchantCategorySecond}}
				</view>
				<button v-if='!allocationBtn' @click="call">联系商家</button>
				<button v-if='allocationBtn' @click="allocation">分配</button>
			</view>
		</view>
		<view class="business-infolist">
			<view class="member" v-if='isMember'>
				<view class="list">
					<text>业务员</text>
					<text>{{DetailsData.marketUserName}}</text>
				</view>
				<view class="list">
					<text>累计收益（元）</text>
					<text>{{DetailsData.totalIncome}}</text>
				</view>
				<view @click="purchase" class="list">
					<text>进货</text>
					<image src="../../static/image/detailsIcon.png" mode="aspectFill"></image>
				</view>
				<view @click="settledIn" class="list">
					<text>入驻</text>
					<image src="../../static/image/detailsIcon.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="common" v-else>
				<view class="list">
					<text>商家保护结束时间</text>
					<text>{{DetailsData.expiredTime}}</text>
				</view>
				<view class="text">
					<text>注：该商家还未成为会员商家，请在保护期内尽快联系商家购买会员，保护期结束后可与其他业务员关联绑定关系</text>
				</view>
			</view>
		</view>
		<mpvue-picker ref="mpvuePicker" :mode="Picker.mode" :pickerValueDefault="Picker.pickerValueDefault" @onConfirm="Picker.onConfirm" @onCancel="Picker.onCancel" :pickerValueArray="Picker.data"></mpvue-picker>
	</view>
</template>

<script>
	import mpvuePicker from '../../components/ly-picker.vue';
	import http from '../../utils/http.js'
	import api from '../../utils/api.js'
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				isMember:false,
				id:'',
				Picker:{
					data:[{
					  label: '活动费',
					  value: 2
					}],
					mode:'selector',
					pickerValueDefault: [0],
					onConfirm: () => { this.pickerok() },
					onCancel: (e) => { this.$refs.mpvuePicker.hide(); },
				},
				allocationBtn:false,
				DetailsData:{},
				BusinessImg:'',
			}
		},
		onLoad(options) {
			let type = options.type;
			if(type){
				this.isMember = type == 3?true:false;
				this.id = options.id;
			}
			this.getDetailsData();
		},
		methods: {
			// 获取数据
			getDetailsData(){
				let data = {
					merchantId: this.id
				};
				http.Request(api.businessDetails, 'POST', data, (res) => {
					this.DetailsData = res;
					let imgsrc = res.type == 1? "bb2" : res.type == 2? "b1" : "bb1";
					this.BusinessImg = '/static/image/' + imgsrc + '.png';
				});
			},
			// 进货
			purchase(){
				uni.redirectTo({
					url: '../purchase/purchase?merchantId=' + this.DetailsData.id
				});
			},
			// 入驻
			settledIn(){
				uni.redirectTo({
					url: '../settledIn/settledIn?merchantId=' + this.DetailsData.id
				});
			},
			allocation(phone){
				this.$refs.mpvuePicker.show();
			},
			call(){
				uni.makePhoneCall({
				    phoneNumber: this.DetailsData.phone
				});
			},
			pickerok(){
				console.log("ok")
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.scss";
	
</style>
