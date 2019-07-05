
<template>
	<header>
		<div class="logo fl">设施设备管理云平台</div>
		<div class="time fl">{{nowTime}}</div>
		<div class="user-name fr">
			<img src="../assets/images/home/user_name_icon.png" alt="">
			<span>{{userName}}</span>
		</div>

	</header>

</template>

<script>
	export default{
		data (){
			return{
				nowTime:"",
				userName:''
			}
		},
		methods:{
			// 获取当前时间函数
		  	timeFormate () {
			  	let time = new Date();
			    let year = time.getFullYear();
			    let month =time.getMonth() + 1 < 10? "0" + (time.getMonth() + 1): time.getMonth() + 1;
			    let date =time.getDate() < 10? "0" + time.getDate(): time.getDate();
			    let hh =time.getHours() < 10? "0" + time.getHours(): time.getHours();
			    let mm =time.getMinutes() < 10? "0" + time.getMinutes(): time.getMinutes();
			    let ss =time.getSeconds() < 10? "0" + time.getSeconds(): time.getSeconds();
			      
			    this.nowTime = year + "/" + month + "/" + date +"　"+hh+":"+mm +":"+ss;
		    },
		    getToken(){
				this.axios.get('http://222.180.250.162/Api/V3/Login',{params:{auth:"11",userName:"zwtest1",pwd:"111111",cpy:"zwwy"}})
				.then((response)=>{
					//console.log(response.data);
					this.userName=response.data.Rows.Name;
					localStorage.setItem("token",response.data.Rows.Token);

				})
				.catch((err)=>{
					console.log(err);
				})
			},

		},

		mounted(){
			this.getToken();
			var _this = this;
			this.$nextTick(function () {
				this.timeFormate();
				setInterval(_this.timeFormate,1000);
			})
		    
		},
	};


</script>

<style lang="scss" scoped>
 @import '../assets/scss/util.scss';

	header{
		width: 100%;
		height: 90px;
		background: #0f1117;
		.logo{
			color: #0191f4;
			
			line-height: 90px;
			margin-left: 30px;
			font-size: pxTorem(20px);
		}
		.time{
			color:#cccccc;
			line-height: 90px;
			margin-left: 36px;
			font-size: pxTorem(16px);
		}
		.user-name{
			color:#cccccc;
			line-height: 90px;
			margin-right: 40px;
			img{
				margin-top: 30px;
				margin-right: 10px;
			}
		}

	}

</style>