export const endpoints = {
  health: () => `/health`,

  users: {
    login: () => `/api/v1/users/auth/login`,
    logout: () => `/api/v1/users/auth/logout`,
    profile: (id: number) => `/api/v1/users/profiles/${id}`,
    roles: () => `/api/v1/users/roles`,
    // Optional (some implementations expose GET /roles/{user_id}).
    rolesByUser: (userId: number) => `/api/v1/users/roles/${userId}`,
    verificationBase: () => `/api/v1/users/verification`
  },

  academic: {
    academicProfile: (id: number) => `/api/v1/academic/students/${id}/academic-profile`
  },

  community: {
    programs: () => `/api/v1/community/programs`,
    programById: (programId: string | number) => `/api/v1/community/programs/${programId}`,
    registerHours: () => `/api/v1/community/hours/register`,
    studentHours: (studentId: number) => `/api/v1/community/hours/student/${studentId}`
  },

  internships: {
    offers: () => `/api/v1/internships/offers`,
    offerById: (offerId: string | number) => `/api/v1/internships/offers/${offerId}`,
    registerHours: () => `/api/v1/internships/hours/register`,
    studentHours: (studentId: number) => `/api/v1/internships/hours/student/${studentId}`
  },

  languages: {
    courses: () => `/api/v1/languages/english/courses`,
    studentLevel: (studentId: number) => `/api/v1/languages/english/level/student/${studentId}`,
    updateLevel: () => `/api/v1/languages/english/level/update`
  },

  // The following domains may not be fully wired in the API Gateway yet.
  // We still define them so the UI can show PRO mock screens.
  library: {
    clearance: (studentId: number) => `/api/v1/library/clearance/student/${studentId}`,
    certificates: (studentId: number) => `/api/v1/library/certificates/student/${studentId}`
  },

  finance: {
    clearance: (studentId: number) => `/api/v1/finance/clearance/student/${studentId}`
  },

  graduation: {
    status: (studentId: number) => `/api/v1/graduation/status/student/${studentId}`
  },

  notifications: {
    list: (studentId: number) => `/api/v1/notifications/student/${studentId}`
  }
} as const;
