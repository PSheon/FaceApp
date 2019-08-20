const defaultNavigationConfig = [
	{
		'id': 'ys-home',
		'title': 'YS 首頁',
		'type': 'item',
		'icon': 'home',
		'url': '/home',
	},
	{
		'id': 'ys-about',
		'title': '關於 YS',
		'type': 'item',
		'icon': 'photo_filter',
		'url': '/about',
	},
	{
		'id': 'ys-qna',
		'title': '常見問答',
		'type': 'item',
		'icon': 'live_help',
		'url': '/helping'
	},
	{
		'id': 'divider',
		'type': 'divider',
	},
	{
		'id': 'login-hint',
		'title': '登入後使用更多功能',
		'type': 'item',
		'url': '/login'
	}
];

export const HOME_SECTION = {
	'id': 'ys-home-section',
	'title': 'Youth Salon',
	'type': 'group',
	'icon': 'apps',
	'children': [
		{
			'id': 'ys-home',
			'title': 'YS 首頁',
			'type': 'item',
			'icon': 'home',
			'url': '/home',
		},
		{
			'id': 'ys-space',
			'title': '空間運用與介紹',
			'type': 'item',
			'icon': 'home',
			'url': '/space',
		},
		{
			'id': 'ys-about',
			'title': '關於 YS',
			'type': 'item',
			'icon': 'photo_filter',
			'url': '/about',
		},
		{
			'id': 'ys-faq',
			'title': '常見問答',
			'type': 'item',
			'icon': 'live_help',
			'url': '/faq'
		},
	]
};

export const ADMIN_SECTION = {
	'id': 'admin-section',
	'title': '網站設定',
	'type': 'group',
	'icon': 'apps',
	'children': [
		{
			'id': 'admin-dashboard',
			'title': 'YS 主控版',
			'type': 'item',
			'icon': 'chrome_reader_mode',
			'url': '/admin/dashboard'
		},
		{
			'id': 'staff-helping',
			'title': '員工列表',
			'type': 'item',
			'icon': 'list_alt',
			'url': '/admin/staff-list'
		},
	]
}

export const LEADER_SECTION = {
	'id': 'leader-section',
	'title': '經理工作區',
	'type': 'group',
	'icon': 'apps',
	'children': [
		{
			'id': 'user-list',
			'title': '會員列表',
			'type': 'item',
			'icon': 'assignment_ind',
			'url': '/staff/user-list'
		},
	]
}

export const STAFF_SECTION = {
	'id': 'staff-section',
	'title': '專員工作區',
	'type': 'group',
	'icon': 'apps',
	'children': [
		{
			'id': 'user-list',
			'title': '會員列表',
			'type': 'item',
			'icon': 'account_box',
			'url': '/staff/user-list'
		},
		{
			'id': 'images-list',
			'title': '圖片列表',
			'type': 'item',
			'icon': 'image',
			'url': '/staff/images-list'
		},
		{
			'id': 'images-list-gallery',
			'title': '圖片瀑布',
			'type': 'item',
			'icon': 'apps',
			'url': '/staff/images-list-gallery'
		},
		{
			'id': 'documents-list',
			'title': '文件列表',
			'type': 'item',
			'icon': 'picture_as_pdf',
			'url': '/staff/documents-list'
		},
		{
			'id': 'carousels-list',
			'title': '輪播圖片列表',
			'type': 'item',
			'icon': 'perm_media',
			'url': '/staff/carousels-list'
		},
		{
			'id': 'news-list',
			'title': '新聞列表',
			'type': 'item',
			'icon': 'fiber_new',
			'url': '/staff/news-list'
		},
	]
}

export const USER_DASHBOARD_SECTION = {
	'id': 'user-dashboard',
	'title': '我的活動',
	'type': 'group',
	'icon': 'apps',
	'children': [
		{
			'id': 'user-dashboard-history',
			'title': '活動報名歷程',
			'type': 'item',
			'icon': 'widgets',
			'url': '/user/dashboard'
		},
	]
}

export const CUSTOMER_SERVICE_SECTION = {
	'id': 'customer-service',
	'title': '我的帳號',
	'type': 'group',
	'icon': 'apps',
	'children': [
		{
			'id': 'customer-personal-settings',
			'title': '帳號設置',
			'type': 'item',
			'icon': 'settings_applications',
			'url': '/personal-settings'
		},
		{
			'id': 'logout',
			'title': '登出 1788',
			'type': 'item',
			'icon': 'exit_to_app',
			'url': '/logout'
		},
	]
}

export default defaultNavigationConfig;
