'use server'
import { headers } from 'next/headers'
export const getIp = async () => {
  // TODO : Refactor this later
  // const forwardedFor = headers().get("x-forwarded-for") ?? '127.0.0.1';

  const forwardedFor = '127.0.0.1';

  const realIp = headers().get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  if (realIp) {
    return realIp.trim();
  }

  return null;

}
