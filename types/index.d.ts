interface ChatRoom {
  id: string;
  title: string;
  description: string;
  image?: string; // Optional, can be used for group chats
  isGroup: boolean;
  $createdAt?: Date;
  $updatedAt?: Date;
}
