<template>

<nav>
	<el-row class="tac">
		
	    <el-menu
	      :default-active="$route.path"
	      class="el-menu-vertical-demo"
	      @open="handleOpen"
	      @close="handleClose"
	      router
	      unique-opened
	      background-color="#14171e"
	      text-color="#fff"
	      active-text-color="#0191f4">

			<el-menu-item index="/">
				<i class="nav-icon nav-icon1"></i>
				<span slot="title">首页</span>
			</el-menu-item>


			<el-submenu index = "2" >

				<template slot="title">
					<i class="nav-icon nav-icon2"></i>
					<span>工单管理</span>
				</template>


				<el-menu-item index="/WorkOrder/Unallocated"  @click="openFullScreen"  v-loading.fullscreen.lock="fullscreenLoading">未分配</el-menu-item>
				<el-menu-item index="/WorkOrder/Unfinished">未完成</el-menu-item>
				<el-menu-item index="/WorkOrder/Finished">已完成</el-menu-item>
			</el-submenu>

			<el-submenu index = "3">
				<template slot="title">
					<i class="nav-icon nav-icon3"></i>
					<span>实时监控</span>
				</template>
				<el-menu-item index="/monitor/Water">给水</el-menu-item>
				<el-menu-item index="/monitor/Power">供配电</el-menu-item>
				<el-menu-item index="/monitor/HVAC">暖通</el-menu-item>
			</el-submenu>

			<el-menu-item index="/plan/mPlan">
				<i class="nav-icon nav-icon4"></i>
				<span slot="title">维保计划</span>
			</el-menu-item>

			<el-submenu index = "4">
				<template slot="title">
					<i class="nav-icon nav-icon5"></i>
					<span>报警管理</span>
				</template>
				<el-menu-item index="/alarm/realTime">实时报警</el-menu-item>
				<el-menu-item index="/alarm/history">历史报警</el-menu-item>
				<el-menu-item index="/alarm/RTU">RTU在线监测</el-menu-item>
			</el-submenu>

			<el-submenu index = "5">
				<template slot="title">
					<i class="nav-icon nav-icon6"></i>
					<span>统计分析</span>
				</template>
				<el-menu-item index="/statistic/realTimeElectricity">实时用电</el-menu-item>
				<el-menu-item index="/statistic/monthElectricity">月度用电</el-menu-item>
				<el-menu-item index="/statistic/realTimeWater">实时用水</el-menu-item>
				<el-menu-item index="/statistic/monthWater">月度用水</el-menu-item>
				<el-menu-item index="/statistic/patrolLog">巡检日志</el-menu-item>
				<el-menu-item index="/statistic/workOrderStatistics">工单统计</el-menu-item>

			</el-submenu>

			<el-submenu index = "6">
				<template slot="title">
					<i class="nav-icon nav-icon7"></i>
					<span>系统设置</span>
				</template>
				<el-menu-item index="/systemSetting/user/user">用户管理</el-menu-item>
				<el-menu-item index="/systemSetting/permission/permission">权限管理</el-menu-item>
				<el-menu-item index="/systemSetting/role/role">角色管理</el-menu-item>
				<el-menu-item index="/systemSetting/log/log">日志管理</el-menu-item>
				<el-menu-item index="/systemSetting/RTU/RTU">RTU管理</el-menu-item>
				<el-menu-item index="/systemSetting/project/project">项目管理</el-menu-item>
				<el-menu-item index="/systemSetting/group/group">组团管理</el-menu-item>
				<el-menu-item index="/systemSetting/template/template">模板管理</el-menu-item>
				<el-menu-item index="/systemSetting/type/type">类型管理</el-menu-item>
				<el-menu-item index="/systemSetting/area/area">区域管理</el-menu-item>
				<el-menu-item index="/systemSetting/department/department">部门管理</el-menu-item>
			</el-submenu>
	      <!-- <el-menu-item index="4">
	        <i class="el-icon-setting"></i>
	        <span slot="title">导航四</span>
	      </el-menu-item> -->

	    </el-menu>
	  
	</el-row>
</nav>
</template>


<script>
  export default {
  	data () {
  		return{
  			fullscreenLoading: false,
  			
  		}

  	},
  	
	mounted:function(){
		
	},
    methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);

		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		openFullScreen() {
			const loading = this.$loading({
				lock: true,
				text: '拼命加载中...',
				background: 'rgba(0, 0, 0, 0.7)'
	        });

	        setTimeout(() => {
	        	loading.close();
	        }, 2000);
	       
        },
        
    }
  };
</script>



<style lang="scss" scoped>

 @import '../assets/scss/util.scss';

 nav{
 	width: 150px;
 	height: 100%;
 	position: absolute;
 	top: 0px;
 	bottom: 0px;
 	left: 0px;
 	margin: auto;
	background: #14171e;
	
	.el-menu{
		border-right:none;
		
	}
	.el-submenu{
		.el-menu-item{
			text-indent: 17px;
			min-width: auto;
		}
	} 

	.nav-icon{
		width: 25px;
		height: 25px;
		display: inline-block;
		margin-right: 10px;
		
	}
	.nav-icon1{
		background: url(../assets/images/home/nav_icon1.png) no-repeat center center;
	}
	.nav-icon2{
		background: url(../assets/images/home/nav_icon2.png) no-repeat center center;
	}
	.nav-icon3{
		background: url(../assets/images/home/nav_icon3.png) no-repeat center center;
	}
	.nav-icon4{
		background: url(../assets/images/home/nav_icon4.png) no-repeat center center;
	}
	.nav-icon5{
		background: url(../assets/images/home/nav_icon5.png) no-repeat center center;
	}
	.nav-icon6{
		background: url(../assets/images/home/nav_icon6.png) no-repeat center center;
	}
	.nav-icon7{
		background: url(../assets/images/home/nav_icon7.png) no-repeat center center;
	}

 }
	

</style>