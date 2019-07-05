<template>
  <div class="init RTU">
  	<Condition :conditionNum = 'conditionNum' @getList = "getRTUList"></Condition>
   	<div class="table-box">
	   <table class="table">
	   	<tr>
	   		
	   		<th>城市</th>
	   		<th>项目</th>
	   		<th>组团</th>
	   		<th>设施</th>
	   		<th>设施编码</th>
	   		<th>是否在线</th>
	   		<th>在线时间</th>
	   	</tr>
	   	<tr v-for = "(item,index) in tableData " :key = "index">
		   	<td>{{item.City}}</td>
		   	<td>{{item.Entry}}</td>
		   	<td>{{item.Group}}</td>
		   	<td>{{item.House}}</td>
		   	<td>{{item.HouseCode}}</td>
		   	<td>{{item.IsOnline}}</td>
		   	<td>{{item.lastTime}}</td>
	   </tr>
	   </table>

		<Page :total = "total" :currentPage = "pageIndex" @pagechange = "changePage"></Page>
    </div>

  </div>

</template>

<script>
import Page from "../../components/page.vue"
import Condition from "../../components/condition.vue"

export default {
	components:{
		Page,
		Condition,
	},
	data() {
	  return {
	  	tableData: [],
	  	total:0,
	  	pageIndex:1,
	  	pageNumber:10,
	  	s:0,
	  	entityID:'',
	  	hType:'',
	  	conditionNum:0,
	  }
	},
	
	mounted:function(){//初始化
		this.getRTUList(0,'','','');
	},
	methods:{
		getRTUList(s,entityID,houseType){//获取报警列表
			this.s = s,this.entityID = entityID;this.hType = houseType;
			var token = localStorage.getItem("token");
			this.axios.get('http://222.180.250.162/Api/V3/RTUOnline',
				{params:{auth:"",token:token,scope:this.s,entityID:this.entityID,hType:this.hType,pageIndex:this.pageIndex,pageNumber:this.pageNumber}})
			.then((response)=>{
				console.log(response.data);
				this.tableData = response.data.Rows;
				this.total = response.data.Total;
			
			})
			.catch((err)=>{
				console.log(err);
			})

		},
		changePage(current,display){//分页切换
			this.pageIndex = current;
			this.pageNumber = display;
			this.getRTUList(this.s,this.entityID,this.hType);
			
		},

	}
	
};
</script>


<style lang = "scss" scoped>
@import '../../assets/scss/util.scss';
@import '../../assets/scss/tableCommon.scss';

</style>
