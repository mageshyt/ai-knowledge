import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";
import { getIp } from "./get-ip";


const rateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(100, "60 s")
})




const chatsRateLimit = async (chatId: string) => {
  try {
    const ip = await getIp();
    const key = `chats-${ip}-${chatId}`;

    const { success, remaining } = await rateLimit.limit(key);

    if (remaining <= 0 || !success) {
      return {
        error: "Rate Limit"
      }
    }

    return null;

  }
  catch (error) {
    return {
      error: "Something went wrong"
    }
  }
}


const sidebarRateLimit = async () => {
  try {
    const ip = await getIp();
    const key = `sidebar-${ip}`;

    const { success, remaining } = await rateLimit.limit(key);

    if (remaining <= 0 || !success) {
      return {
        error: "Rate Limit"
      }
    }

    return null;


  } catch (error) {
    return {
      error: "Something went wrong"
    }
  }
}

export { rateLimit, sidebarRateLimit, chatsRateLimit };
