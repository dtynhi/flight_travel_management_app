const routers = {
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
  report: {
    pathName: 'report',
    fullPath: '/report',
    monthly: {
      pathName: 'monthly',
      fullPath: '/report/monthly'
    },
    yearly: {
      pathName: 'yearly',
      fullPath: '/report/yearly'
    }
  },
  settings: {
    pathName: 'settings',
    fullPath: '/settings'
  },
  addFlight: {
    pathName: 'add-flight',
    fullPath: '/add-flight'
  },
  flightList: {
    pathName: 'flights',
    fullPath: '/flights'
  },
  editFlight: {
    pathName: 'flights/:id',
    fullPath: '/flights/:id'
  },
  flightSearch: {
    pathName: 'flight-search',
    fullPath: '/flight-search'
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
  },
  regulation: {
    pathName: 'regulations',
    fullPath: '/regulations'
  },
  airport: {
    pathName: 'airport',
    fullPath: '/airport'
  },
  ticket: {
    pathName: 'my-ticket',
    fullPath: '/my-ticket'
  },
  employee: {
    pathName: 'employee',
    fullPath: '/employee'
  }
} as const;

export default routers;

