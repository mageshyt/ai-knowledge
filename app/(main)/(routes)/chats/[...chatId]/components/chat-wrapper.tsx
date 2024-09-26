import tw from 'tailwind-styled-components';
import Show from "@/components/global/show";

import { Messages } from "./messages";
import ChatInput from "./chat-input";

interface ChatWrapperProps {
  sessionId: string;
  hasPermission: boolean;
}

export const ChatWrapper = ({
  sessionId,
  hasPermission,
}: ChatWrapperProps) => {

  return (
    <Wrapper >

      {/*--------------- Chat messages ------------- */}
      <MessageWrapper>

        <Messages
          sessionId={sessionId}
          apiUrl="/api/messages"
          paramKey="sessionId"
          paramValue={sessionId}
        />

      </MessageWrapper>

      {/*--------------- Chat Input------------- */}
      <Show>

        <Show.When
          isTrue={hasPermission}
        >
          <ChatInput
            apiUrl="/api/socket/messages"
            query={{ sessionId }}
            name='content'
            sessionId={sessionId}
          />

        </Show.When>
      </Show>

    </Wrapper >
  )
}


const Wrapper = tw.div` flex-col justify-between flex h-full gap-2 p-4 overflow-hidden relative`;

const MessageWrapper = tw.div` flex-1 h-full overflow-hidden `;
