import sha1 from 'sha1'
import {Base64} from 'js-base64'
import CryptoJS from 'crypto-js';
// const  baseUrl='https://api30.chuanhuoapp.com';
const  baseUrl='https://api.chuanhuoapp.com';

export default {
	LoginPost(url,data,success,fail){
		uni.request({
			url: baseUrl + url,
			data: data,
			method: 'POST',
			header: {
				 'Content-Type': 'application/x-www-form-urlencoded',
				 'x-firebird-terminal':'XCX_WX',
				// "Content-Type": "application/json"
			},
			// dataType: 'json',
			success: function (res) {
				console.log(res)
				if(res.statusCode==200){
					if(res.data.code==200){
						let result=res.data.data
						return success(result)
					}else if(res.data.code==10102){
						// 退出登录
						uni.navigateTo({
							url: '../pages/login/login'
						});
					}else{
						uni.showToast({
							icon:'none',
							title: res.data.error_txt
						});
					}
				}else{
					uni.showToast({
						icon:'none',
						title: res.data.error
					});
				}
			},
			fail: function (res) {
				console.log(res)
				uni.showToast({
					icon:'none',
					title: res.errMsg
				});
			}
		})
	},
	Request(url,type,data,success,fail){
		console.log(data)
		console.log(data.length)
		let self=this;
		// let newData=this.toParams(data)
		let newData=self.jsonSort(data)
		// console.log(twoData)
		console.log(newData)                                      
		const time = Date.parse(new Date())/1000;
		let token=uni.getStorageSync('token');
		let uid=uni.getStorageSync('uid');
		let secret=uni.getStorageSync('secret');
		let CanonicalizedHeaders='x-firebird-uid:' + uid +
		'\n' + 'x-firebird-time:' + time +
		'\n' + 'x-firebird-terminal:XCX_WX';
		let CanonicalizedParmas=newData
		let string=type + "\n"
						+ url + "\n"
						+ token + "\n"
						+ CanonicalizedHeaders + "\n"
						+ CanonicalizedParmas + "\n"
		console.log(CanonicalizedParmas)
		console.log(string)
		console.log(secret)
		
		let Signature= encodeURIComponent(CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(string,secret)));
		console.log(Signature)
		uni.request({
			url: baseUrl + url,
			data: data,
			method: type,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'x-firebird-authorization':' Basic ' + token + ':' + Signature,
				'x-firebird-time':time,
				'x-firebird-terminal':'XCX_WX',
				'x-firebird-uid':uid
			},
			// dataType: 'json',
			success: function (res) {
				console.log(res)
				if(res.statusCode==200){
					if(res.data.code==200){
						let result=res.data.data
						return success(result)
					}else if(res.data.code==10102){
						// 退出登录
						uni.showToast({
							icon:'none',
							title: res.data.error_txt
						});
						uni.navigateTo({
							url: '/pages/login/login?type=1'
						});
					}else{
						uni.showToast({
							icon:'none',
							title: res.data.error_txt
						});
					}
				}else{
					uni.showToast({
						icon:'none',
						title: res.data.error
					});
				}
			},
			fail: function (res) {
				console.log(res)
				uni.showToast({
					icon:'none',
					title: res.errMsg
				});
			}
		})
	},
	get (url,data,success,fail) {
		uni.request({
			url: baseUrl + url,
			data: data,
			method: 'GET',
			header: {
				 // 'Content-Type': 'application/x-www-form-urlencoded',
				"Content-Type": "application/json"
			},
			success: function (res) {
				console.log(res)
				if(res.statusCode==200){
					let result=res.data
					return success(result)
				}else{
					uni.showToast({
						title: res.data.message
					});
				}
			},
			fail: function (res) {
				console.log(res)
				uni.showToast({
					title: res.message
				});
			}
		})
	},
	toParams(param) {
		var result = ""
		for (let name in param) {
			if (typeof param[name] != 'function') {
				let value=''
				if(param[name]==undefined){
					value=''
				}else{
					value=encodeURIComponent(param[name]) 
					// value=param[name]
				}
				result += "&" + name + "=" + value;
			}
		}
		return result.substring(1)
	},
	 jsonSort(jsonObj) {
	            let arr = [];
	            for (var key in jsonObj) {
	                arr.push(key)
	            }
	            arr.sort();
	            let str = '';
	            for (var i in arr) {
	                str += arr[i] + "=" + encodeURIComponent(jsonObj[arr[i]]) + "&"
	            }
	            return str.substr(0, str.length - 1)
	}
}
