
import tw from 'tailwind-styled-components';

import {  Mic, SendHorizonal } from 'lucide-react';
import { Logo } from '@/components/global/Logo';


  const ChatsPage = () => {
  return <Container>
      <Logo type='full' size='lg' />
    {/* TODO : Info Banner */}



    <SearchBar>
      <Mic className='size-4 ml-1 text-muted-foreground' />
      <input
        disabled
        className='bg-transparent h-full w-full border-none p-2 '
        placeholder='Search for a chat'
      />
      <SendHorizonal className='size-4 mr-1 text-muted-foreground' />
      </SearchBar>
    
    </Container>;
};

export default ChatsPage;


const Container = tw.div`relative h-screen w-full flex flex-col p-4 items-center justify-center`
const SearchBar = tw.div`absolute border bg-white/5 bottom-10 xl:max-w-4xl max-w-md  md:max-w-xl  lg:max-w-2xl w-full flex items-center justify-between p-2 rounded-xl`
