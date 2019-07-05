<template>
  <div class="init monthWater">
  	<Condition  @getList = "getMonthWater" :conditionNum = "conditionNum"></Condition>
   <div class="water" id = "water"></div>
  
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
		getMonthWater(s,entityID,startTime,endTime){//月度用电
			this.s = s,
			this.entityID = entityID,
			this.startTime = startTime,
			this.endTime = endTime;
			this.axios.get('http://222.180.250.162:'+this.GLOBAL.host+'/Api/V3/GetConsum4Month',
				{params:{auth:"",token:this.token,scope:this.s,entityID:this.entityID,startTime:this.startTime,endTime:this.endTime,type:1}})

			.then((response)=>{
				console.log(response.data);
				var monthWaterData = response.data.Rows
				this.monthWater(monthWaterData)
			})
			.catch((err)=>{
				console.log(err);
			})

		},
		monthWater(monthWaterData){
				var seriesArr = [];
	            var legendData = [];
	            var symbol = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'];
	            for(let i = 0;i<monthWaterData.length;i++){
	            	var data = {};
	            	data = {
				            name:monthWaterData[i].Name,
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
				            data:monthWaterData[i].YAxis,
				        },
				        seriesArr.push(data);
				        legendData.push(monthWaterData[i].Name);
				        
	            	
	            }
	            var option = {
				    title: {
				        text: '月度用水统计',
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
				        data: monthWaterData[0].XAxis
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
	            let myChart = this.$echarts.init(document.getElementById("water"));
  				myChart.setOption(option);

		},
		

	}
	
};
</script>


<style lang = "scss" scoped>
@import '../../assets/scss/util.scss';
.monthWater{
	.water{
		width: 100%;
		height: 600px;
		padding: 0 20px;
		margin-top: 50px;

	}

}

</style>
