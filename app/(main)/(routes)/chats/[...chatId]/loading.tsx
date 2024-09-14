
import {  LoaderCircle } from "lucide-react";
const loading = () => {
  return (
    <div className="p-6 h-full w-full flex flex-col items-center justify-center
       space-y-4">
      <LoaderCircle
        className="size-20 animate-spin"
      />


      <div className="text-center">
        <h2 className="text-xl dark:text-white text-black font-semibold">
          Loading Chat
        </h2>

        <p className="mt-2  text-sm text-zinc-500">
          this might take up to a second
        </p>
      </div>
    </div>
  );
};

export default loading;
