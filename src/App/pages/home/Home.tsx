import ChatContainer from '@/components/chat/ChatContainer';
import NoChatSelected from '@/components/NoChatSelected';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useChatStore } from '@/store/useChatStore';

export default function Home() {
  const { selectedUser } = useChatStore();
  return (
    <div className='bg-base-200 container mx-auto h-screen'>
      <div className='flex items-center justify-center pt-16'>
        <div className='bg-base-100 h-[calc(100vh-4rem)] w-full max-w-screen rounded-lg shadow-2xl'>
          <div className='flex h-full overflow-hidden rounded-lg'>
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
}
