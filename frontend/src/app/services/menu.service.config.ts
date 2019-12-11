export const getLeftMenuData: any[] = [
  {
    title: 'Settings',
    key: 'settings',
    icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
  },
  {
    divider: true,
  },
  {
    title: 'HOME',
    key: 'dashboard',
    url: '/alert/dashboard',
    icon: 'icmn icmn-home',
    pro: false,
  },

  {
    title: 'GENERAL',
    icon: 'icmn icmn-cogs',
    children: [
      {
        key: 'EVENT_SETUP',
        title: 'EVENT_SETUP',
        url: '/alert/Eventsetup',
        pro: true,
      },
      {
        key: 'GENERAL_LOGS',
        title: 'GENERAL_LOGS',
        url: '/alert/logs',
        pro: true,
      },
    ],
  },

   
]
export const getTopMenuData: any[] = [
  {
    title: 'Settings',
    key: 'settings',
    icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
  },
  {
    divider: true,
  },
  {
    title: 'Home',
    key: 'dashboard',
    url: './dashboard',
    icon: 'icmn icmn-home',
    pro: false,
  },

  {
    title: 'General Setup',
     
    children: [
      {
        key: 'Event',
        title: 'Event Setup',
        url: '/alert/Eventsetup',
        pro: true,
      },
      {
        key: 'Genral logs',
        title: 'Genral logs',
        url: '/alert/logs',
        pro: true,
      },
    ],
  },

   
]
