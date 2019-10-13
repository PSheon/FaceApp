const defaultNavigationConfig = [
  {
    id: 'ys-about-section',
    title: '關於我們',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'ys-services',
        title: '服務內容',
        type: 'item',
        icon: 'home',
        url: '/ys-services'
      },
      {
        id: 'ys-space',
        title: '空間介紹',
        type: 'item',
        icon: 'home',
        url: '/ys-space'
      },
      {
        id: 'ys-contact',
        title: '聯絡我們',
        type: 'item',
        icon: 'photo_filter',
        url: '/ys-contact-us'
      },
      {
        id: 'ys-faq',
        title: '常見問答',
        type: 'item',
        icon: 'photo_filter',
        url: '/ys-faq'
      }
    ]
  },
  {
    id: 'ys-news',
    title: '最新消息',
    type: 'item',
    icon: 'home',
    url: '/news-list'
  },
  {
    id: 'ys-information',
    title: '職場情報',
    type: 'item',
    icon: 'photo_filter',
    url: '/information-list'
  },
  {
    id: 'ys-accompanies-link',
    title: '友站連結',
    type: 'item',
    icon: 'live_help',
    url: '/accompanies-list'
  }
];

export const ADMIN_SECTION = {
  id: 'admin-section',
  title: '網站設定',
  type: 'group',
  icon: 'apps',
  children: [
    {
      id: 'staff-helping',
      title: '員工列表',
      type: 'item',
      icon: 'list_alt',
      url: '/admin/staff-list'
    }
  ]
};

export const STAFF_SECTION = {
  id: 'staff-section',
  title: '網站管理',
  type: 'group',
  icon: 'apps',
  children: [
    {
      id: 'staff-dashboard',
      title: 'YS 報表',
      type: 'item',
      icon: 'chrome_reader_mode',
      url: '/staff/dashboard'
    },
    {
      id: 'user-list',
      title: '會員列表',
      type: 'item',
      icon: 'account_box',
      url: '/staff/user-list'
    },
    {
      id: 'images-list',
      title: '圖片列表',
      type: 'item',
      icon: 'image',
      url: '/staff/images-list'
    },
    // {
    // 	'id': 'images-list-gallery',
    // 	'title': '圖片瀑布',
    // 	'type': 'item',
    // 	'icon': 'apps',
    // 	'url': '/staff/images-list-gallery'
    // },
    {
      id: 'documents-list',
      title: '文件列表',
      type: 'item',
      icon: 'picture_as_pdf',
      url: '/staff/documents-list'
    },
    {
      id: 'carousels-list',
      title: '輪播圖片列表',
      type: 'item',
      icon: 'perm_media',
      url: '/staff/carousels-list'
    },
    {
      id: 'speakers-list',
      title: '講師列表',
      type: 'item',
      icon: 'fiber_new',
      url: '/staff/speakers-list'
    },
    {
      id: 'news-list',
      title: '新聞列表',
      type: 'item',
      icon: 'fiber_new',
      url: '/staff/news-list'
    },
    {
      id: 'events-list',
      title: '活動列表',
      type: 'item',
      icon: 'fiber_new',
      url: '/staff/events-list'
    },
    {
      id: 'information-list',
      title: '情報列表',
      type: 'item',
      icon: 'perm_device_information',
      url: '/staff/information-list'
    },
    {
      id: 'appointment-consulting-list',
      title: '諮詢預約',
      type: 'item',
      icon: 'perm_device_information',
      url: '/staff/appointment-list/consulting'
    },
    {
      id: 'appointment-borrow-list',
      title: '空間借用預約',
      type: 'item',
      icon: 'perm_device_information',
      url: '/staff/appointment-list/borrow'
    },
    {
      id: 'appointment-guide-list',
      title: '空間導覽預約',
      type: 'item',
      icon: 'perm_device_information',
      url: '/staff/appointment-list/guide'
    }
  ]
};

export const USER_DASHBOARD_SECTION = {
  id: 'user-dashboard',
  title: '我的 YS',
  type: 'group',
  icon: 'apps',
  children: [
    {
      id: 'user-dashboard-activity',
      title: '活動報名歷程',
      type: 'item',
      icon: 'widgets',
      url: '/user/dashboard/activity'
    },
    {
      id: 'user-dashboard-consulting',
      title: '諮詢歷程',
      type: 'item',
      icon: 'widgets',
      url: '/user/dashboard/consulting'
    },
    {
      id: 'user-dashboard-borrow',
      title: '空間借用歷程',
      type: 'item',
      icon: 'widgets',
      url: '/user/dashboard/borrow'
    },
    {
      id: 'user-dashboard-guide',
      title: '參訪申請歷程',
      type: 'item',
      icon: 'widgets',
      url: '/user/dashboard/guide'
    }
  ]
};

/* Only Used in layout1 */
export const CUSTOMER_SERVICE_SECTION = {
  id: 'customer-service',
  title: '我的帳號',
  type: 'group',
  icon: 'apps',
  children: [
    {
      id: 'customer-personal-settings',
      title: '帳號設置',
      type: 'item',
      icon: 'settings_applications',
      url: '/personal-settings'
    },
    {
      id: 'logout',
      title: '登出 1788',
      type: 'item',
      icon: 'exit_to_app',
      url: '/logout'
    }
  ]
};

export default defaultNavigationConfig;
