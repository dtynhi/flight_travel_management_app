const routers = {
  home: {
    pathName: '',
    fullPath: '/'
  },
  auth: {
    pathName: 'auth',
    login: {
      pathName: 'login',
      fullPath: '/auth/login'
    },
    register: {
      pathName: 'register',
      fullPath: '/auth/register'
    },
    verifyEmail: {
      pathName: 'verify-email',
      fullPath: '/auth/verify-email'
    },
    forgotPassword: {
      pathName: 'forgot-password',
      fullPath: '/auth/forgot-password'
    },
    resetPassword: {
      pathName: 'reset-password',
      fullPath: '/auth/reset-password'
    },
    pendingApproval: {
      pathName: 'pending-approval',
      fullPath: '/auth/pending-approval'
    }
  },
  listing: {
    pathName: 'listings',
    fullPath: '/listings'
  },
  inventories: {
    pathName: 'inventories',
    fullPath: '/inventories'
  },
  orders: {
    pathName: 'orders',
    fullPath: '/orders'
  },
  finances: {
    pathName: 'finances',
    fullPath: '/finances',
    summary: {
      pathName: 'summary',
      fullPath: '/finances/summary'
    },
    transaction: {
      pathName: 'transaction',
      fullPath: '/finances/transaction'
    },
    payment: {
      pathName: 'payment',
      fullPath: '/finances/payment'
    }
  },
  report: {
    pathName: 'reports',
    fullPath: '/reports'
  },
  store: {
    pathName: 'store',
    fullPath: '/store'
  },
  analytic: {
    pathName: 'analytic',
    fullPath: '/analytic'
  },
  oauth2: {
    pathName: 'oauth2',
    fullPath: '/oauth2',
    callback: {
      pathName: 'callback',
      fullPath: '/oauth2/callback'
    },
    verify: {
      pathName: 'verify',
      fullPath: '/oauth2/verify'
    }
  },
  settings: {
    pathName: 'settings',
    fullPath: '/settings'
  },
  error: {
    allError: '*',
    serverError: '/5xx',
    forbidden: '/403',
    notFound: '/404'
  },
  booking: {
    pathName: 'booking',
    fullPath: '/booking'
  }
} as const;

export default routers;
