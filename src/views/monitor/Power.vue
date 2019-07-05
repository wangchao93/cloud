<template>
  <div class="init power">
  	<Condition :conditionNum = 'conditionNum'  @getList = "getPowerData"></Condition>
    <div class="house-box">
      <a href="javascript:;" :class='[ houseActive === index ? "active" : ""]' v-for = "(houseNameItem,index) in powerData" :key = "index" @click = "getHouseData(index)">{{houseNameItem.HouseName}}</a>
    </div>
  	<div class="power-content">
  		<ul class="environment-box">
  			
  			<li v-for = "(HouseEnvironments,index) in showPowerData.HouseEnvironments" :key = "index">
  				<span>{{HouseEnvironments.DisplayText}}</span>
  				<p>{{HouseEnvironments.Name}}({{HouseEnvironments.Unit}})</p>
  			</li>
  			
  		</ul>

  		<ul class="pump-box">
  			<li 
		        v-for = "(DisplayParams,index) in showPowerData.DisplayParams" 
		        :key = "index" >
  				<p class="pump-name">{{DisplayParams.DeviceName}}(压力：0.32Mpa)</p>
  				<div class="pump-content">
					
  					<el-row>
					  <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
					  	<div class="electric-work">
					  		<img src="../../assets/images/monitor/power_img.png" alt="" @click = "getPowerInfoData(DisplayParams.DeviceID)">
					  		<div class="electric-work-data">
					  			<p 
                  v-for = "(DisplayItems,DisplayItemsIndex) in DisplayParams.DisplayItems"
                  :key = "DisplayItemsIndex" 
                  v-if = "DisplayItems.SensorType > 22&&DisplayItems.SensorType < 26" 
                  >
                  {{DisplayItems.ItemText}}: 
                  <span>{{DisplayItems.DisplayText}}</span>
                </p>
					  			
					  		</div>
					  	</div>
					  </el-col>
					  <el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9">
					  	<div class="current">
					  		<ul class="current-canvas-box">
					  			<li class ="current-canvas" :id = "['current-canvas'+index]+0" ></li>
					  			<li class ="current-canvas" :id = "['current-canvas'+index]+1"></li>
					  			<li class ="current-canvas" :id = "['current-canvas'+index]+2"></li>
					  			
					  		</ul>
					  		<ul class="current-text-box">
					  			<li 
                  v-for = "(DisplayItems,DisplayItemsIndex) in DisplayParams.DisplayItems" 
                  :key = "DisplayItemsIndex" 
                  v-if = "DisplayItems.SensorType > 19 && DisplayItems.SensorType < 23"
                  >{{DisplayItems.ItemText}}</li>
					  			
					  		</ul>

					  		<ul class="current-data-box">
					  			<li 
                  v-for = "(DisplayItems,DisplayItemsIndex) in DisplayParams.DisplayItems" 
                  :key = "DisplayItemsIndex" 
                  v-if = "DisplayItems.SensorType > 16 && DisplayItems.SensorType < 20"
                  >
                  <span>{{DisplayItems.DisplayText}}</span>
                  <p>{{DisplayItems.ItemText}}({{DisplayItems.Unit}})</p>
                </li>
					  			
					  		</ul>
					  		
					  	</div>
					  </el-col>
					  <el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9">
					  	<div class="voltage" :id = "['voltage'+index]"></div>
					  </el-col>
					</el-row>
  					
  					
  				</div>
  			</li>
  		</ul>
  		
  	</div>
    <transition name = "fade">
  	   <powerInfo :deviceInfo = 'deviceInfo' :deviceId = "deviceId" v-if = "show" @onoffClose = "onoffClose" ></powerInfo>
   	</transition>
  </div>
</template>

<script>
import Condition from "../../components/condition.vue"
import powerInfo from "./powerInfo.vue"
export default {
	components:{
		Condition,
		powerInfo,
	},
  data(){
    return{
      token:localStorage.getItem("token"),
      s:0,
      entityID:'',
      powerData:[],
      deviceInfo:[],
      showPowerData:{},
      houseActive:0,
      conditionNum:3,
      deviceId:'',
      show:false,
      userPowerData:[],

    }
  },
  methods:{
  	getHouseData(index){
  		this.houseActive = index;
      this.getPowerData(this.s,this.entityID)

  	},
    getPowerData(s,entityID){
      this.s = s,this.entityID = entityID;
     
      var token = localStorage.getItem("token");

      this.axios.get('http://222.180.250.162/Api/V3/GetRealValue',{params:{auth:"",token:token,scope:this.s,entityID:this.entityID,categoryID:2}})
      .then((response)=>{
        console.log(response.data);
  
        this.powerData = response.data.Rows;
        this.showPowerData = this.powerData[this.houseActive];

      }).then(()=>{
           

            var DisplayParams = this.powerData[this.houseActive].DisplayParams;

            var SensorType,DisplayItems;

        for(var i = 0;i<DisplayParams.length;i++){

           var voltagexAxisData = [],voltageData = [],tempData = [];

            voltagexAxisData[i] = [],voltageData[i] = [];

            DisplayItems = DisplayParams[i].DisplayItems

              for(var j = 0;j< DisplayItems.length ;j++){

                SensorType = DisplayItems[j].SensorType;

                if(SensorType){

                  if( SensorType > 10 && SensorType < 17 ){ //电压

                    voltagexAxisData[i].push(DisplayItems[j].ItemText);

                    voltageData[i].push(DisplayItems[j].DisplayText);
                  }
             

                  if(SensorType > 19 && SensorType < 23 ){  //温度
                    
                      tempData.push(DisplayItems[j].DisplayText);

                  }
                
                }
 
              }
              if(voltageData[i].length != 0){

                this.voltage('voltage'+i,voltagexAxisData[i],voltageData[i]);
              }
              
              if(tempData.length != 0){
                
                this.current('current-canvas'+i+'0',tempData[0]);
                this.current('current-canvas'+i+'1',tempData[1]);
                this.current('current-canvas'+i+'2',tempData[2]);
              }
               
      }
              
             
      	
      })
      .catch((err)=>{
        console.log(err);
      })
    },
    voltage(idName,voltagexAxisData,voltageData){//电压折线图
      var option = {
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: voltagexAxisData,
             // boundaryGap: true,//轴两端空白
              axisLabel :{
                
                textStyle: {
                    color: '#cccccc'
                }
              },

          },
          yAxis: {
              name : '电压(单位：V)',
              type: 'value',
              max:500,
              nameTextStyle:{
                color:'#cccccc'
              },
              axisTick:{ //刻度线
                show:false
              },
              splitLine: {
                  show: false
              },
              axisLabel :{
                show:false,
                
              }
          },
          series: [{
              data: voltageData,
              type: 'line',
              symbolSize:7,
              symbol: 'circle',
              smooth:true,
              label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#fff'
                    }
                },
              },

              areaStyle: {
                normal: {
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#205039'
                    }, {
                        offset: 1,
                        color: '#151d1a'
                    }]),
                     
                },
                 
              },
              itemStyle : {  
                  normal : {  
                      color:'#0ae76a',  
                      lineStyle:{  
                          color:'#205039'  
                      }  
                  }  
              },  
          }]
        }
      let myChart = this.$echarts.init(document.getElementById(idName));
      myChart.setOption(option);

    },
    current(idName,currentValue){ //温度环形图
      	var option = {
  			    title: {
  			        text: '',
  			        x: '45%',
  			        y: '20%',
  			        textAlign: "center",
  			        textStyle: {
  			            fontWeight: 'normal',
  			            fontSize: 12,
  			            color: '#fff'
  			        },
  			        subtextStyle: {
  			            fontWeight: 'bold',
  			            fontSize: 20,
  			            color: '#0ae76a'
  			        }
  			    },
  			    series: [{
  			            name: '',
  			            type: 'pie',
  			            radius: ['95%', '100%'],
  			            startAngle: 225,
  			            // color: [new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  			            //     offset: 0,
  			            //     color: '#00a2ff'
  			            // }]), "transparent"],
  			            color:[{
  			                offset: 0,
  			               
  			            },"transparent"],
  			            hoverAnimation: false,
  			            legendHoverLink: false,
  			            itemStyle: {
  			                normal: {
  			                    borderColor: "transparent",
  			                    borderWidth: "20"
  			                },
  			                emphasis: {
  			                    borderColor: "transparent",
  			                    borderWidth: "20"
  			                }
  			            },
  			            z: 10,
  			            labelLine: {
  			                normal: {
  			                    show: false
  			                }
  			            },
  			            data: [{
  			                value: 75
  			            }, {
  			                value: 25
  			            }]
  			        }, {
  			            name: '',
  			            type: 'pie',
  			            radius: ['95%', '100%'],
  			            startAngle: 225,
  			             color: ["#fff", "transparent"],
  			            labelLine: {
  			                normal: {
  			                    show: false
  			                }
  			            },
  			            data: [{
  			                value: 75
  			            }, {
  			                value: 25
  			            }]
  			        }

  			    ]
  			};
    		var _this = this;
		    var  value_ = 75 * currentValue / 100;
		    option.title.subtext =  currentValue;
		    option.series[0].data[0].value = value_;
		    option.series[0].data[1].value = 100 - value_;

		    var myChart = _this.$echarts.init(document.getElementById(idName));
		    myChart.setOption(option, true);
    		
	   },
    getPowerInfoData(DeviceID){
      this.deviceId = DeviceID;
      this.show = true;
      this.axios.get('http://222.180.250.162:'+this.GLOBAL.host+'/Api/V3/GetDeviceInfo',{params:{auth:"",token:this.token,did:this.deviceId}})
              .then((response)=>{
                  console.log(response.data);
                  this.deviceInfo = response.data.Rows;

                  
              }).catch((err)=>{
                  console.log(err);
              });
      
    
    },
    onoffClose(show){
      this.show = show
    }




  }

  
};
</script>
<style lang = "scss" scoped>
@import '../../assets/scss/util.scss';
	.power{
    .house-box{
      width: 100%;
      margin: auto;
      padding: 0 20px;

      a{
        display: inline-block;
        padding: 0px 20px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #0097ff;
        border-radius: 4px;
        color: #ffffff;
        font-size: 14px;
        margin-right: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
        &:hover{
        	background:#0097ff;
        	color: #fff;
        };
        
      }
      .active{
        	background:#0097ff;
        	color: #fff;
        }
    }
    .power-content{
      width: 100%;
      padding: 0 20px;
      overflow: hidden;
      .environment-box{
        width: 100%;
        margin: auto;
        display: flex;
        justify-content: space-between;

        li{
          flex: 1;
          height: 80px;
          background: #14171e;
          text-align: center;
          margin-right: 10px;
          &:last-child{
            margin-right:0px;
          };
          span{
            display: inline-block;
            color: #0ae76a;
            margin-top: 15px;
            font-size: pxTorem(20px);
          }
          p{
            color: #999999;
            font-size: pxTorem(14px);
            margin-top: 5px;
          }
          .monitor-icon{
            height: 18px;
            width: 18px;
            background: url(../../assets/images/monitor/icon.png) no-repeat center center;
          }
        }
      }
      .pump-box{
        width: 100%;
        margin: auto;
        >li{
          width: 100%;
          /*height: 240px;*/
          background: #14171e;
          margin-top: 20px;
          .pump-name{
            color: #fff;
            padding-left: 30px;
            background: url(../../assets/images/monitor/power_icon.png) no-repeat left center;
            margin-left: 10px;
            line-height: 40px;
          }
          .pump-content{
            width: 100%;
            padding: 20px 0;
            .voltage{
               width: 100%;
                height: 200px;
              }
           
            .electric-work{
	            display: flex;
	            justify-content: flex-start;
	            padding-left: 10%;
	            align-items: center;
	            margin-top: 30px;
	            img{
            		width: 50px;
            	}
	            .electric-work-data{

	            	margin-left: 30px;
	            	p{
	            		padding-top: 15px;
	            		color: #ccc;
	            		font-size: pxTorem(14px);
	            		&:before{
	            			content:'';
	            			display: inline-block;
	            			width: 5px;
	            			height: 5px;
	            			border-radius: 50%;
	            			background: #0ae76a;
	            			margin-right: 10px;
	            			margin-bottom: 3px;
	            		}
	            		span{
	            			color: #0ae76a;
	            		}
	            		
	            	}
	            }
            }
            .current-canvas-box{
            	
	           	display: flex;
	           	justify-content: space-around;
	           
	           	li{
	           		width: 120px;
	           		height: 80px;
	           	}
            }
            .current-text-box{
            	display: flex;
	           	justify-content: space-around;
	           	li{
	           		width: 30%;
	           		color: #fff;
	           		text-align: center;
	           		margin-top: -20px;
	           		font-size: pxTorem(12px);
	           	}
            }
           .current-data-box{

	           	display: flex;
	           	justify-content: space-around;
	           	align-items: center;
	           	text-align: center;
	           	
	           	border-radius: 4px;
              li{
                flex: 1;
                background: #1a1e27;
                height: 70px;
                margin-top: 10px;
                padding-top: 10px;
              }
	           	p{
  	           	color: #ccc;
  					    font-size: pxTorem(14px);
  					    margin-top: 5px;

	           	}
	           	span{
  	           	color: #0ae76a;
  					    font-size: pxTorem(20px);
	           	}
	           	
           }
            .pump-data-box{
              width: 50%;
              display: flex;
              justify-content: space-around;
              align-items: center;
              
              .current-box{
                width: 20%;
                >li{
                  width: 100%;
                  text-align: center;
                  margin-bottom: 20px;
                  span{
                    color: #2cd373;
                    font-size: pxTorem(20px);
                  }
                  p{
                    color: #999999;
                    font-size: pxTorem(12px);
                    margin-top: 5px;
                  }
                }
              }

            }
          }
          
        }
      }

    }

  }

	
</style>
