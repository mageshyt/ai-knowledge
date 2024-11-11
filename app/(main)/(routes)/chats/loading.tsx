import { Loader2 } from "lucide-react";
const loading = () => {
  return (
    <div
      className="p-6 h-full w-full flex flex-col items-center justify-center
       space-y-2"
    >
      <Loader2 className="size-10 dark:text-zinc-500 text-zinc-400  animate-spin" />

      <div className="text-center">

        <p className="mt-2  text-xs dark:text-zinc-500 text-zinc-400">
          please wait we are preparing your dashboard
        </p>
      </div>
    </div>
  );
};

export default loading;
