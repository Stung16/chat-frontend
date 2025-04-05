/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatStore } from '@/store/useChatStore';
import { useState } from 'react';
export default function ButtonAddRoom() {
  const [open, setOpen] = useState<boolean>(false);
  const { users, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <button className='bg-primary mx-auto w-fit rounded-lg px-4 py-2 text-xs font-bold text-white'>
          + Add Room
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add chat</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='flex max-h-[20rem] flex-col overflow-y-auto'>
          {users?.map((_: any) => (
            <button
              key={_.id}
              onClick={() => {
                setSelectedUser(_);
                setOpen(false);
              }}
              className={`hover:bg-base-300 transition-colorsbg-base-300 ring-base-300 flex w-full cursor-pointer items-center gap-3 p-3 ring-1`}
            >
              <div className='relative mx-auto lg:mx-0'>
                <img
                  src={'/avatar.png'}
                  alt={'User profile'}
                  className='size-8 rounded-full object-cover'
                />
                {onlineUsers.includes(_.id?.toString()) && (
                  <span className='absolute right-0 bottom-0 size-3 rounded-full bg-green-500 ring-2 ring-zinc-900' />
                )}
              </div>

              <div className='hidden min-w-0 text-left lg:block'>
                <div className='truncate text-xs font-medium'>{_.username}</div>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
