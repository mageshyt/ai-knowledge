import { ragChat } from '@/lib/rag-chat'
import React from 'react'

interface PageProps {
  params: {
    url: string | string[] | undefined
  }
}

function reconstructUrl({ url }: { url: string[] }): string {
  const decodedUrl = url.map((part) => decodeURIComponent(part));
  return decodedUrl.join("/");
}

const page = async ({ params }: PageProps) => {

  // reconstruct the url from the params 
  const reconstructedUrl = reconstructUrl({ url: params.url as string[] })

  console.log(reconstructedUrl)
  //await ragChat.context.add({
  //  type: "html",
  //  source: reconstructedUrl,
  //
  //})
  console.log(params.url)
  return (
    <div className='p-4'>
      current page is {params.url}
    </div>
  )
}

export default page
