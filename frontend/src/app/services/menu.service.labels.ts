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
    title: 'Home',
    key: 'dashboard',
    url: '/dashboard',
    icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
    pro: true,
  },

  {
      title: 'General',
      
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
  

       



      {
        key: 'Inventory Periods',
        title: 'Inventory Periods',
        url: '/inv/setup/inventory-periods',
        pro: true
      },

      {
        key: 'Inventory Periods',
        title: 'Inventory Periods',
        url: '/inv/setup/inventory-periods/{var}',
        pro: true
      },






      {
        key: 'Slow Moving Policy',
        title: 'Slow Moving Policy',
        url: '/inv/setup/slow-moving-policy',
        pro: true
      },

      {
        key: 'Slow Moving Policy',
        title: 'Slow Moving Policy',
        url: '/inv/setup/slow-moving-policy/{var}',
        pro: true
      },

      {
        key: 'Items Group',
        title: 'Items Group',
        url: '/inv/setup/item-groups/{var}',
        pro: true
      },
      {
        key: 'Items Group',
        title: 'Items Group',
        url: '/inv/setup/item-groups',
        pro: true
      },
      {
        key: 'Items Templates',
        title: 'Items Templates',
        url: '/inv/setup/item-templates',
        pro: true
      },
      {
        key: 'Items Templates',
        title: 'Items Templates',
        url: '/inv/setup/item-templates/{var}',
        pro: true
      },
      {
        key: 'Items Templates Details',
        title: 'Items Templates Details',
        url: '/inv/setup/item-templates/{var}/details',
        pro: true
      },

      {
        key: 'Shortage-Policy',
        title: 'Shortage-Policy',
        url: '/inv/setup/shortage-policy',
        pro: true
      },
      {
        key: 'Shortage-Policy',
        title: 'Shortage-Policy',
        url: '/inv/setup/shortage-policy/{var}',
        pro: true
      },
      {
        key: 'Tax Schema',
        title: 'Tax Schema',
        url: '/inv/setup/tax-schemes',
        pro: true
      },
      {
        key: 'Tax Schema',
        title: 'Tax Schema',
        url: '/inv/setup/tax-schemes/{var}',
        pro: true
      },
      {
        key: 'Tax Schema',
        title: 'Tax Schema',
        url: '/inv/setup/tax-schemes/{var}/details',
        pro: true
      },
      {
        key: 'Supplier',
        title: 'Supplier',
        url: '/inv/setup/supplier',
        pro: true
      },
      {
        key: 'Suppliers',
        title: 'Suppliers',
        url: '/inv/setup/supplier/{var}',
        pro: true
      },
      {
        key: 'Chart Of Accounts',
        title: 'Chart Of Accounts',
        url: '/inv/setup/chart-of-accounts',
        pro: true
      },
      {
        key: 'Chart Of Accounts',
        title: 'Chart Of Accounts',
        url: '/inv/setup/chart-of-accounts/{var}',
        pro: true
      },
      {
        key: 'Subsidiary Inv Setup',
        title: 'Subsidiary Inv Setup',
        url: '/inv/setup/subsidiary-inv-setup',
        pro: true
      },
      {
        key: 'Subsidiary Inv Setup',
        title: 'Subsidiary Inv Setup',
        url: '/inv/setup/subsidiary-inv-setup/{var}',
        pro: true
      },
      {
        key: 'Item',
        title: 'Item',
        url: '/inv/setup/items/{var}',
        pro: false,
        children: [
          {
            key: 'Aliases',
            title: 'Aliases',
            url: '/inv/setup/items/{var}/aliases',
            pro: false,
          },
          {
            key: 'Alias',
            title: 'Alias',
            url: '/inv/setup/items/{var}/aliases/{var}',
            pro: false,
          },
          {
            key: 'Item Componentses',
            title: 'Item Componentses',
            url: '/inv/setup/items/{var}/item-components',
            pro: false,
          },
          {
            key: 'Item Components',
            title: 'Item Components',
            url: '/inv/setup/items/{var}/item-components/{var}',
            pro: false,
          },
          {
            key: 'Item Balances',
            title: 'Item Balances',
            url: '/inv/setup/items/{var}/item-balances',
            pro: false,
          },
          {
            key: 'Item Balance',
            title: 'Item Balance',
            url: '/inv/setup/items/{var}/item-balances/{var}',
            pro: false,
          },
          {
            key: 'Item Substitutions',
            title: 'Item Substitutions',
            url: '/inv/setup/items/{var}/item-substitutions',
            pro: false,
          },
          {
            key: 'Item Substitution',
            title: 'Item Substitution',
            url: '/inv/setup/items/{var}/item-substitutions/{var}',
            pro: false,
          },
          {
            key: 'Item Suppliers',
            title: 'Item Suppliers',
            url: '/inv/setup/items/{var}/item-suppliers',
            pro: false,
          },
          {
            key: 'Item Supplier',
            title: 'Item Supplier',
            url: '/inv/setup/items/{var}/item-suppliers/{var}',
            pro: false,
          },
          {
            key: 'Item Balances Details',
            title: 'Item Balances Details',
            url: '/inv/setup/items/{var}/item-balances/{var}/details',
            pro: false,
          },
          {
            key: 'Item Balances Units',
            title: 'Item Balances Units',
            url: '/inv/setup/items/{var}/item-balance-units',
            pro: false,
          },
          {
            key: 'Item Balances Units',
            title: 'Item Balances Units',
            url: '/inv/setup/items/{var}/item-balance-units/{var}',
            pro: false,
          },
          {
            key: 'Item Supplier',
            title: 'Item Supplier',
            url: '/inv/setup/items/{var}/suppliers',
            pro: false,
          },
          {
            key: 'Item Supplier',
            title: 'Item Supplier',
            url: '/inv/setup/items/{var}/suppliers/{var}',
            pro: false,
          },
          {
            key: 'Item Details',
            title: 'Item Details',
            url: '/inv/setup/items/{var}/details',
            pro: false,
          }
        ]
      },
      {
        key: 'Inventory',
        title: 'Inventory',
        url: 'setup/items/main',
        pro: true,
      },
      {
        key: 'Inventory',
        title: 'Stores',
        url: '/inv/setup/stores',
        pro: true
      },
      {
        key: 'Inventory',
        title: 'Inventory',
        url: '/inv/setup/stores/{var}/edit',
        pro: true,
      },
      {
        key: 'Store',
        title: 'Store',
        url: '/inv/setup/stores/{var}',
        pro: false,
        children: [
          {
            key: 'Store',
            title: 'Store',
            url: '/inv/setup/stores/{var}/edit/',
            pro: false,
          },
          {
            key: 'Stores Item Groups',
            title: 'Stores Item Groups',
            url: '/inv/setup/stores/{var}/stores-item-group',
            pro: false,
          },
          {
            key: 'Stores Item Group',
            title: 'Stores Item Group',
            url: '/inv/setup/stores/{var}/stores-item-group/{var}',
            pro: false,
          },
          {
            key: 'Stores Item Groups No',
            title: 'Stores Item Groups No',
            url: '/inv/setup/stores/{var}/stores-item-group-no',
            pro: false,
          },
          {
            key: 'Stores Item Group No',
            title: 'Stores Item Group No',
            url: '/inv/setup/stores/{var}/stores-item-group-no/{var}',
            pro: false,
          },
          {
            key: 'Stores Items',
            title: 'Stores Items',
            url: '/inv/setup/stores/{var}/stores-items',
            pro: false,
          },
          {
            key: 'Stores Item',
            title: 'Stores Item',
            url: '/inv/setup/stores/{var}/stores-items/{var}',
            pro: false,
          },
          {
            key: 'Stores Items No',
            title: 'Stores Items No',
            url: '/inv/setup/stores/{var}/stores-items-no',
            pro: false,
          },
          {
            key: 'Stores Item No',
            title: 'Stores Item NO',
            url: '/inv/setup/stores/{var}/stores-items-no/{var}',
            pro: false,
          },
          {
            key: 'Stores Document Types',
            title: 'Stores Document Types',
            url: '/inv/setup/stores/{var}/stores-document-types',
            pro: false,
          },
          {
            key: 'Stores Document Type',
            title: 'Stores Document Type',
            url: '/inv/setup/stores/{var}/stores-document-types/{var}',
            pro: false,
          },
          {
            key: 'Stores Locations',
            title: 'Stores Locations',
            url: '/inv/setup/stores/{var}/stores-locations',
            pro: false,
          },
          {
            key: 'Stores Location',
            title: 'Stores Location',
            url: '/inv/setup/stores/{var}/stores-locations/{var}',
            pro: false,
          },
        ]
      }
    ],
  },
  {
    title: 'Operations',
    key: 'Operations',
    icon: 'icmn icmn-file-text',
    children: [
      {
        key: 'StoreList',
        title: 'StoreList',
        url: '/inv/operations/stores',
        pro: true,
      },
      {
        key: 'Operations',
        title: 'Operations',
        url: '/inv/operations/stores/{var}',
        pro: true,
      },
      {
        key: 'Documents',
        title: 'Documents',
        url: '/inv/operations/stores/{var}/doc',
        pro: true,
      },
      {
        key: 'Open Balance',
        title: 'Open Balance',
        url: '/inv/operations/stores/{var}/open-balance',
        pro: true,
      },
      {
        key: 'Open Balance',
        title: 'Open Balance',
        url: '/inv/operations/stores/{var}/open-balance/{var}',
        pro: true,
      },
      {
        key: 'Receiving',
        title: 'Receiving',
        url: '/inv/operations/stores/{var}/rcv-doc',
        pro: true,
      },
      {
        key: 'Receiving Document',
        title: 'Receiving Document',
        url: '/inv/operations/stores/{var}/rcv-doc/{var}',
        pro: true,
      },
      {
        key: 'Receiving Inspection',
        title: 'Receiving Inspection',
        url: '/inv/operations/stores/{var}/rcv-insp',
        pro: true,
      },
      {
        key: 'Receiving Inspection',
        title: 'Receiving Inspection',
        url: '/inv/operations/stores/{var}/rcv-insp/{var}',
        pro: true,
      },
      {
        key: 'Receiving Temporary',
        title: 'Receiving Temporary',
        url: '/inv/operations/stores/{var}/rcv-temp',
        pro: true,
      },
      {
        key: 'Receiving Temporary',
        title: 'Receiving Temporary',
        url: '/inv/operations/stores/{var}/rcv-temp/{var}',
        pro: true,
      },
      {
        key: 'Transfer',
        title: 'Transfer',
        url: '/inv/operations/stores/{var}/inv-transfer',
        pro: true,
      },
      {
        key: 'Transfer',
        title: 'Transfer',
        url: '/inv/operations/stores/{var}/inv-transfer/{var}',
        pro: true,
      },
    ]
    }
]
export const getTopMenuData: any[] = [
  {
    title: 'Settings',
    key: 'settings',
    icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
  },
  {
    title: 'Documentation',
    key: 'documentation',
    url: 'https://docs.cleanuitemplate.com/angular/getting-started',
    target: '_blank',
    icon: 'icmn icmn-books',
  },
  {
    divider: true,
  },
  {
    title: 'Home',
    key: 'dashboard',
    url: '/dashboard',
    icon: 'icmn icmn-home',
    pro: true,
  },

  {
    title: 'Setup',
    key: 'Setup',
    icon: 'icmn icmn-file-text',
    children: [
      {
        key: 'Inventory',
        title: 'Inventory',
        url: '/inv/setup',
        pro: true,
      },
      {
        key: 'Items',
        title: 'Items',
        url: '/inv/setup/items',
        pro: true,

      },
      {
        key: 'Item',
        title: 'Item',
        url: '/inv/setup/items/{var}',
        pro: false,
        children: [
          {
            key: 'Aliases',
            title: 'Aliases',
            url: '/inv/setup/items/{var}/aliases',
            pro: false,
          },
          {
            key: 'Alias',
            title: 'Alias',
            url: '/inv/setup/items/{var}/aliases/{var}',
            pro: false,
          },
          {
            key: 'Item Componentses',
            title: 'Item Componentses',
            url: '/inv/setup/items/{var}/item-components',
            pro: false,
          },
          {
            key: 'Item Components',
            title: 'Item Components',
            url: '/inv/setup/items/{var}/item-components/{var}',
            pro: false,
          },
          {
            key: 'Item Balances',
            title: 'Item Balances',
            url: '/inv/setup/items/{var}/item-balances',
            pro: false,
          },
          {
            key: 'Item Balance',
            title: 'Item Balance',
            url: '/inv/setup/items/{var}/item-balances/{var}',
            pro: false,
          },
          {
            key: 'Item Balances Units',
            title: 'Item Balances Units',
            url: '/inv/setup/items/{var}/item-balance-units',
            pro: false,
          },
          {
            key: 'Item Balances Units',
            title: 'Item Balances Units',
            url: '/inv/setup/items/{var}/item-balance-units/{var}',
            pro: false,
          }
        ]
      },
      {
        key: 'Inventory',
        title: 'Inventory',
        url: '/inv/setup/items/createupdateitem/:mode',
        pro: true,
      },
      {
        key: 'Inventory',
        title: 'Inventory',
        url: 'setup/items/main',
        pro: true,
      },
    ],
  }
]
