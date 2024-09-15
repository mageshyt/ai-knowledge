
import { Button } from "@/components/ui/button"
import { MdAdminPanelSettings } from "react-icons/md";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Shield } from "lucide-react";
export const SettingsSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant="ghost"
          className='size-8'
          size={'icon'}
        >
          <Shield
            className="size-4"
          />
        </Button>
      </SheetTrigger>
      <SheetContent>

        <SheetHeader>
          <SheetTitle>
            Manage Chat Sesstion
          </SheetTitle>
          <SheetDescription>
            Manage the chat session and its participants
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-2">
        </div>
      </SheetContent>
    </Sheet>
  )
}

