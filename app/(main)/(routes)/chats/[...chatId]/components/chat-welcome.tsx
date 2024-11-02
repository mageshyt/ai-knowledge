
import { Hash } from "lucide-react";
import React, { FC } from "react";

interface ChatWelcomeProps {
  name: string;
  type: "chatSession" ;
}
export const ChatWelcome: FC<ChatWelcomeProps> = ({ name, type }) => {
  const style = {
    wrapper: "px-4 mb-3 space-y-2",
    HashContainer:
      "h-[75px] w-[75px] rounded-full p-1 flex items-center justify-center dark:bg-zinc-600 bg-zinc-500",
    text: "text-xl font-semibold md:text-2xl",
    text_sm: "text-zinc-600 dark:text-zinc-400 text-sm",
  };
  return (
    <div className={style.wrapper}>
      {type === "chatSession" && (
        <div className={style.HashContainer}>
          <Hash className="w-12 h-12" />
        </div>
      )}

      <h1 className={style.text}>
        {" "}
        {type === "chatSession" ? "welcome to #" : ""}
        {name}
      </h1>
      <p className={style.text_sm}>{getTemplate(type, name)}</p>
    </div>
  );
};

const getTemplate = (type: "chatSession" , name: string) => {
  switch (type) {
    case "chatSession":
      return `This is the start of the  # ${name} csession.`;
    default:
      return `This is the beginning of your conversation with ${name}.`;
  }
};
