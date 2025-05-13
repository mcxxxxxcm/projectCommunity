import { createRouter, createWebHistory } from 'vue-router'

// 静态导入的组件
import HomeView from '../views/HomeView.vue'
import MobilePage from '../views/MobilePage.vue'
import PCPage from '../views/PCPage.vue'
import PointsMallPC from '../views/PointsMall-PC.vue'
import ChildCarePC from '../views/ChildCare-PC.vue'
import UtilitiesPC from '../views/Utilities-PC.vue'
import CommunityErrandsPC from '../views/CommunityErrands-PC.vue'
import PrivacyPC from '../views/Privacy-PC.vue'
import ComplaintPC from '../views/Complaint-PC.vue'
import LostAndFoundPC from '../views/LostAndFound-PC.vue'
import PointsMallMobile from '../views/PointsMall-Mobile.vue'
import ParkingPC from '../views/Parking-PC.vue'
import ErrandForm from '../views/ErrandForm.vue'
import CommunityErrandsMobile from '../views/CommunityErrands-Mobile.vue'
import ErrandForm1 from '../views/ErrandForm1.vue'
import WaterBillPayment from '../views/WaterBillPayment.vue'
import ElectricityBillPayment from '../views/ElectricityBillPayment.vue'
import GasBillPayment from '../views/GasBillPayment.vue'
import BillingHistory from '../views/BillingHistory.vue'
import ComplaintMobile from '../views/Complaint-Mobile.vue'
import LostAndFoundMobile from '../views/LostAndFound-Mobile.vue'
import ParkingMobile from '../views/Parking-Mobile.vue'
import PrivacyMobile from '../views/Privacy-Mobile.vue'
import ChildCareMobile from '../views/ChildCare-Mobile.vue'
import UtilitiesMobile from '../views/Utilities-Mobile.vue'
import CommunityNoticeMobile from '../views/CommunityNotice-Mobile.vue'
import WechatPaymentPage from '../views/wechat-payment-page.vue'
import LostAndFound from '../views/LostAndFound.vue'

const routes = [
  // 基础路由
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/MobilePage',
    name: 'mobile',
    component: MobilePage
  },
  {
    path: '/PCPage',
    name: 'pc',
    component: PCPage
  },

  // 社区服务相关
  {
    path: '/errand-form/:serviceType',
    name: 'errandForm',
    component: ErrandForm,
    props: true
  },
  {
    path: '/ErrandForm1/:serviceType',
    name: 'ErrandForm1',
    component: ErrandForm1,
    props: true
  },
  {
    path: '/CommunityErrands-Mobile',
    name: 'communityErrandsMobile',
    component: CommunityErrandsMobile
  },
  {
    path: '/CommunityErrands-PC',
    name: 'communityErrandsPC',
    component: CommunityErrandsPC
  },

  // 积分商城
  {
    path: '/PointsMall-PC',
    name: 'pointsMallPC',
    component: PointsMallPC
  },
  {
    path: '/PointsMall-Mobile',
    name: 'pointsMallMobile',
    component: PointsMallMobile
  },

  // 儿童看护
  {
    path: '/ChildCare-PC',
    name: 'childCarePC',
    component: ChildCarePC
  },
  {
    path: '/ChildCare-Mobile',
    name: 'childCareMobile',
    component: ChildCareMobile
  },

  // 公用事业
  {
    path: '/Utilities-PC',
    name: 'utilitiesPC',
    component: UtilitiesPC
  },
  {
    path: '/Utilities-Mobile',
    name: 'utilitiesMobile',
    component: UtilitiesMobile
  },

  // 账单支付
  {
    path: '/water-bill-payment',
    name: 'WaterBillPayment',
    component: WaterBillPayment
  },
  {
    path: '/electricity-bill-payment',
    name: 'ElectricityBillPayment',
    component: ElectricityBillPayment
  },
  {
    path: '/gas-bill-payment',
    name: 'GasBillPayment',
    component: GasBillPayment
  },
  {
    path: '/billing-history',
    name: 'BillingHistory',
    component: BillingHistory
  },

  // 隐私与投诉
  {
    path: '/Privacy-PC',
    name: 'privacyPC',
    component: PrivacyPC
  },
  {
    path: '/Privacy-Mobile',
    name: 'privacyMobile',
    component: PrivacyMobile
  },
  {
    path: '/Complaint-PC',
    name: 'complaintPC',
    component: ComplaintPC
  },
  {
    path: '/Complaint-Mobile',
    name: 'complaintMobile',
    component: ComplaintMobile
  },
  {
    path: '/complaint-processing',     // 新增路由
    name: 'ComplaintProcessing',
    component: () => import('../views/ComplaintProcessing.vue')
  },

  // 失物招领
  {
    path: '/LostAndFound-PC',
    name: 'lostAndFoundPC',
    component: LostAndFoundPC
  },
  {
    path: '/LostAndFound-Mobile',
    name: 'lostAndFoundMobile',
    component: LostAndFoundMobile
  },
  {
    path: '/lostandfound',
    name: 'LostAndFound',
    component: LostAndFound
  },

  // 个人中心
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('../views/mine.vue')
  },
  {
    path: '/mine-Mobile',
    name: 'mine-Mobile',
    component: () => import('../views/mine-Mobile.vue')
  },

  // 停车服务
  {
    path: '/Parking-PC',
    name: 'parkingPC',
    component: ParkingPC
  },
  {
    path: '/Parking-Mobile',
    name: 'parkingMobile',
    component: ParkingMobile
  },

  // 社区通知
  {
    path: '/CommunityNotice-PC',
    name: 'CommunityNoticePC',
    component: () => import('../views/CommunityNotice-PC.vue')
  },
  {
    path: '/CommunityNotice-Mobile',
    name: 'communityNoticeMobile',
    component: CommunityNoticeMobile
  },

  // 消息中心
  {
    path: '/message-Mobile',
    name: 'messageMobile',
    component: () => import('../views/message-Mobile.vue')
  },

  // 支付相关
  {
    path: '/wechat-payment-page',
    name: 'WechatPaymentPage',
    component: WechatPaymentPage
  },

  // 能耗分析
  {
    path: '/electricity-analysis',
    component: () => import('../views/ElectricityAnalysis.vue')
  },
  {
    path: '/electricity-analysismobile',
    component: () => import('../views/ElectricityAnalysisMobile.vue')
  },

  // 安全指南
  {
    path: '/safety-guide',
    component: () => import('../views/SafetyGuide.vue')
  },
  {
    path: '/safety-guidemobile',
    component: () => import('../views/SafetyGuideMobile.vue')
  },

  // 移动支付
  {
    path: '/water-bill-payment-mobile',
    component: () => import('../views/WaterBillPaymentMobile.vue')
  },
  {
    path: '/billing-history-mobile',
    component: () => import('../views/BillingHistoryMobile.vue')
  },
  {
    path: '/electricity-bill-payment-mobile',
    component: () => import('../views/ElectricityBillPaymentMobile.vue')
  },
  {
    path: '/gas-bill-payment-mobile',
    component: () => import('../views/GasBillPaymentMobile.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router