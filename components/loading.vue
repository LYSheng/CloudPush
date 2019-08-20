<template name='loading'>
	<view class="loadingBox" v-show="is_loading" >
		<view>
			<image src="../static/image/loading.gif" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
	import store from '../store/store'
	import * as types from '../store/types'
	
	export default {
		name: 'loading',
		props:{
			isShow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			};
		},
		computed:{
            is_loading(){
				console.log(store.state.LOADING)
                return store.state.loading
            }
        }
	}
</script>

<style lang="scss" scoped>
	.loadingBox{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: transparent;
		& > view{
			position: absolute;
			top: 45%;
			left: 50%;
			width: 350upx;
			height: 350upx;
			transform: translate(-50%,-50%);
			-webkit-transform: translate(-50%,-50%);
			background-color: #fff;
			box-shadow:0px 4px 20px 0px rgba(41,47,76,0.1);
			border-radius:16upx;
			image{
				max-width: 100%;
				max-height: 100%;
			}
		}
	}
	

</style>
