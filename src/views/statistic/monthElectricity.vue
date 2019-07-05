<template>
  <div class="init monthElect">
  	<Condition  @getList = "getMonthElect" :conditionNum = "conditionNum"></Condition>
   <div class="elect" id = "elect"></div>
  
  </div>
</template>

<script>
import Condition from "../../components/condition.vue"

export default {
	components:{
		Condition,

	},
	data() {
	  return {
	  	token: localStorage.getItem("token"),
	  	conditionNum:10,
	  	s:0,
	  	entityID:'',
	  	startTime:'',
	  	endTime:'',
	  	
	  }
	},
	
	methods:{
		getMonthElect(s,entityID,startTime,endTime){//月度用电
			this.s = s,
			this.entityID = entityID,
			this.startTime = startTime,
			this.endTime = endTime;
			this.axios.get('http://222.180.250.162:'+this.GLOBAL.host+'/Api/V3/GetConsum4Month',
				{params:{auth:"",token:this.token,scope:this.s,entityID:this.entityID,startTime:this.startTime,endTime:this.endTime,type:0}})

			.then((response)=>{
				console.log(response.data);
				var monthElectData = response.data.Rows
				this.monthElect(monthElectData)
			})
			.catch((err)=>{
				console.log(err);
			})

		},
		monthElect(monthElectData){
				var seriesArr = [];
	            var legendData = [];
	            var symbol = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'];
	            for(let i = 0;i<monthElectData.length;i++){
	            	var data = {};
	            	data = {
				            name:monthElectData[i].Name,
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
				            data:monthElectData[i].YAxis,
				        },
				        seriesArr.push(data);
				        legendData.push(monthElectData[i].Name);
				        
	            	
	            }
	            var option = {
				    title: {
				        text: '月度用电统计',
				        textStyle:{
				        	color:'#fff'
				        }
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    legend: {
				        data:legendData,
				        x:'center',
				        textStyle:{
				        	color:'#fff'
				        }
				    },
				    grid: {
				        left: '6%',
				        right: '4%',
				        bottom: '5%',
				        containLabel: false
				    },
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        axisLine: {
		                    lineStyle: {
		                        type: 'solid',
		                        color: '#fff',//左边线的颜色
		                        width:'1'//坐标线的宽度
		                    }
		                },
				        data: monthElectData[0].XAxis
				    },
				    yAxis: {
				        type: 'value',
				        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        axisLine: {
		                    lineStyle: {
		                        type: 'solid',
		                        color: '#fff',//左边线的颜色
		                        width:'1'//坐标线的宽度
		                    }
		                },
			            // axisTick:{       //刻度线
			            //     show:false
			            // },
			            splitLine: {
			                show: false
			            },
			            // axisLabel :{
			            //     show:false,
			                
			            // }
				    },
				    series:seriesArr,
				};
	            let myChart = this.$echarts.init(document.getElementById("elect"));
  				myChart.setOption(option);

		},
		

	}
	
};
</script>


<style lang = "scss" scoped>
@import '../../assets/scss/util.scss';
.monthElect{
	.elect{
		width: 100%;
		height: 600px;
		padding: 0 20px;
		margin-top: 50px;

	}

}

</style>
