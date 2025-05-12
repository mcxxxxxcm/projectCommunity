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
import WechatPaymentPage from '../views/wechat-payment-page.vue';
import FoundItem from '../views/FoundItem.vue';
import LostAndFound from '../views/LostAndFound.vue';

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
    path: '/wechat-payment-page',
    name: 'WechatPaymentPage',
    component: WechatPaymentPage
  },
  {
    path: '/lostandfound',
    name: 'LostAndFound',
    component: LostAndFound
  },
  {
    path: '/foundItem',
    name: 'FoundItem',
    component: FoundItem
  },
  {
    path: '/lostAndFound',
    name: 'LostAndFound',
    component: LostAndFound
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router