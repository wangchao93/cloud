import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'

import Unallocated from './views/WorkOrder/Unallocated.vue'
import Finished from './views/WorkOrder/Finished.vue'
import Unfinished from './views/WorkOrder/Unfinished.vue'

import Water from './views/monitor/Water.vue'
import Power from './views/monitor/Power.vue'
import HVAC from './views/monitor/HVAC.vue'

import MPlan from './views/plan/mPlan.vue'

import RealTime from './views/alarm/realTime.vue'
import History from './views/alarm/history.vue'
import RTU from './views/alarm/RTU.vue'

import RealTimeElectricity from './views/statistic/realTimeElectricity.vue'
import MonthElectricity from './views/statistic/monthElectricity.vue'
import RealTimeWater from './views/statistic/realTimeWater.vue'
import MonthWater from './views/statistic/monthWater.vue'
import PatrolLog from './views/statistic/patrolLog.vue'
import WorkOrderStatistics from './views/statistic/workOrderStatistics.vue'

import User from './views/systemSetting/user/user.vue'
import Permission from './views/systemSetting/permission/permission.vue'
import Role from './views/systemSetting/role/role.vue'
import Log from './views/systemSetting/log/log.vue'
import SetRTU from './views/systemSetting/RTU/RTU.vue'
import Project from './views/systemSetting/project/project.vue'
import Group from './views/systemSetting/group/group.vue'
import Template from './views/systemSetting/template/template.vue'
import Type from './views/systemSetting/type/type.vue'
import Area from './views/systemSetting/area/area.vue'
import Department from './views/systemSetting/department/department.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/WorkOrder/Unallocated',
      name: 'Unallocated',
      component: () => import(/* webpackChunkName: "list" */ './views/WorkOrder/Unallocated.vue')
    },
    {
      path: '/WorkOrder/Finished',
      name: 'Finished',
      component: () => import(/* webpackChunkName: "user" */ './views/WorkOrder/Finished.vue')
    },
    {
      path: '/WorkOrder/Unfinished',
      name: 'Unfinished',
      component: () => import(/* webpackChunkName: "user" */ './views/WorkOrder/Unfinished.vue')
    },
    
    {
      path: '/monitor/Water',
      name: 'Water',
      component: () => import(/* webpackChunkName: "user" */ './views/monitor/Water.vue')
    },
    {
      path: '/monitor/Power',
      name: 'Power',
      component: () => import(/* webpackChunkName: "user" */ './views/monitor/Power.vue')
    },
    {
      path: '/monitor/HVAC',
      name: 'HVAC',
      component: () => import(/* webpackChunkName: "user" */ './views/monitor/HVAC.vue')
    },
    {
      path: '/plan/mPlan',
      name: 'mPlan',
      component: () => import(/* webpackChunkName: "user" */ './views/plan/mPlan.vue')
    },

    {
      path: '/alarm/realTime',
      name: 'realTime',
      component: () => import(/* webpackChunkName: "user" */ './views/alarm/realTime.vue')
    },
     {
      path: '/alarm/history',
      name: 'history',
      component: () => import(/* webpackChunkName: "user" */ './views/alarm/history.vue')
    },
     {
      path: '/alarm/RTU',
      name: 'RTU',
      component: () => import(/* webpackChunkName: "user" */ './views/alarm/RTU.vue')
    },

    {
      path: '/statistic/realTimeElectricity',
      name: 'realTimeElectricity',
      component: () => import(/* webpackChunkName: "user" */ './views/statistic/realTimeElectricity.vue')
    },
    {
      path: '/statistic/monthElectricity',
      name: 'monthElectricity',
      component: () => import(/* webpackChunkName: "user" */ './views/statistic/monthElectricity.vue')
    },
    {
      path: '/statistic/realTimeWater',
      name: 'realTimeWater',
      component: () => import(/* webpackChunkName: "user" */ './views/statistic/realTimeWater.vue')
    },
    {
      path: '/statistic/monthWater',
      name: 'monthWater',
      component: () => import(/* webpackChunkName: "user" */ './views/statistic/monthWater.vue')
    },
    {
      path: '/statistic/patrolLog',
      name: 'patrolLog',
      component: () => import(/* webpackChunkName: "user" */ './views/statistic/patrolLog.vue')
    },
    {
      path: '/statistic/workOrderStatistics',
      name: 'workOrderStatistics',
      component: () => import(/* webpackChunkName: "user" */ './views/statistic/workOrderStatistics.vue')
    },

    {
      path: '/systemSetting/user/user',
      name: 'user',
      component: () => import(/* webpackChunkName: "user" */ './views/systemSetting/user/user.vue')
    },
    {
      path: '/systemSetting/permission/permission',
      name: 'permission',
      component: () => import(/* webpackChunkName: "user" */ './views/systemSetting/permission/permission.vue')
    },
    {
      path: '/systemSetting/role/role',
      name: 'role',
      component: () => import(/* webpackChunkName: "user" */ './views/systemSetting/role/role.vue')
    },
    {
      path: '/systemSetting/log/log',
      name: 'log',
      component: () => import(/* webpackChunkName: "user" */ './views/systemSetting/log/log.vue')
    },
    {
      path: '/systemSetting/RTU/RTU',
      name: 'RTU',
      component: () => import(/* webpackChunkName: "user" */ './views/systemSetting/RTU/RTU.vue')
    },
    {
      path: '/systemSetting/project/project',
      name: 'project',
      component: () => import(/* webpackChunkName: "user" */ './views/systemSetting/project/project.vue')
    },
    {
      path: '/systemSetting/group/group',
      name: 'group',
      component: () => import(/* webpackChunkName: "user" */ './views/systemSetting/group/group.vue')
    },
    {
      path: '/systemSetting/template/template',
      name: 'template',
      component: () => import(/* webpackChunkName: "user" */ './views/systemSetting/template/template.vue')
    },
    {
      path: '/systemSetting/type/type',
      name: 'type',
      component: () => import(/* webpackChunkName: "user" */ './views/systemSetting/type/type.vue')
    },
    {
      path: '/systemSetting/area/area',
      name: 'area',
      component: () => import(/* webpackChunkName: "user" */ './views/systemSetting/area/area.vue')
    },
    {
      path: '/systemSetting/department/department',
      name: 'department',
      component: () => import(/* webpackChunkName: "user" */ './views/systemSetting/department/department.vue')
    },
  ]
})
