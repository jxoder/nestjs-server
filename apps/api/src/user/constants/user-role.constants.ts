export enum USER_ROLE {
  ANONYMOUS = 'ANONYMOUS',
  USER = 'USER',
  ADMIN = 'ADMIN',
  MASTER = 'MASTER',
}

// default role privilege level
export const USER_ROLE_PRIV = {
  [USER_ROLE.ANONYMOUS]: 5,
  [USER_ROLE.USER]: 10,
  [USER_ROLE.ADMIN]: 15,
  [USER_ROLE.MASTER]: 20,
} as const
