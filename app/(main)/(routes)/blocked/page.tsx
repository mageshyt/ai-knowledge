import { Card } from '@/components/ui/card';
import GridPattern from '@/components/ui/grid-pattern';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { cn } from '@/lib/utils';
import { AlertCircle, Clock } from 'lucide-react';
import Link from 'next/link';

const blockedPage = () => {

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <GridPattern
        strokeDasharray={"4 2"}
        height={40}
        width={40}
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
        )}

      />
      <div className="max-w-xl w-full mx-auto relative z-10">
        <Card className="border-2 p-4 flex flex-col items-center space-y-4 bg-zinc-900 bg-opacity-70">
           {/* HEADER  */}
          <div className='flex flex-col items-center text-center'>
            <div className="relative">
              <div className="absolute inset-0 animate-ping-slow rounded-full bg-red-500/20" />
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-full relative">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* CONTENT  */}

          <div className="space-y-3 text-center">
            <h1 className="text-3xl  font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Rate Limit Exceeded
            </h1>
            <p className="text-sm text-muted-foreground mt-4">
              Our systems have detected unusual traffic from your device.
            </p>
          </div>

          <Link
            href="/"
            passHref
          >
            <RainbowButton>
              Go back to home
            </RainbowButton>
          </Link>


          <div className="flex items-center justify-center mt-4">
            <Clock className="size-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground ml-2">
              Please try again in a few minutes.
            </p>
          </div>
        </Card>
      </div>


    </div>
  );
}

export default blockedPage;
