<template>
	<div class="condition">

	  	<span>城市：</span>
	  	<select name="" id="" v-model = "city" @change = "getEntry">
	  		<option value="">请选择城市</option>
	  		<option :value="item.Key" v-for = "item in cityList" :key = "item.Key">{{item.Value}}</option>

	  	</select>

		<span>项目：</span>
		<select name="" id="" v-model = "entry" @change = "getGroup">
	  		<option value="">请选择项目</option>
	  		<option :value="item.Key" v-for = "item in entryList" :key = "item.Key">{{item.Value}}</option>
	  	</select>

		<span>组团：</span>
		<select name="" id="" v-model = "group" @change = "getHouse">
	  		<option value="">请选择组团</option>
	  		<option :value="item.Key" v-for = "item in groupList" :key = "item.Key">{{item.Value}}</option>
	  	</select>

		<span v-show = "conditionNum !=3">
			<span>机房：</span>
			<select name="" id="" v-model = "house" @change = "getDevice">
		  		<option value="">请选择机房</option>
		  		<option :value="item.Key" v-for = "item in houseList" :key = "item.Key">{{item.Value}}</option>
		  	</select>
		

			<span>设备：</span>
			<select name="" id="" v-model = "device">
		  		<option value="">请选择设备</option>
		  		<option :value="item.Key" v-for = "item in deviceList" :key = "item.Key">{{item.Value}}</option>
		  	</select>

		  	<span v-show = "conditionNum < 6 " >
		  		<span>设施类型：</span>
				<select name="" id="" v-model = "houseType">
			  		<option value="">请选择类型</option>
			  		<option :value="item.Key" v-for = "item in houseTypeList" :key = "item.Key">{{item.Value}}</option>
			  	</select>
	  		</span>

		    <span class="demonstration">时间：</span>
		    <el-date-picker
		      v-model="startTime"
		      type="date"
		      placeholder="选择日期"
      		  value-format="yyyy-MM-dd"
		      >
		    </el-date-picker>
		     至 
		    <el-date-picker
		      v-model="endTime"
		      type="date"
		      placeholder="选择日期"
        	  value-format="yyyy-MM-dd"
		      >
		    </el-date-picker>
		</span>
  		
	  	<div class="search-btn-box">
	  		<a href="javascript:;" class="search" @click = "search">查找</a>
	  		<a href="javascript:;" class="export">导出Excel</a>
	  	</div>
   </div>

</template>

<script>
	export default{
		data(){
			return{
				token: localStorage.getItem("token"),
				city:'',
				cityList:[],
			  	entry:'',
				entryList:[],
			  	group:'',
			  	groupList:[],
			  	house:'',
			  	houseList:[],
			  	device:'',
			  	deviceList:[],
			  	houseType:'',
			  	houseTypeList:[],
			  	startTime: '',
			  	endTime: '',
			  	s:'',//查询范围
			  	entityID:'' //查询的ID

			}
		},
		props:{
			conditionNum:{
				type:Number,
				required:true
			}
		},
		mounted:function(){
			this.getCity();
			if(this.conditionNum !=10){
				this.search();
			}
			
		},
		methods:{
			getCity(){
				this.axios.get('http://222.180.250.162/Api/V3/GetCity',{params:{auth:"",token:this.token}})
				.then((response)=>{
					//console.log(response.data);
					this.cityList = response.data.Rows;
				})
				.then(()=>{
					if(this.conditionNum ==10 ||this.conditionNum == 11){
						
						this.city = this.cityList[0].Key;
						this.getEntry();
					}

				})
				.catch((err)=>{
					console.log(err);
				})
			},
			getEntry(){
				
				this.axios.get('http://222.180.250.162/Api/V3/GetEntry',{params:{auth:"",token:this.token,cid:this.city}})
				.then((response)=>{
					//console.log(response.data);
					this.entryList = response.data.Rows;
					
					
				})
				.then(()=>{
					if(this.conditionNum ==10 ||this.conditionNum == 11){
						this.entry = this.entryList[0].Key;
						this.getGroup();
					}
				})
				.catch((err)=>{
					console.log(err);
				})
			},
			getGroup(){
				
				this.axios.get('http://222.180.250.162/Api/V3/GetGroup',{params:{auth:"",token:this.token,eid:this.entry}})
				.then((response)=>{
					//console.log(response.data);
					this.groupList = response.data.Rows;
				})
				.then(()=>{
					if(this.conditionNum ==10){
						this.startTime = '2019-01-01';
						this.group = this.groupList[0].Key;
						this.getHouse();
						this.search();
					}
					if(this.conditionNum ==11){
						this.group = this.groupList[0].Key;
						this.getHouse();
					}

				})
				.catch((err)=>{
					console.log(err);
				})
			},
			getHouse(){
				
				this.axios.get('http://222.180.250.162/Api/V3/GetHouse',{params:{auth:"",token:this.token,gid:this.group}})
				.then((response)=>{
					//console.log(response.data);
					this.houseList = response.data.Rows;
				})
				.then(()=>{
					if(this.conditionNum ==11){

						this.house = this.houseList[0].Key;
						this.getDevice();
						
					}
				})
				.catch((err)=>{
					console.log(err);
				})

				this.axios.get('http://222.180.250.162/Api/V3/GetHouseType',{params:{auth:"",token:this.token,gid:this.group}})
				.then((response)=>{
					//console.log(response.data);
					this.houseTypeList = response.data.Rows;
					

				})
				.catch((err)=>{
					console.log(err);
				})


			},
			getDevice(){
				
				this.axios.get('http://222.180.250.162/Api/V3/GetDevice',{params:{auth:"",token:this.token,hid:this.house}})
				.then((response)=>{
					//console.log(response.data);
					this.deviceList = response.data.Rows;
					
				})
				.then(()=>{
					if(this.conditionNum ==11){
						
						this.device = this.deviceList[0].Key;
						this.search();
						
						
					}
				})
				.catch((err)=>{
					console.log(err);
				})
			},

			search(){
				if(this.device != '' ){
					this.entityID = this.device;
					this.s = 5
				}else if(this.house != ''){
					this.entityID= this.house
					this.s = 4
				}else if(this.group != ''){
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

				this.$emit("getList",this.s,this.entityID,this.startTime,this.endTime,this.houseType);

			},
			exportExcel(){}

	}
	};
</script>

<style lang = "scss">
@import '../assets/scss/util.scss';
	.condition{
		margin: 30px 20px 0 20px;
		background: #14171e;
		color: #fff;
		padding: 20px;
		border-radius: 4px;
		overflow: hidden;
		font-size: pxTorem(14px);

		.el-date-editor{
			width: 135px;
			
			background: #14171e;
			border:1px solid #3f4553;
			.el-input__inner {
				height: 30px;
				background: #14171e;
				border:1px solid #3f4553;
				color: #fff;
			}
			input::-webkit-input-placeholder{
			  color: #fff;
			  font-size: pxTorem(14px);
			}
			input:-moz-placeholder{
			  color: #fff;
			  font-size: pxTorem(14px);
			}

			input::-moz-placeholder{
			  color: #fff;
			  font-size: pxTorem(14px);
			}

			input:-ms-input-placeholder{
			  color: #fff;
			  font-size: pxTorem(14px);
			}
			.el-input__icon{
				line-height: 30px;
			}
		}
		
		select{
			width: 120px;
			height: 30px;
			background: #14171e;
			border-radius: 4px;
			color:#fff;
			text-indent: 10px;
			margin-right: 20px;
			border:1px solid #3f4553;
			margin-bottom: 20px;

		}
		.search-btn-box{
			width: 100%;
			margin: auto;
			text-align: center;
			a{
				display: inline-block;
				width: 100px;
				height: 30px;
				border: 1px solid #0097ff;
				border-radius: 4px;
				margin-left: 20px;
				line-height: 30px;
				text-align: center;
				color: #0097ff;
			}
			.search{
				text-indent: 20px;
				background: url(../assets/images/home/search_icon.png) no-repeat 25px 10px;
				background-size: 12px;
			}

		}
		
	}

</style>