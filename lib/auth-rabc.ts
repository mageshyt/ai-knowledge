import {  User } from "@prisma/client";


type Role= keyof typeof ROLES
type Permission = (typeof ROLES)[Role][number]

const ROLES = {
  "ADMIN": [
    "update:user",
    
  ],
  "SUPERADMIN": ["create:admin", "update:admin", "delete:admin","update:user","block:admin","update:superAdmin"],
  "USER": [],
} as const



export function hasPermission(user: User, permission: Permission) {
  return user.roles.some(role =>
    (ROLES[role] as readonly Permission[]).includes(permission)
  )
}


