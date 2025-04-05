/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { useChatStore } from '@/store/useChatStore';
import SidebarSkeleton from '@/components/loadings/SideBarSekeleton';
import { useAuthStore } from '@/store/useAuthStore';

const Sidebar = () => {
  const { getUsers, users, isUsersLoading, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;
  return (
    <aside className='border-base-300 flex h-full w-20 flex-col border-r transition-all duration-200 lg:w-72'>
      <div className='border-base-300 w-full border-b p-5 py-3'>
        <div className='flex items-center gap-2'>
          <Users className='size-6' />
          <span className='hidden font-medium lg:block'>Contacts</span>
        </div>
        {/* <div className='mt-3 flex items-center justify-center gap-2'>
          <button
            className={`rounded-lg px-4 py-2 ${
              !isRoom ? 'bg-base-300' : 'bg-primary text-white'
            }`}
            onClick={() => setIsRoom(true)}
          >
            Room
          </button>
          <button
            className={`rounded-lg px-4 py-2 ${
              !isRoom ? 'bg-primary text-white' : 'bg-base-300'
            }`}
            onClick={() => setIsRoom(false)}
          >
            Users
          </button>
        </div> */}
        {/* TODO: Online filter toggle */}
        {/* {!isRoom && ( */}
        <div className='mt-3 hidden items-center gap-2 lg:flex'>
          <label className='flex cursor-pointer items-center gap-2'>
            <input
              type='checkbox'
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className='checkbox checkbox-sm'
            />
            <span className='text-sm'>Show online only</span>
          </label>
          <span className='text-xs text-zinc-500'>
            ({onlineUsers.length} online)
          </span>
        </div>
        {/* )} */}
      </div>
      <div className='w-full overflow-y-auto py-3'>
        {filteredUsers?.map((_: any, index: number) => (
          <button
            key={index}
            onClick={() => {
              setSelectedUser(_);
              console.log(_);
            }}
            className={`hover:bg-base-300 transition-colorsbg-base-300 ring-base-300 flex w-full cursor-pointer items-center gap-3 p-3 ring-1`}
          >
            <div className='relative mx-auto lg:mx-0'>
              <img
                src={_.profilePic || '/avatar.png'}
                alt={'User profile'}
                className='size-12 rounded-full object-cover'
              />
              {onlineUsers.includes(_._id) && (
                <span className='absolute right-0 bottom-0 size-3 rounded-full bg-green-500 ring-2 ring-zinc-900' />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className='hidden min-w-0 text-left lg:block'>
              <div className='truncate font-medium'>{_.fullName}</div>
              <div className='text-sm text-zinc-400'>
                {onlineUsers.includes(_._id) ? 'Online' : 'Offline'}
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <div className='py-4 text-center text-zinc-500'>No online users</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
