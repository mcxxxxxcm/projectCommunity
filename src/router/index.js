import { createRouter, createWebHistory } from 'vue-router'
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
import ComplaintMobile from '../views/Complaint-Mobile.vue'
import LostAndFoundMobile from '../views/LostAndFound-Mobile.vue'
import ParkingMobile from '../views/Parking-Mobile.vue'
import PrivacyMobile from '../views/Privacy-Mobile.vue'
import ChildCareMobile from '../views/ChildCare-Mobile.vue'
import UtilitiesMobile from '../views/Utilities-Mobile.vue'
import CommunityNoticeMobile from '../views/CommunityNotice-Mobile.vue'
import CommunityErrandsMobile from '../views/CommunityErrands-Mobile.vue'
import WaterBillPayment from '../views/WaterBillPayment.vue';
import ElectricityBillPayment from '../views/ElectricityBillPayment.vue';
import GasBillPayment from '../views/GasBillPayment.vue';
import BillingHistory from '../views/BillingHistory.vue'

const routes = [
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
  {
    path: '/PointsMall-PC',
    name: 'pointsMallPC',
    component: PointsMallPC
  },
  {
    path: '/ChildCare-PC',
    name: 'childCarePC',
    component: ChildCarePC
  },
  {
    path: '/Utilities-PC',
    name: 'utilitiesPC',
    component: UtilitiesPC
  },
  {
    path: '/CommunityErrands-PC',
    name: 'communityErrandsPC',
    component: CommunityErrandsPC
  },
  {
    path: '/Privacy-PC',
    name: 'privacyPC',
    component: PrivacyPC
  },
  {
    path: '/Complaint-PC',
    name: 'complaintPC',
    component: ComplaintPC
  },
  {
    path: '/LostAndFound-PC',
    name: 'lostAndFoundPC',
    component: LostAndFoundPC
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('../views/mine.vue')
  },
  {
    path: '/PointsMall-Mobile',
    name: 'pointsMallMobile',
    component: PointsMallMobile
  },
  {
    path: '/mine-Mobile',
    name: 'mine-Mobile',
    component: () => import('../views/mine-Mobile.vue')
  },
  {
    path: '/Parking-PC',
    name: 'parkingPC',
    component: ParkingPC
  },
  {
    path: '/CommunityNotice-PC',
    name: 'CommunityNoticePC',
    component: () => import('../views/CommunityNotice-PC.vue')
  },
  {
    path: '/message-Mobile',
    name: 'messageMobile',
    component: () => import('../views/message-Mobile.vue')
  },
  {
    path: '/Complaint-Mobile',
    name: 'complaintMobile',
    component: ComplaintMobile
  },
  {
    path: '/LostAndFound-Mobile',
    name: 'lostAndFoundMobile',
    component: LostAndFoundMobile
  },
  {
    path: '/Parking-Mobile',
    name: 'parkingMobile',
    component: ParkingMobile
  },
  {
    path: '/Privacy-Mobile',
    name: 'privacyMobile',
    component: PrivacyMobile
  },
  {
    path: '/ChildCare-Mobile',
    name: 'childCareMobile',
    component: ChildCareMobile
  },
  {
    path: '/Utilities-Mobile',
    name: 'utilitiesMobile',
    component: UtilitiesMobile
  },
  {
    path: '/CommunityNotice-Mobile',
    name: 'communityNoticeMobile',
    component: CommunityNoticeMobile
  },
  {
    path: '/CommunityErrands-Mobile',
    name: 'communityErrandsMobile',
    component: CommunityErrandsMobile
  },
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
  {
    path: '/electricity-analysis',
    component: () => import('../views/ElectricityAnalysis.vue')
  },
  {
    path: '/safety-guide',
    component: () => import('../views/SafetyGuide.vue')
  },
  {
    path: '/Utilities-Mobile',
    component: () => import('../views/Utilities-Mobile.vue')
  },
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
  },
  // ... existing code ...
{
  path: '/electricity-analysismobile',
  component: () => import('../views/ElectricityAnalysisMobile.vue')
},
 // ... existing code ...
{
  path: '/safety-guidemobile',
  component: () => import('../views/SafetyGuideMobile.vue')
},
{
  path: '/electricity-analysis',
  component: () => import('../views/ElectricityAnalysis.vue')
},
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router