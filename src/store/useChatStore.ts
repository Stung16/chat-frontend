/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { toast } from 'sonner';
import { axiosInstance } from '@/apis/axois';
import { useAuthStore } from './useAuthStore';

interface Message {
  text: any;
  image: any;
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  _id: string;
  fullName: string;
  email?: string;
  profilePic?: string;
}

interface MessageData {
  text: string;
  image?: string | null;
}

interface ChatStoreState {
  messages: Message[];
  users: User[];
  selectedUser: null | User;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  isLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (messageData: MessageData) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
  setSelectedUser: (selectedUser: User | null) => void;
}

export const useChatStore = create<ChatStoreState>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isLoading: false,
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get('/messages/users');
      set({ users: res.data });
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Không thể tải danh sách người dùng',
      );
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Không thể tải tin nhắn');
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData: MessageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;

    set({ isLoading: true });
    try {
      const formData = new FormData();
      formData.append('text', messageData.text);
      if (messageData.image) {
        formData.append('image', messageData.image);
      }

      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      set({ messages: [...messages, res.data] });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Không thể gửi tin nhắn');
    } finally {
      set({ isLoading: false });
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on('newMessage', (newMessage: Message) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off('newMessage');
  },

  setSelectedUser: (selectedUser: User | null) => set({ selectedUser }),
}));
