<template>
  <div class="init water">
  	<Condition  :conditionNum = 'conditionNum' @getList = "getWaterData"></Condition>
    <div class="house-box">
      <a href="javascript:;" :class='[ houseActive === index ? "active" : ""]' v-for = "(houseNameItem,index) in WaterData" :key = "index" @click = "getHouseData(index)">{{houseNameItem.HouseName}}</a>
    </div>
  	<div class="water-content">
  		<ul class="environment-box">
  			
  			<li v-for = "(HouseEnvironments,index) in showWaterData.HouseEnvironments" :key = "index">
  				<span>{{HouseEnvironments.DisplayText}}</span>
  				<p>{{HouseEnvironments.Name}}({{HouseEnvironments.Unit}})</p>
  			</li>
  			
  		</ul>

  		<ul class="pump-box">
  			<li 
        v-for = "(DisplayParams,index) in showWaterData.DisplayParams" 
        :key = "index" 
        v-if = "DisplayParams.DeviceType == 7"
        >
  				<p class="pump-name">{{DisplayParams.DeviceName}}(压力：0.32Mpa)</p>
  				<div class="pump-content">
  					<div class="pump-img-box">
              <a><img src="../../assets/images/monitor/beng.png" alt=""></a>
  					</div>

  					<div class="pump-data-box">
              <div class="voltage"   :id = "['voltage'+index]"></div>
              <ul class="current-box">
                <li 
                  v-for = "(DisplayItems,DisplayItemsIndex) in DisplayParams.DisplayItems" 
                  :key = "DisplayItemsIndex" 
                  v-if = "DisplayItemsIndex > 5"
                  >
                  <span>{{DisplayItems.DisplayText}}</span>
                  <p>{{DisplayItems.ItemText}}({{DisplayItems.Unit}})</p>
                </li>
                
              </ul>
  						
  					</div>
  					
  				</div>
  			</li>
  		</ul>
  		
  	</div>
   	
  </div>
</template>

<script>
import Condition from "../../components/condition.vue"
export default {
	components:{
		Condition,
	},
  data(){
    return{
      s:0,
      entityID:'',
      WaterData:[],
      showWaterData:{},
      conditionNum:3,
      houseActive:0
    }
  },
 
  methods:{
    getHouseData(index){
      this.houseActive = index;
      this.getWaterData(this.s,this.entityID)
    },
    getWaterData(s,entityID){
      this.s = s,this.entityID = entityID;
      var token = localStorage.getItem("token");

      this.axios.get('http://222.180.250.162:'+this.GLOBAL.host+'/Api/V3/GetRealValue',{params:{auth:"",token:token,scope:this.s,entityID:this.entityID,categoryID:1}})
      .then((response)=>{
        console.log(response.data);
        this.WaterData = response.data.Rows;
        this.showWaterData = this.WaterData[this.houseActive];
      
        //console.log(this.WaterData[this.houseActive].DisplayParams[0].DisplayItems);

      }).then(()=>{

        var voltagexAxisData = [],voltageData = [];

        for(var i = 0;i<this.WaterData[this.houseActive].DisplayParams.length;i++){
          if(this.WaterData[this.houseActive].DisplayParams[i].DeviceType == 7){
            voltagexAxisData[i] = [],voltageData[i] = [];
              for(var j = 0;j< 6 ;j++){
                voltagexAxisData[i].push(this.WaterData[this.houseActive].DisplayParams[i].DisplayItems[j].ItemText)
                  voltageData[i].push(this.WaterData[this.houseActive].DisplayParams[i].DisplayItems[j].DisplayText);
              }
              this.voltage('voltage'+i,voltagexAxisData[i],voltageData[i]); 
          }
        }
    
      })
      .catch((err)=>{
        console.log(err);
      })

    },
    voltage(idName,voltagexAxisData,voltageData){ //电压折线图
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
              axisTick:{       //刻度线
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

  }

  
};
</script>
<style lang = "scss" scoped>
@import '../../assets/scss/util.scss';
	.water{
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
    }
    .active{
      background:#0097ff;
      color: #fff;
    }
    .water-content{
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
          }
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
            background: url(../../assets/images/monitor/beng_icon.png) no-repeat left center;
            margin-left: 10px;
            line-height: 40px;
          }
          .pump-content{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .pump-img-box{
              width: 50%;
              padding-left: 3%;
              a{
                display: inline-block;
                width: 90px;
                height: 140px;
                border:1px solid #0ae76a;
                margin-right: 4%;
                text-align: center;
                padding-top: 25px;
                border-radius: 4px;
                color: #cccccc;
                p{
                  margin-top: 8px;
                  font-size: pxTorem(14px);
                }

              }


            }
            .pump-data-box{
              width: 50%;
              display: flex;
              justify-content: space-around;
              align-items: center;
              .voltage{
                width: 80%;
                height: 200px;
              }
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
