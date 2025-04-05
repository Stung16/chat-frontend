// import { useAuthStore } from '@/store/useAuthStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatStore } from '@/store/useChatStore';
import { X } from 'lucide-react';

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className='border-base-300 border-b p-2.5'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          {/* Avatar */}
          <div className='relative mx-auto lg:mx-0'>
            <div className='size-10 rounded-full'>
              <img
                className='object-cover'
                src={'/avatar.png'}
                alt={'avatar'}
              />
              {selectedUser && onlineUsers.includes(selectedUser._id) && (
                <span className='absolute right-0 bottom-0 size-3 rounded-full bg-green-500 ring-2 ring-zinc-900' />
              )}
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className='font-medium'>{selectedUser?.fullName}</h3>
            <p className='text-base-content/70 text-sm'>
              {selectedUser && onlineUsers.includes(selectedUser._id)
                ? 'Online'
                : 'Offline'}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          className='cursor-pointer'
          onClick={() => setSelectedUser(null)}
        >
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
