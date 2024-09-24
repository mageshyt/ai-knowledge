import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useSocket } from "@/components/providers/socket-provider";
import { MessageWithUserProfile } from "@/typings/typing";

type ChatSocketProps = {
  addKey: string;
  queryKey: string;
};

export const useChatSocket = ({ addKey, queryKey }: ChatSocketProps) => {
  const queryClient = useQueryClient();
  const { socket } = useSocket();

  useEffect(() => {
    console.log("useChatSocket", socket);
    // check if socket is available
    if (!socket) return;

    // socket event to watch for new messages
    socket.on(addKey, (message: MessageWithUserProfile) => {
      queryClient.setQueriesData(
        {
          queryKey: [queryKey],
        },
        (oldData: any) => {
          if (!oldData || !oldData.pages || oldData.pages.length === 0) {
            return {
              page: [
                {
                  messages: [message],
                },
              ],
            };
          }

          const newData = [...oldData.pages];

          newData[0] = {
            messages: [...newData[0].messages, message],
          };

          return {
            ...oldData,
            pages: newData,
          };
        }
      );
    });

    return () => {
      socket.off(addKey);
    };
  }, [socket, queryClient, addKey, queryKey]);
};
