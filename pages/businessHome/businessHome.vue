<template>
	<view class="business-home-box">
		<view class="Main">
			<businessManag v-if='ShowPage == "商家管理"'></businessManag>
			<Income :types='2' v-if='ShowPage == "企业收入"' ></Income>
			<BusinessStaff v-if='ShowPage == "员工管理"' ></BusinessStaff>
			<BusinessMine v-if='ShowPage == "企业"' ></BusinessMine>
			
			<Home v-if='ShowPage == "商家入驻"' ></Home>
			<Business v-if='ShowPage == "我的商家"' ></Business>
			<Income :types='1' v-if='ShowPage == "我的收入"' ></Income>
			<Mine v-if='ShowPage == "我的"' ></Mine>
		</view>
		<view class="Footer">
			<view v-for="(item,index) in FooterList" :key='index' @click="active(index)" :class='[item.active?"active":""]'>
				<view>
					<image :src="item.active?item.icon1:item.icon" mode="aspectFit"></image>
				</view>
				<text>{{item.text}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	import businessManag from '../businessManag/businessManag';
	import Home from '../home/home';
	import Business from '../business/business'
	import Income from '../income/income'
	import BusinessMine from '../businessMine/businessMine'
	import BusinessStaff from '../businessStaff/businessStaff'
	import Mine from '../mine/mine'
	export default {
		components:{
			businessManag,
			Home,
			Business,
			Income,
			Mine,
			BusinessStaff,
			BusinessMine
		},
		data() {
			return {
				permission: 2,
				FooterList:[],
				ShowPage:"",
				LoadingShow:false,
				ShowIdx:null,
			};
		},
		onLoad(options) {
			console.log(options.type)
			let { permission } = this;
			if(options.type){
				this.permission = options.type*1;
			}
			console.log(this.permission)
			switch(this.permission)
			{
				case 1:
					this.FooterList = [
						{icon:'../../static/image/f11.png', icon1:"../../static/image/f12.png", active:true, text:"商家管理",com:businessManag}, 
						{icon:'../../static/image/f21.png', icon1:"../../static/image/f22.png", active:false, text:"员工管理",com:BusinessStaff},
						{icon:'../../static/image/t41.png', icon1:"../../static/image/t42.png", active:false, text:"企业收入",com:Income},
						{icon:'../../static/image/t21.png', icon1:"../../static/image/t22.png", active:false, text:"企业",com:BusinessMine},
					]
					this.ShowPage = this.FooterList[0].text;
					break;
				case 2:
					this.FooterList = [
						{icon:'../../static/image/t11.png', icon1:"../../static/image/t12.png", active:true, text:"商家入驻",com:Home}, 
						{icon:'../../static/image/t31.png', icon1:"../../static/image/t32.png", active:false, text:"我的商家",com:Business},
						{icon:'../../static/image/t41.png', icon1:"../../static/image/t42.png", active:false, text:"我的收入",com:Income},
						{icon:'../../static/image/t21.png', icon1:"../../static/image/t22.png", active:false, text:"我的",com:Mine},
					]
					this.ShowPage = this.FooterList[0].text;
					break;
			}
			
			if(options.idx){
				let { FooterList } = this;
				FooterList.map((item,index) => {
					FooterList[index].active = false;
				})
				let ac = this.FooterList[options.idx];
				this.ShowPage = ac.text;
				ac.active = true;
			}
		},
		onShow(){
			if(this.ShowIdx){
				if(this.FooterList[this.ShowIdx].com.onShow){
					this.FooterList[this.ShowIdx].com.onShow();
				}
			}
		},
		methods:{
			active(idx){
				let { FooterList } = this;
				FooterList.map((item,index) => {
					FooterList[index].active = false;
					if(index === idx){
						FooterList[idx].active = true;
						this.ShowPage = FooterList[idx].text;
						this.ShowIdx = idx;
						if(item.com.onShow){
							item.com.onShow();
						}
						if( this.permission == 1){
							uni.setNavigationBarTitle({
							　　title: FooterList[idx].text
							});
						}
					}
				});
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.business-home-box{
		display: flex;
		flex-direction:column;
		height:100%;     
	}
	.Main{
		width: 100%;
		// height: 100%;
		// padding-bottom: 100upx;
		flex: 1;
		overflow-y: auto;
	}
	.Footer{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100upx;
		border-top: 1px solid #ccc;
		background-color: #fff;
		z-index: 999;
		& > view{
			display: inline-block;
			width: calc(100% / 4);
			text-align: center;
			font-size: 0;
			padding: 15upx 0;
			image{
				width: 48upx;
				height: 48upx;
			}
			text{
				color: #9F9F9F;
				font-size: 20upx;
			}
		}
		.active{
			text{
				color: #545DFF;
			}
		}
	}

</style>
