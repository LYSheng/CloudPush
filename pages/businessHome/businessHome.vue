<template>
	<view>
		<view class="Main">
			<businessManag v-if='ShowPage == "商家管理"'></businessManag>
			<Income v-if='ShowPage == "企业收入"' ></Income>
			<BusinessStaff v-if='ShowPage == "员工管理"' ></BusinessStaff>
			<BusinessMine v-if='ShowPage == "企业"' ></BusinessMine>
			
			<Home v-if='ShowPage == "商家入驻"' ></Home>
			<Business v-if='ShowPage == "我的商家"' ></Business>
			<Income v-if='ShowPage == "我的收入"' ></Income>
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
		<Loading :isShow="LoadingShow"></Loading>
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
				permission: 1,
				FooterList:[],
				ShowPage:"",
				LoadingShow:false,
			};
		},
		onLoad(options) {
			if(options.type==2){
				this.permission=2
			}
			let { permission } = this;
			switch(permission)
			{
				case 1:
					this.FooterList = [
						{icon:'../../static/image/f11.png', icon1:"../../static/image/f12.png", active:true, text:"商家管理"}, 
						{icon:'../../static/image/f21.png', icon1:"../../static/image/f22.png", active:false, text:"员工管理"},
						{icon:'../../static/image/t41.png', icon1:"../../static/image/t42.png", active:false, text:"企业收入"},
						{icon:'../../static/image/t21.png', icon1:"../../static/image/t22.png", active:false, text:"企业"},
					]
					this.ShowPage = this.FooterList[0].text;
					break;
				case 2:
					this.FooterList = [
						{icon:'../../static/image/t11.png', icon1:"../../static/image/t12.png", active:true, text:"商家入驻"}, 
						{icon:'../../static/image/t31.png', icon1:"../../static/image/t32.png", active:false, text:"我的商家"},
						{icon:'../../static/image/t41.png', icon1:"../../static/image/t42.png", active:false, text:"我的收入"},
						{icon:'../../static/image/t21.png', icon1:"../../static/image/t22.png", active:false, text:"我的"},
					]
					this.ShowPage = this.FooterList[0].text;
					break;
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
					}
				});
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.Main{
		width: 100%;
		height: 100%;
		padding-bottom: 100upx;
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
