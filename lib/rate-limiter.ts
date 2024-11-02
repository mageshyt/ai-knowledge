
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";
import { getIp } from "./get-ip";
import { log } from "console";


const rateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(10, "5 s")
})


const sidebarRateLimit = async ()=>{
  try {
    const ip=await getIp();
    const key=`sidebar-${ip}`;
    console.log("KEY",key)

    const {success,pending,limit,remaining}=await rateLimit.limit(key);

    if(remaining<=0  || !success){
      return {
        error:"Rate Limit"
      }
    }

    return null;


  } catch (error) {
    return {
      error :"Something went wrong"
    }
  }
}

export { rateLimit,sidebarRateLimit };
