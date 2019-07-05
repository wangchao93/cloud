<template>
  <div class="home init">
  	<ul class="home-left">
  			<li class="num-box water-num-box">
  				<p class="title-num">用水量（m）:</p>
  				<span>{{water}}</span>
  			</li>
	  		<li class="num-box power-num-box">
	  			<p class="title-num">用电量（kw.h）:</p>
  				<span>{{elect}}</span>
	  		</li>
	  		<li>
	  			<p class="title">运行状态</p>
	  			<div class="operating-status" id = "status">
	  				<!-- <canvas id="time-graph-canvas" width="300" height="300"></canvas> -->
	  			</div>
	  		</li>
	  		<li>
	  			<p class="title">设备统计</p>
	  			<div class="device" id = "device"></div>
	  		</li>
	  
  		

  	</ul>
  	<div class="home-middle">
  		<p class="title">设施设备管理云平台</p>
  		<div id="main"></div>
  		<ul class="home-condition">
  			<li>
  				<span class="city-icon"></span>
  				<select name="" id="" v-model = "city" @change = "getEntry">
			  		<option value="">城市</option>
			  		<option :value="item.Key" v-for = "item in cityList" :key = "item.Key">{{item.Value}}</option>

			  	</select>
  			</li>
  			<li>
  				<span class="area-icon"></span>
  				<select name="" id="" v-model = "entry" @change = "getGroup">
			  		<option value="">项目</option>
			  		<option :value="item.Key" v-for = "item in entryList" :key = "item.Key">{{item.Value}}</option>
			  	</select>
  			</li>
  			<li>
  				<span class="group-icon"></span>
  				<select name="" id="" v-model = "group">
			  		<option value="">组团</option>
			  		<option :value="item.Key" v-for = "item in groupList" :key = "item.Key">{{item.Value}}</option>
			  	</select>
  			</li>
  			
  		</ul>
  	</div>
  	
  		<ul class="home-right">
  			<li>
  				<p class="title">报警统计</p>
  				<div class="alarm-statistics home-right-height" id="alarm-statistics"></div>
  			</li>
  			<li>
  				<p class="title">报警信息</p>
  				<table class="alarm-info home-right-height">
  					
  					<tr>
  						<td>位置</td>
  						<td>时间</td>
  						<td>内容</td>
  					</tr>
  					<tr v-for = "(item,index) in alarmDetails" :key = "index" v-if="index < 4">
  						<td>{{item.Address}}</td>
  						<td>{{item.Time}}</td>
  						<td class="red">{{item.Content}}</td>
  					</tr>
  				</table>
  			</li>
  			<li>
  				<p class="title">工单统计</p>
  				<div class="work-order-statistics home-right-height" id = "work-order-statistics"></div>
  			</li>
  		</ul>
  </div> 
</template>

<script>
 import '../../node_modules/echarts/map/js/china.js'
export default {
	data(){
		return{
			water:'',
			elect:'',
			deviceData:[],
			deviceXAxisData:["给水","供配电","消防","电梯","暖通","排水","照明","门禁","环境"],
			city:'',
			cityList:[],
		  	entry:'',
			entryList:[],
		  	group:'',
		  	groupList:[],
		  	s:'',//查询范围
		  	entityID:'', //查询的ID
			alarmDetails:[],
			datas :[{name:'重庆',value:'广州'},{name:'重庆',value:'北京'},{name:'重庆',value:'成都'},{name:'重庆',value:'青岛'}],
			geoCoordMap : {
			    '海门':[121.15,31.89],
			    '鄂尔多斯':[109.781327,39.608266],
			    '招远':[120.38,37.35],
			    '舟山':[122.207216,29.985295],
			    '齐齐哈尔':[123.97,47.33],
			    '盐城':[120.13,33.38],
			    '赤峰':[118.87,42.28],
			    '青岛':[120.33,36.07],
			    '乳山':[121.52,36.89],
			    '金昌':[102.188043,38.520089],
			    '泉州':[118.58,24.93],
			    '莱西':[120.53,36.86],
			    '日照':[119.46,35.42],
			    '胶南':[119.97,35.88],
			    '南通':[121.05,32.08],
			    '拉萨':[91.11,29.97],
			    '云浮':[112.02,22.93],
			    '梅州':[116.1,24.55],
			    '文登':[122.05,37.2],
			    '上海':[121.48,31.22],
			    '攀枝花':[101.718637,26.582347],
			    '威海':[122.1,37.5],
			    '承德':[117.93,40.97],
			    '厦门':[118.1,24.46],
			    '汕尾':[115.375279,22.786211],
			    '潮州':[116.63,23.68],
			    '丹东':[124.37,40.13],
			    '太仓':[121.1,31.45],
			    '曲靖':[103.79,25.51],
			    '烟台':[121.39,37.52],
			    '福州':[119.3,26.08],
			    '瓦房店':[121.979603,39.627114],
			    '即墨':[120.45,36.38],
			    '抚顺':[123.97,41.97],
			    '玉溪':[102.52,24.35],
			    '张家口':[114.87,40.82],
			    '阳泉':[113.57,37.85],
			    '莱州':[119.942327,37.177017],
			    '湖州':[120.1,30.86],
			    '汕头':[116.69,23.39],
			    '昆山':[120.95,31.39],
			    '宁波':[121.56,29.86],
			    '湛江':[110.359377,21.270708],
			    '揭阳':[116.35,23.55],
			    '荣成':[122.41,37.16],
			    '连云港':[119.16,34.59],
			    '葫芦岛':[120.836932,40.711052],
			    '常熟':[120.74,31.64],
			    '东莞':[113.75,23.04],
			    '河源':[114.68,23.73],
			    '淮安':[119.15,33.5],
			    '泰州':[119.9,32.49],
			    '南宁':[108.33,22.84],
			    '营口':[122.18,40.65],
			    '惠州':[114.4,23.09],
			    '江阴':[120.26,31.91],
			    '蓬莱':[120.75,37.8],
			    '韶关':[113.62,24.84],
			    '嘉峪关':[98.289152,39.77313],
			    '广州':[113.23,23.16],
			    '延安':[109.47,36.6],
			    '太原':[112.53,37.87],
			    '清远':[113.01,23.7],
			    '中山':[113.38,22.52],
			    '昆明':[102.73,25.04],
			    '寿光':[118.73,36.86],
			    '盘锦':[122.070714,41.119997],
			    '长治':[113.08,36.18],
			    '深圳':[114.07,22.62],
			    '珠海':[113.52,22.3],
			    '宿迁':[118.3,33.96],
			    '咸阳':[108.72,34.36],
			    '铜川':[109.11,35.09],
			    '平度':[119.97,36.77],
			    '佛山':[113.11,23.05],
			    '海口':[110.35,20.02],
			    '江门':[113.06,22.61],
			    '章丘':[117.53,36.72],
			    '肇庆':[112.44,23.05],
			    '大连':[121.62,38.92],
			    '临汾':[111.5,36.08],
			    '吴江':[120.63,31.16],
			    '石嘴山':[106.39,39.04],
			    '沈阳':[123.38,41.8],
			    '苏州':[120.62,31.32],
			    '茂名':[110.88,21.68],
			    '嘉兴':[120.76,30.77],
			    '长春':[125.35,43.88],
			    '胶州':[120.03336,36.264622],
			    '银川':[106.27,38.47],
			    '张家港':[120.555821,31.875428],
			    '三门峡':[111.19,34.76],
			    '锦州':[121.15,41.13],
			    '南昌':[115.89,28.68],
			    '柳州':[109.4,24.33],
			    '三亚':[109.511909,18.252847],
			    '自贡':[104.778442,29.33903],
			    '吉林':[126.57,43.87],
			    '阳江':[111.95,21.85],
			    '泸州':[105.39,28.91],
			    '西宁':[101.74,36.56],
			    '宜宾':[104.56,29.77],
			    '呼和浩特':[111.65,40.82],
			    '成都':[104.06,30.67],
			    '大同':[113.3,40.12],
			    '镇江':[119.44,32.2],
			    '桂林':[110.28,25.29],
			    '张家界':[110.479191,29.117096],
			    '宜兴':[119.82,31.36],
			    '北海':[109.12,21.49],
			    '西安':[108.95,34.27],
			    '金坛':[119.56,31.74],
			    '东营':[118.49,37.46],
			    '牡丹江':[129.58,44.6],
			    '遵义':[106.9,27.7],
			    '绍兴':[120.58,30.01],
			    '扬州':[119.42,32.39],
			    '常州':[119.95,31.79],
			    '潍坊':[119.1,36.62],
			    '重庆':[106.54,29.59],
			    '台州':[121.420757,28.656386],
			    '南京':[118.78,32.04],
			    '滨州':[118.03,37.36],
			    '贵阳':[106.71,26.57],
			    '无锡':[120.29,31.59],
			    '本溪':[123.73,41.3],
			    '克拉玛依':[84.77,45.59],
			    '渭南':[109.5,34.52],
			    '马鞍山':[118.48,31.56],
			    '宝鸡':[107.15,34.38],
			    '焦作':[113.21,35.24],
			    '句容':[119.16,31.95],
			    '北京':[116.46,39.92],
			    '徐州':[117.2,34.26],
			    '衡水':[115.72,37.72],
			    '包头':[110,40.58],
			    '绵阳':[104.73,31.48],
			    '乌鲁木齐':[87.68,43.77],
			    '枣庄':[117.57,34.86],
			    '杭州':[120.19,30.26],
			    '淄博':[118.05,36.78],
			    '鞍山':[122.85,41.12],
			    '溧阳':[119.48,31.43],
			    '库尔勒':[86.06,41.68],
			    '安阳':[114.35,36.1],
			    '开封':[114.35,34.79],
			    '济南':[117,36.65],
			    '德阳':[104.37,31.13],
			    '温州':[120.65,28.01],
			    '九江':[115.97,29.71],
			    '邯郸':[114.47,36.6],
			    '临安':[119.72,30.23],
			    '兰州':[103.73,36.03],
			    '沧州':[116.83,38.33],
			    '临沂':[118.35,35.05],
			    '南充':[106.110698,30.837793],
			    '天津':[117.2,39.13],
			    '富阳':[119.95,30.07],
			    '泰安':[117.13,36.18],
			    '诸暨':[120.23,29.71],
			    '郑州':[113.65,34.76],
			    '哈尔滨':[126.63,45.75],
			    '聊城':[115.97,36.45],
			    '芜湖':[118.38,31.33],
			    '唐山':[118.02,39.63],
			    '平顶山':[113.29,33.75],
			    '邢台':[114.48,37.05],
			    '德州':[116.29,37.45],
			    '济宁':[116.59,35.38],
			    '荆州':[112.239741,30.335165],
			    '宜昌':[111.3,30.7],
			    '义乌':[120.06,29.32],
			    '丽水':[119.92,28.45],
			    '洛阳':[112.44,34.7],
			    '秦皇岛':[119.57,39.95],
			    '株洲':[113.16,27.83],
			    '石家庄':[114.48,38.03],
			    '莱芜':[117.67,36.19],
			    '常德':[111.69,29.05],
			    '保定':[115.48,38.85],
			    '湘潭':[112.91,27.87],
			    '金华':[119.64,29.12],
			    '岳阳':[113.09,29.37],
			    '长沙':[113,28.21],
			    '衢州':[118.88,28.97],
			    '廊坊':[116.7,39.53],
			    '菏泽':[115.480656,35.23375],
			    '合肥':[117.27,31.86],
			    '武汉':[114.31,30.52],
			    '大庆':[125.03,46.58]
			},
			globalIndex:0,
			dataArray:[],
			status:[],

		}
	},
	mounted:function(){
		this.getHomeData();
		var _this = this;
		setInterval(function(){
			_this.getHomeData();
		},5000);
		this.nocease();
		this.getCity();
		
	},
	methods:{
		getHomeData(){ //获取首页数据
			var token = localStorage.getItem("token");
			if(this.group != ''){
				this.entityID = this.group
				this.s = 3
			}else if(this.entry != ''){
				this.entityID = this.entry
				this.s = 2
			}else if(this.city != ''){
				this.entityID = this.city
				this.s = 1
			}else{
				this.entityID = '';
				this.s = 0
			}
			this.axios.get('http://222.180.250.162/Api/V3/Summary',{params:{auth:"",token:token,scope:this.s,entityID:this.entityID}})
				.then((response)=>{
					//console.log(response.data);
					var homeData = response.data.Rows;
					this.water = homeData.Water;
					this.elect = homeData.Elect;

					var deviceArr = homeData.Device.split(',');
					this.deviceData = this.deleteZero(deviceArr,0);

					var deviceXAxisData = this.deleteZero(this.deviceXAxisData,undefined);
					this.device(deviceXAxisData);

					var alarmTime = [],alarmWaterData = [],alarmElectData = [];
					this.getAlarm(homeData.Alarm,alarmTime,alarmWaterData,alarmElectData);
					this.alarm(alarmTime,alarmWaterData,alarmElectData);
					
					this.alarmDetails = homeData.AlarmDetails;

					var workOrderTime = [], workOrderDataU = [], workOrderDataF = []
					this.getWorkOrder(homeData.WorkOrder,workOrderTime,workOrderDataU,workOrderDataF);
					this.workOrder(workOrderTime,workOrderDataU,workOrderDataF);

					this.status = homeData.Status.split(',');
					this.operatingStatus();
					// var percent = homeData.Status.split(',')[0];
					// var percent1 = homeData.Status.split(',')[1];
					// var percent2 = homeData.Status.split(',')[2];
					// var percent3 = homeData.Status.split(',')[3];
					// var time_canvas = document.getElementById("time-graph-canvas");
        			// this.drawMain(time_canvas, percent,percent1,percent2,percent3, "#85d824", "#fff");
				})
				.catch((err)=>{
					console.log(err);
				})
		},
		
		deleteZero(arr,option){
			var temp = [];
			for(var i = 0;i<arr.length;i++){
				if(arr[i] != option){
					temp.push(arr[i]);

				}else{
					delete this.deviceXAxisData[i]
				}
			}
			
			return temp;   //删除数组中0

		},
		getAlarm(arr,alarmTime,alarmWaterData,alarmElectData){
			for(var i = 0;i<arr.length;i++){
				alarmTime.push(arr[i].Time);
				alarmWaterData.push(arr[i].Value[0]);
				alarmElectData.push(arr[i].Value[1]);
			}
			
		},
		getWorkOrder(arr,workOrderTime,workOrderDataU,workOrderDataF){
			for(var i = 0;i<arr.length;i++){
				workOrderTime.push(arr[i].Time);
				workOrderDataU.push(arr[i].Value[0]);
				workOrderDataF.push(arr[i].Value[1]);
			}


		},
		
		device(deviceXAxisData){
        // 基于准备好的dom，初始化echarts实例
	        let myChart = this.$echarts.init(document.getElementById('device'))
	        // 绘制图表
	        myChart.setOption({

	            title: { text: '' },
	            tooltip: {},
	            grid:{
			    	left:'1%',
			    	bottom:'5%',
			    	containLabel:true
			    },
	            xAxis: {
	                data: deviceXAxisData,
	                "axisTick":{       //刻度线
			          "show":false
			        },
			        axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#fff',
                            //width:8,//这里是为了突出显示加上的
                        }
                    }

	            },
	            yAxis: {
	            	"show" : false,
	            
	            },
	            series: [{
	                name: '',
	                type: 'bar',
	                data: this.deviceData,
	                barWidth : 25,
	                itemStyle: {
						normal: {
							color: function(params) { 
			                    var colorList = ['#2f8ac9','#d15324','#ed1f2f']; 
			                    return colorList[params.dataIndex] 
			                },
							label: {
								show: true, //开启显示
								position: 'top', //在上方显示
								textStyle: { //数值样式
									//color: 'black',
									fontSize: 16
								}
							}
						}
					},

	            }]
	        });
    	},

    	alarm(alarmTime,alarmWaterData,alarmElectData){
        // 基于准备好的dom，初始化echarts实例
	        let myChart = this.$echarts.init(document.getElementById('alarm-statistics'))
	        // 绘制图表
	        myChart.setOption({
	            title: { text: '' },
	            tooltip: {},
	            legend: {
	            	itemWidth: 6,
        			itemHeight: 6,
	            	orient: 'vertical',
	            	top:'1%',
                	right:'8%',
			        data:['电','水'],
			        textStyle:{
	                    fontSize: 12,
	                    color:'#fff'
                	}
			    },
	            grid:{
	            	left:'-5%',
	            	bottom:'5%',
	            	containLabel:true
	            },
	            xAxis: {
	                data:alarmTime,
	                "axisTick":{       //刻度线
			          "show":false
			        },
			        axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#fff',
                            //width:8,//这里是为了突出显示加上的
                        }
                    }

	            },
	            yAxis: {
	            	"show" : false,
	            
	            },
	            series: [

		            {
			            name:'水',
			            type:'bar',
			            stack: '水电',
			            data:alarmWaterData,
			            barWidth : 20,
			            itemStyle:{
                     		normal:{
                     			color:"#30b0ff",
                     			
                     		},
                		}
	        		},
	        		{
			            name:'电',
			            type:'bar',
			            stack: '水电',
			            data:alarmElectData,
			            barWidth : 20,
			            itemStyle:{
                     		normal:{
                     			color:"#19ce62",
								label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										//color: 'black',
										fontSize: 16
									}
								}
                     		},
                		}
	        		},
	        		
	            ]
	        });
    	},

    	workOrder(workOrderTime,workOrderDataU,workOrderDataF){
        // 基于准备好的dom，初始化echarts实例
	        let myChart = this.$echarts.init(document.getElementById('work-order-statistics'))
	        // 绘制图表
	        myChart.setOption({

	            title: { text: '' },
	            tooltip: {},
	            legend: {
	            	itemWidth: 6,
        			itemHeight: 6,
	            	orient: 'vertical',
	            	top:'1%',
                	right:'8%',
			        data:['生成工单数','完成工单数'],
			        textStyle:{
	                    fontSize: 12,
	                    color:'#fff'
                	}
			    },
			    grid:{
			    	left:'1%',
			    	bottom:'5%',
			    	containLabel:true
			    },
	            xAxis: {
	                data: workOrderTime,
	                "axisTick":{       //刻度线
			          "show":false
			        },

			        axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#fff',
                            //width:8,//这里是为了突出显示加上的
                        }
                    }

	            },
	            yAxis: {
	            	"show" : false,
	            
	            },
	            series: [

		            {
			            name:'生成工单数',
			            type:'bar',
			            data:workOrderDataU,
			            barWidth : 12,
			            
			            itemStyle:{
                     		normal:{
                     			color:"#d15324",
                     			label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										//color: 'black',
										fontSize: 16,
									}
								}
                     		},
                		}
	        		},
	        		{
			            name:'完成工单数',
			            type:'bar',
			            data:workOrderDataF,
			            barWidth : 12,
			            barCategoryGap:'-1',
			            itemStyle:{
                     		normal:{
                     			color:"#30b0ff",
                     			label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										//color: 'black',
										fontSize: 16
									}
								}

                     		},
                		}
	        		},
	        		
	            ]
	        });
    	},

    	//根据data得到每个data中城市的坐标
	    convertData (data) {
		    var res = [];
		    for (var i = 0; i < data.length; i++) {
		        var fromCoord = this.geoCoordMap[data[i].name];//获取城市的坐标 source
		        var toCoord = this.geoCoordMap[data[i].value];//获取城市的坐标 destination
		        if (fromCoord && toCoord) {
		            res.push({
		                fromName: data[i].name,
		                toName: data[i].value,
		                coords: [fromCoord, toCoord]
		            });
		        }
		    }
		    return res;
		},
		//根据data得到放射光标效果图。如果起始城市没有值的话，就只显示目的城市
		convertData1 (data) {
		    var res = [];
		    for (var i = 0; i < data.length; i++) {
		        var geoCoord = this.geoCoordMap[data[i].name];
		        var geoCoord1 = this.geoCoordMap[data[i].value];
		        if (geoCoord) 
		        {
		            res.push({
		                name: data[i].name,
		                value: geoCoord.concat(data[i].value)
		            });
		        }
		        if(geoCoord1)
		        {
		            res.push({
		                name: data[i].value,
		                value: geoCoord1.concat(data[i].name)
		            })
		        }
		    }
		    return res;
		},
		//一直要执行的函数
		nocease(){
			this.dataArray[0]=[{name:'上海',value:'广州'},{name:'上海',value:'北京'},{name:'上海',value:'重庆'},{name:'上海',value:'新疆'}];

			let myChart = this.$echarts.init(document.getElementById('main'));

			var option = {
			    //设置背景颜色
			    backgroundColor: '',   
			    //设置图片标题、子标题、文本颜色等等
			    
			    title: {
			        text: '',
			        subtext: '',
			        left: 'center',
			        textStyle: {
			            color: '#fff'
			        }
			    },
			    tooltip : {
			        trigger: 'item'
			    },

			    geo: {
			        map: 'china',
			        label: {
			            emphasis: {
			                show: true,
			                textStyle: {
			                  color: '#fff'
			                }
			            }
			        },
			        itemStyle: {
			            normal: {
			                areaColor: '#0aa0e2',//地图板块颜色
			                borderColor: '#111'
			            },
			            emphasis: {
			                areaColor: '#003d6b'  //鼠标放上地图的颜色
			            }
			        },
			        //是否可以点击鼠标、滚轮缩放
			        roam: true,
			    },
			    //series就是要绘制的地图的主体。是一个数组，也就是说可以有多个数据进行绘制。这里有两个，一个是两个城市的连线，一个是对两个城市进行高亮显示。其中的type是很重要的参数，主要有饼图、条形图、线、地图等等。具体的可以去参考官网上的配置手册。
			    series : 
			    [
			        {
			            name: 'rode',
			            type: 'lines',
			            coordinateSystem: 'geo',
			            data: this.convertData(this.datas),
			            effect: {
			                show: true,
			                period: 6,
			                trailLength: 0,
			            },
			            lineStyle: {
			                normal: {
			                    color: '#d15324',
			                    width: 1,
			                    opacity: 0.4,
			                    curveness: 0.2
			                }
			            }
			        },
			        {
			            name: 'city',
			            type: 'effectScatter',
			            coordinateSystem: 'geo',
			            rippleEffect: {
			                brushType: 'stroke'
			            },
			            label: {
			                normal: {
			                    show: true,
			                    position: 'right',
			                    formatter: '{b}'
			                }
			            },
			            symbolSize: 8,
			            itemStyle: {
			                normal: {
			                    color: '#d15324'
			                }
			            },
			            data: this.convertData1(this.datas)
			        },
			    ]
			};
			 // 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			

		    //随机取1-5
		    var data = this.dataArray[this.globalIndex%5];
		    this.globalIndex++;
		    var option = myChart.getOption();

		    if(data[0].name)
		    {
			    option.series[0].data = this.convertData(this.datas);
			    option.series[1].data = this.convertData1(this.datas);
		    }
		    else{
			    option.series[0].data = null;
			    option.series[1].data = convertData1(this.datas); 
		    }
		   myChart.setOption(option);
		},
		operatingStatus(){ //运行状态
			var placeHolderStyle = {
				    normal: {
				        label: {
				            show: false,
				            position: ""
				        },
				        labelLine: {
				            show: false
				        },
				        color: "rgba(41, 121, 176, 0)",
				        borderColor: "rgba(41, 121, 176,0)",
				        borderWidth: 0
				    }
				};
				var color = ['#19ce62', '#e45f2f', "#2f8ac9", "#ed1f2f"]
				var dodata = [{
					    value: this.status[0],
					    name: '设备停止'
					}, {
					    value: this.status[1],
					    name: '设备启动'
					}, {
					    value: this.status[2],
					    name: 'RTU离线'
					}, {
					    value: this.status[3],
					    name: 'RTU在线'
					}]
				var datass = [];
				for (let i = 0; i < dodata.length; i++) {
				    var obj = {};
				    obj = {
				        name: '值',
				        type: 'pie',
				        clockWise: true, //顺时加载
				        hoverAnimation: false, //鼠标移入变大
				        center : ['40%', '65%'],   
				        radius: [60 - i *15, 60 - i * 15],
				        itemStyle: {
				            normal: {
				                label: {
				                    show: true,
				                    textStyle: {
				                        fontSize: 12
				                    },
				                    position: ''
				                },
				                labelLine: {
				                    show: true,
				                    length: 20+i *10,
				                    length2: 30,
				                    smooth: false,
				                    width:1
				                },
				                borderWidth: 5,
				                shadowBlur: 40,
				                borderColor: color[i],
				                shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
				            }
				        },
				        //及格率数据修改
				        data: [{
				            value: dodata[i]['value'],
				            name: dodata[i].name,
				            itemStyle:{
				            	normal: {
				            		color:color[i]
				            	}
				            }
				        }, {
				            value: 100 - dodata[i]['value'],
				            name: '',
				            itemStyle: placeHolderStyle
				        }]
				    }
				    datass.push(obj);
				}
				
 
				var option = {
				    	series: datass
					};
				
				
			let myChart = this.$echarts.init(document.getElementById("status"));
      		myChart.setOption(option);

		},

		drawMain(drawing_elem, percent,percent1,percent2,percent3, forecolor, bgcolor) {
            /*
                @drawing_elem: 绘制对象
                @percent：绘制圆环百分比, 范围[0, 100]
                @forecolor: 绘制圆环的前景色，颜色代码
                @bgcolor: 绘制圆环的背景色，颜色代码
            */
            var context = drawing_elem.getContext("2d");
            var center_x = 80;
            var center_y = 60;
            var rad = Math.PI*2/80; 
            var speed = 0,speed1 = 0,speed2 = 0,speed3 = 0;
            var radius = 15;
          	var radius1 = 30;
          	var radius2 = 45;
          	var radius3 = 60;

          	// 绘制背景圆圈
            function backgroundCircle(){
                context.save();
                context.beginPath();
                context.lineWidth = 5; //设置线宽
                var radius = center_x - context.lineWidth;
                context.lineCap = "round";
                context.strokeStyle = bgcolor;
                context.arc(center_x, center_y, radius, 0, Math.PI*2, false);
                context.stroke();
                context.closePath();
                context.restore();
            }

 
            //绘制运动圆环
            function foregroundCircle(n,radius,forecolor){

                context.save();
                context.strokeStyle = forecolor;
                context.lineWidth = 5;
                context.lineCap = "round";
                context.beginPath();
                context.arc(center_x, center_y, radius , 0, n*rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
                context.stroke();
                context.closePath();
                context.restore();
            }
            
            function dashed(){
            	context.save();
	            context.lineWidth = 2;
				context.strokeStyle = '#19ce62';
				context.beginPath();
				context.setLineDash([5, 5]);
				context.moveTo(95, 60);
				context.lineTo(110, 20);
				context.moveTo(110, 20);
				context.lineTo(200, 20);
				context.stroke();
				context.closePath();
                context.restore();

            }
            function dashed2(){
            	context.save();
	            context.lineWidth = 2;
				context.strokeStyle = '#e45f2f';
				context.beginPath();
				context.setLineDash([5, 5]);
				context.moveTo(115, 60);
				context.lineTo(130, 40);
				context.moveTo(130, 40);
				context.lineTo(200, 40);
				context.stroke();
				context.closePath();
                context.restore();

            }
            function dashed3(){
            	context.save();
	            context.lineWidth = 2;
				context.strokeStyle = '#2f8ac9';
				context.beginPath();
				context.setLineDash([5, 5]);
				context.moveTo(110, 90);
				context.lineTo(200, 90);
				
				context.stroke();
				context.closePath();
                context.restore();

            }
            function dashed4(){
            	context.save();
	            context.lineWidth = 2;
				context.strokeStyle = '#ed1f2f';
				context.beginPath();
				context.setLineDash([5, 5]);
				context.moveTo(95, 120);
				context.lineTo(200, 120);
				context.stroke();
				context.closePath();
                context.restore();

            }
            
            
         
 
            //绘制文字
            function text(name,x,y,forecolor){
                context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
                context.fillStyle = forecolor;
                var font_size = 12;
                context.font = font_size + "px Helvetica";
                var text_width = context.measureText(name).width;
                context.fillText(name, x, y );
                context.restore();
            }
           
 			drawFrame();
            //执行动画
            function drawFrame(){
                window.requestAnimationFrame(drawFrame);
                //context.clearRect(0, 0, drawing_elem.width, drawing_elem.height);
            	//backgroundCircle();
                text("设备停止 "+percent,200,25,"#19ce62");
                text("设备启动 "+percent1,200,45,"#e45f2f");
                text("RTU离线 "+percent2,200,95,"#2f8ac9");
                text("RTU在线 "+percent3,200,125,"#ed1f2f");
                foregroundCircle(speed,radius,"#19ce62");
                foregroundCircle(speed1,radius1,"#e45f2f");
                foregroundCircle(speed2,radius2,"#2f8ac9");
                foregroundCircle(speed3,radius3,"#ed1f2f");
                dashed();
                dashed2();
                dashed3();
                dashed4();
                if(speed < percent){
                	speed += 1;
                } 
                
                if(speed1 < percent1){
                	speed1 += 1;
                } 
                if(speed2 < percent2){
                	speed2 += 1;
                } 
                if(speed3 < percent3){
                	speed3 += 1;
                } 
                 
            }

        },
        getCity(){//获取城市
			var token = localStorage.getItem("token");
			this.axios.get('http://222.180.250.162/Api/V3/GetCity',{params:{auth:"",token:token}})
			.then((response)=>{
				//console.log(response.data);
				this.cityList = response.data.Rows;
			})
			.catch((err)=>{
				console.log(err);
			})
		},
		getEntry(){//获取项目
			var token = localStorage.getItem("token");
			this.axios.get('http://222.180.250.162/Api/V3/GetEntry',{params:{auth:"",token:token,cid:this.city}})
			.then((response)=>{
				//console.log(response.data);
				this.entryList = response.data.Rows;
				

			})
			.catch((err)=>{
				console.log(err);
			})
		},
		getGroup(){//获取组团
			var token = localStorage.getItem("token");
			this.axios.get('http://222.180.250.162/Api/V3/GetGroup',{params:{auth:"",token:token,eid:this.entry}})
			.then((response)=>{
				//console.log(response.data);
				this.groupList = response.data.Rows;
			
			})
			.catch((err)=>{
				console.log(err);
			})
		},

	}
  
};
</script>

<style lang = "scss" scoped>
.home{
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	background: url(../assets/images/home/home_bg.png) no-repeat;
	background-size: cover;
	-webkit-background-size: cover;
	-o-background-size: cover;
	background-position: center center;
	overflow: hidden;
	padding: 0 40px;
	.home-left{
		width: 25%;
		margin-top: 40px;

		li{
			border: 1px solid #1b4969;
			border-radius: 4px;
			margin-bottom: 20px;
			color: #fff;
			background: rgba(41,121,176,0.2);
			.title{
				height: 30px;
				line-height: 30px;
				border-bottom: 1px solid #1b4969;
				padding-left: 15px;
			}
			.device{
				height: 150px;
				width: 100%;
				margin: auto;
			}
			.operating-status{
				width: 100%;
				height: 150px;
			}

		}
		.num-box{
			height: 80px;
			padding-left: 90px;
			.title-num{
				color: #e5e5e5;
				font-size: 12px;
				padding-top: 15px;
				padding-bottom: 5px;
			}
			span{
				font-size: 24px;
			}
		}
		.water-num-box{
			background: url(../assets/images/home/water_icon.png) no-repeat 30px center;
			color: #0097ff;
		}
		.power-num-box{
			background: url(../assets/images/home/power_icon.png) no-repeat 30px center;
			color: #19ce62;
		}
	}
	.home-middle{
		width: 50%;
		.title{
			text-align: center;
			color: #0097ff;
			font-size: 18px;
			padding-bottom: 10px;
			background: url(../assets/images/home/title_line.png) no-repeat bottom center;
			margin-top: 20px;
		}
		#main{
			width: 100%;
			height: 510px;
		}
		.home-condition{
			width: 100%;
			margin: auto;
			display: flex;
			justify-content: space-around;
			
			li{
				
				height: 50px;
				span{
					display: inline-block;
					width: 50px;
					height: 50px;
					border-radius: 50%;
					border:1px solid #1969a7;
					background: #090b3a;
					z-index: 100;
					position: relative;
					top: 20px;

				}
				.city-icon{
					background-image: url(../assets/images/home/city_icon.png);
					background-repeat: no-repeat;
					background-position: center;
				}
				.area-icon{
					background-image: url(../assets/images/home/area_icon.png);
					background-repeat: no-repeat;
					background-position: center;
				}
				.group-icon{
					background-image: url(../assets/images/home/group_icon.png);
					background-repeat: no-repeat;
					background-position: center;
				}
				select{
					display: inline-block;
					width: 110px;
					height: 40px;
					border:1px solid #1969a7;
					border-radius: 4px;
					background: #090b3a;
					margin-left: -20px;
					z-index: 1;
					color: #0097ff;
					text-indent: 30px;
					
				}
			}

		}
	}
	
	
	.home-right{
		width: 25%;
		font-size: 12px;
		margin-top: 40px;
		li{
			border: 1px solid #1b4969;
			margin-bottom: 20px;
			color: #fff;
			background: rgba(41,121,176,0.2);
			border-radius: 4px;
			.title{
				height: 30px;
				line-height: 30px;
				border-bottom: 1px solid #1b4969;
				padding-left: 15px;
			}
			.alarm-info{
				width: 92%;
				margin: auto;
				text-align: center;
				tr{
					border-bottom: 1px solid #232f50;
					&:first-child{
						border-bottom: 1px solid #fff;
					}
					.red{
						color: #ed1f2f;
						width: 130px;
						word-break:keep-all;
						white-space:nowrap;
						overflow:hidden;
						text-overflow:ellipsis;
					}

				}
			}
			.work-order-statistics{
				
			}
			.home-right-height{
				height: 150px;
				
			}
		}
	}
}


</style>
