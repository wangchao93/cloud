<template>
	<div class="mark">
		<div class="pop">
			<p class="title">
				<span>变压器#1</span>
				<img src="../../assets/images/home/close_icon.png" @click = "cancel()" alt="">
			</p>
			<ul class="nav">
				<li :class="navIndex == index ? 'active' : '' " @click = "getIndex(index)" v-for = "(item,index) in navList" :key = "index">{{item}}</li>
				
			</ul>
			<div class="info" v-show = "navIndex==0">
				<p class="info-title">基础信息</p>
				<table>
					<tr>
						<td>所属系统</td>
						<td></td>
						<td>设备编号</td>
						<td>{{deviceInfo[1].Value}}</td>
						<td>功率</td>
						<td>{{deviceInfo[6].Value}}</td>
						<td>设备名称</td>
						<td>{{deviceInfo[0].Value}}</td>
					</tr>
					<tr>
						<td>设备品牌</td>
						<td>{{deviceInfo[2].Value}}</td>
						<td>设备型号</td>
						<td>{{deviceInfo[3].Value}}</td>
						<td>设备序号</td>
						<td></td>
						<td>设备原值</td>
						<td>{{deviceInfo[4].Value}}</td>
					</tr>
					<tr>
						<td>出厂日期</td>
						<td>{{deviceInfo[8].Value}}</td>
						<td>启用日期</td>
						<td>{{deviceInfo[9].Value}}</td>
						<td>折旧年限</td>
						<td>{{deviceInfo[10].Value}}</td>
						<td>设备权限</td>
						<td>{{deviceInfo[5].Value}}</td>
					</tr>
					<tr>
						<td>检查标准</td>
						<td>{{deviceInfo[11].Value}}</td>
						<td>维保方式</td>
						<td>{{deviceInfo[12].Value}}</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>规格</td>
						<td colspan="7">{{deviceInfo[14].Value}}</td>
					</tr>
					<tr>
						<td>配套设备</td>
						<td colspan="7">{{deviceInfo[15].Value}}</td>
					</tr>
					<tr>
						<td>安装位置</td>
						<td>{{deviceInfo[16].Value}}</td>
						<td>管控区域</td>
						<td>{{deviceInfo[7].Value}}</td>
					</tr>
					<tr>
						<td>安装单位</td>
						<td colspan="7">{{deviceInfo[18].Value}}</td>
					</tr>
					<tr>
						<td>安装联系人</td>
						<td>{{deviceInfo[17].Value}}</td>
						<td>手机</td>
						<td></td>
						<td>座机</td>
						<td colspan="3"></td>
					</tr>
				</table>
				
			</div> 
			<div class="maint-info" v-show = "navIndex==1">
				<p class="info-title">维保单位</p>
				<table>
					<tr>
						<td>公司名称</td>
						<td colspan="4"></td>
						<td>联系人</td>
						<td></td>
						<td>电话</td>
						<td></td>
						
					</tr>
					<tr>
						<td>合同到期</td>
						<td></td>
						<td>备注</td>
						<td colspan="6"></td>

					</tr>
				</table>
				<p class="info-title">维修保养信息</p>
				<table>
					<tr>
						<td>维修次数</td>
						<td></td>
						<td>保养次数</td>
						<td></td>
						<td>最新维修时间</td>
						<td></td>
						<td>责任人</td>
						<td></td>

					</tr>
				</table>

			</div> 

			<div class="polyline" v-show = "navIndex==2">
				<p class="power-current">{{powerCurrent}}</p>
				<div class="" id = "power" v-if = "showNoData"></div>
				
				<img class="no-data" v-else src="../../assets/images/monitor/no_data.jpg" alt="">

			</div>
			<div class="polyline" v-show = "navIndex==3">
				<div class="" id = "temperature"></div>

			</div>
			<div class="polyline" v-show = "navIndex==4">
				<div class="" id = "current"></div>

			</div>
			

			
			
		</div>

	</div>

</template>

<script>
	export default{
		data(){
			return{
				token:localStorage.getItem("token"),
				navIndex:0,
				navList:["基础信息","维保信息","用电量","变压器温度","相电流"],
				powerCurrent:'',
				showNoData:true
				
			}
		},
		props:{
			deviceInfo:{
				type:Array,
				required:true
			},
			deviceId:{
				type:String,
				required:true
			},

		},
		mounted:function(){

			
		},
		methods:{
			getIndex(index){
				this.navIndex = index;
				switch(index){
					case 2:
						this.getUserPowerData();
					break;
					case 3:
						
						this.getTempData();
					break;
					case 4:
						this.getCurrentData();
					break;

				}


			},
			getUserPowerData(){
				
			    this.axios.get('http://222.180.250.162:'+this.GLOBAL.host+'/Api/V3/Consum4Daily',{params:{auth:"",token:this.token,entityID:this.deviceId,type:0}})
			        .then((response)=>{
			            console.log(response.data);

			            var userPowerData = response.data.Rows;
			            if(userPowerData.length == 0){
			            	this.showNoData = false
			            }else{
			            	this.powerCurrent = userPowerData[0].Current;
			            	this.lineChart("power",userPowerData);
			            }
			            
			        }).catch((err)=>{
			            console.log(err);
			        });
			},
			getTempData(){
				  this.axios.get('http://222.180.250.162:'+this.GLOBAL.host+'/Api/V3/PT4Daily',{params:{auth:"",token:this.token,did:this.deviceId}})
		          .then((response)=>{
		            console.log(response.data);
		            
		            
		          }).catch((err)=>{
		            console.log(err);
		          })
			},
			getCurrentData(){
				this.axios.get('http://222.180.250.162:'+this.GLOBAL.host+'/Api/V3/Elas4Month',{params:{auth:"",token:this.token,did:this.deviceId}})
		          .then((response)=>{
		            console.log(response.data);
		            var currentData = response.data.Rows;
		            var seriesArr = [];
		            var legendData = [];
		            var symbol = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'];
		            for(let i = 0;i<currentData.length;i++){
		            	var data = {};
		            	data = {
					            name:currentData[i].Name,
					            type:'line',
					            symbol: symbol[i],
					            symbolSize: 6, 
					            // itemStyle : {
				             //        normal : {
				             //        	color:"#e45f2f",
				             //            lineStyle:{
				                           
				             //                color:"#e45f2f"//折线颜色
				             //            }
				             //        }
				             //    },
					            data:currentData[i].YAxis,
					        },
					        seriesArr.push(data);
					        legendData.push(currentData[i].Name);
					        
		            	
		            }
		            var option = {
					    title: {
					        text: ''
					    },
					    tooltip: {
					        trigger: 'axis'
					    },
					    legend: {
					        data:legendData,
					        x:'right',
					    },
					    grid: {
					        left: '3%',
					        right: '4%',
					        bottom: '5%',
					        containLabel: false
					    },
					    xAxis: {
					        type: 'category',
					        boundaryGap: false,
					        data: currentData[0].XAxis
					    },
					    yAxis: {
					        type: 'value'
					    },
					    series:seriesArr,
					};
		            let myChart = this.$echarts.init(document.getElementById("current"));
      				myChart.setOption(option);
		           
		          }).catch((err)=>{
		            console.log(err);
		          })
			},

			lineChart(idName,Data){
				var option = {
					    title: {
					        text: ''
					    },
					    tooltip: {
					        trigger: 'axis'
					    },
					    legend: {
					        data:[Data[0].Name],
					        x:'right',
					    },
					    grid: {
					        left: '3%',
					        right: '4%',
					        bottom: '5%',
					        containLabel: false
					    },
					    // toolbox: {
					    //     feature: {
					    //         saveAsImage: {}
					    //     }
					    // },
					    xAxis: {
					        type: 'category',
					        boundaryGap: false,
					        data: Data[0].XAxis
					    },
					    yAxis: {
					        type: 'value'
					    },

					    series: [
					        {
					            name:Data[0].Name,
					            type:'line',
					            symbol: 'circle',
					            symbolSize: 6, 
					            itemStyle : {
				                    normal : {
				                    	color:"#e45f2f",
				                        lineStyle:{
				                           
				                            color:"#e45f2f"//折线颜色
				                        }
				                    }
				                },
					            data:Data[0].YAxis
					        },
					        
					    ]
					};
				let myChart = this.$echarts.init(document.getElementById(idName));
      			myChart.setOption(option);
      				
			},
			cancel(){ //弹窗隐藏
				this.$emit("onoffClose",false);
		

			},


		}
	};

</script>

<style lang="scss" scoped>
	@import '../../assets/scss/util.scss';
	.mark{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		background: rgba(0,0,0,0.8);
		z-index: 100;
		.pop{
			width: 800px;
			height: 600px;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			background: #fff;
			border-radius: 4px;
			.title{
				width: 100%;
				height: 40px;
				background: #14171e;
				color:#fff;
				line-height: 40px;
				font-size: pxTorem(14px);
				span{
					padding-left: 20px;
				}
				img{
					float: right;
					margin-right: 20px;
					margin-top: 10px;
					width: 20px;
					cursor: pointer;
				}

			}
			.nav{
				width: 92%;
				margin: auto;
				border-bottom: 1px solid #cccccc;
				margin-top: 20px;
				overflow: hidden;
				li{
					float: left;
					padding: 10px 20px;
					font-size: pxTorem(14px);
					cursor: pointer;

				}
				.active{
					border-bottom: 4px solid #0097ff;
					color: #0097ff;
				}
			}
			.info-title{
				width: 100%;
				margin: auto;
				padding: 30px 0 20px 0;
				font-weight: 600;
				font-size: pxTorem(16px);
				text-align: center;
			}
			table{
				width: 92%;
				margin: auto;
				border: 1px solid #cccccc;
				tr{
					border: 1px solid #cccccc;
					td{
						height: 40px;
						border: 1px solid #cccccc;
						width: 12.5%;
						text-align: center;
						font-size: pxTorem(14px);
						&:nth-child(odd){
							background: #e6e6e6;
						}

					}
				}
			}
			.polyline{
				width: 92%;
				margin: auto;
				position: relative;
				.no-data{
					position: absolute;
					left: 0px;
					right: 0px;
					margin: auto;
					margin-top: 60px;

				}
				.power-current{
					text-align: right;
					font-size: pxTorem(22px);
					color:#e45f2f;
					margin-top: 40px;
					margin-bottom: 10px;
				}
				#power,#temperature,#current{
					width: 750px;
					height: 400px;
				}
			}
			

		}
	}

</style>