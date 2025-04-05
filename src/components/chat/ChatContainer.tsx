/* eslint-disable @typescript-eslint/no-unused-vars */
import { useChatStore } from '../../store/useChatStore';
import { useEffect, useRef, useState } from 'react';

import { useAuthStore } from '../../store/useAuthStore';
import MessageSkeleton from '@/components/loadings/MessageSkeleton';
import ChatHeader from '@/components/chat/ChatHeader';
import MessageInput from '@/components/chat/MessageInput';
import { formatMessageTime } from '@/lib/utils';

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());

  // Scroll to bottom helper function
  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  };

  // Track image loading
  const handleImageLoad = (messageId: string) => {
    setLoadingImages((prev) => {
      const newSet = new Set(prev);
      newSet.delete(messageId);
      return newSet;
    });
  };

  const handleImageLoadStart = (messageId: string) => {
    setLoadingImages((prev) => {
      const newSet = new Set(prev);
      newSet.add(messageId);
      return newSet;
    });
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
    selectedUser,
  ]);

  useEffect(() => {
    // Load all message images
    const imagesToLoad = messages
      .filter((message) => message.image)
      .map((message) => message._id);

    setLoadingImages(new Set(imagesToLoad));

    // If no images or all images loaded, scroll to bottom
    if (imagesToLoad.length === 0) {
      scrollToBottom();
    }
  }, [messages]);

  // When all images are loaded, scroll to bottom
  useEffect(() => {
    if (loadingImages.size === 0 && messages.length > 0) {
      setTimeout(scrollToBottom, 100);
    }
  }, [loadingImages, messages.length]);

  return (
    <div className='flex flex-1 flex-col overflow-auto'>
      <ChatHeader />

      {isMessagesLoading ? (
        <MessageSkeleton />
      ) : (
        <div className='flex-1 space-y-4 overflow-y-auto p-4'>
          {messages.map((message) => (
            <div
              key={message._id}
              onClick={() => {
                console.log(message);
              }}
              className={`chat ${
                authUser && message.senderId === authUser._id
                  ? 'chat-end'
                  : 'chat-start'
              }`}
            >
              <div className='chat-image avatar'>
                <div className='size-10 rounded-full border'>
                  <img
                    src={
                      message.senderId === authUser?._id
                        ? authUser?.profilePic || '/avatar.png'
                        : selectedUser?.profilePic || '/avatar.png'
                    }
                    alt='profile pic'
                  />
                </div>
              </div>
              <div className='chat-header mb-1'>
                <time className='ml-1 text-xs opacity-50'>
                  {formatMessageTime(new Date(message.createdAt))}
                </time>
              </div>
              <div className='chat-bubble flex flex-col'>
                {message.image && (
                  <img
                    src={message.image}
                    alt='Attachment'
                    className='mb-2 rounded-md sm:max-w-[200px]'
                    style={{
                      height: 'auto',
                      maxHeight: '200px',
                      width: 'auto',
                      objectFit: 'contain',
                      minHeight: '50px', // Đặt chiều cao tối thiểu
                    }}
                    onLoad={() => handleImageLoad(message._id)}
                    onError={() => handleImageLoad(message._id)}
                    onLoadStart={() => handleImageLoadStart(message._id)}
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          ))}
          {/* Ensure the last message is always in view */}
          <div ref={messageEndRef} />
        </div>
      )}

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
