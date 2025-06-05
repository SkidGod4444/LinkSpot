interface ChatRoom {
  id: string;
  title: string;
  description: string;
  isGroup: boolean;
  $createdAt?: Date;
  $updatedAt?: Date;
}
