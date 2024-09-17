
import tw from 'tailwind-styled-components';

import { Mic, SendHorizonal } from 'lucide-react';
import { Logo } from '@/components/global/Logo';
import { CreateConversationCard } from './components/create-conversation-card';


const ChatsPage = () => {
  return <Wrapper>

    <MainContainer>

    <Logo type='full' size='lg' />
    {/* TODO : Info Banner */}

    <div className='mt-10'>
      <CreateConversationCard />
    </div>
    </MainContainer>



    <SearchBar>
      <Mic className='size-4 ml-1 text-muted-foreground' />
      <input
        disabled
        className='bg-transparent h-full w-full border-none p-2 '
        placeholder='Search for a chat'
      />
      <SendHorizonal className='size-4 mr-1 text-muted-foreground' />
    </SearchBar>

  </Wrapper>;
};

export default ChatsPage;


const Wrapper= tw.div`h-full w-full flex flex-col p-4 items-center justify-between`
const MainContainer=tw.div`flex-1 flex flex-col items-center justify-center gap-4`
const SearchBar = tw.div`border bg-white/5 xl:max-w-4xl max-w-md  md:max-w-xl  lg:max-w-2xl w-full flex items-center justify-between p-2 rounded-xl`
