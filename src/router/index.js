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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router