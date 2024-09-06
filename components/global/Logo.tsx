import Image from 'next/image'
import tw from 'tailwind-styled-components';
import { cn } from '@/lib'

interface LogoProps {
  type :"minimal" | "full"
  size: "sm" | "md" | "lg"
}
export const Logo = ({type,size}:LogoProps) => {
  return (
    <Container className='flex items-center gap-2'>
    {/*----------------- Logo----------------------- */}
      <div
      className={cn('relative aspect-square',
      size === "sm" && 'size-8',
      size === "md" && 'size-12',
      size === "lg" && 'size-16',
      )}
    >
      <Image
      src="/logo.svg"
      fill
      alt="knowledgeVerse Logo"
    />


      </div>

    {/*----------------- Logo Text----------------------- */}
      {
        type==="full" && <div className="text-lg font-bold">KnowledgeVerse</div>
      }

      </Container>
  )
}

const Container=tw.div`flex items-center gap-2`
