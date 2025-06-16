
interface ClubT {
    id: string;
    name: string;
    description: string;
    members?: UserT[];
    events?: EventT[];
    tags?: string[];
    $createdAt?: Date;
    $updatedAt?: Date;
}

interface UserT {
    id: string;
    name: string;
    username: string;
    email: string;
    bio?: string;
    pfp?: string;
    role?: 'user' | 'admin';
    clubs?: string[];
    events?: string[];
    interests?: string[];
    following?: string[];
    followers?: string[];
    notifications?: string[];
    cordinates?: string[];
    ip?: string;
    $createdAt?: Date;
    $updatedAt?: Date;
}

interface EventT {
    id: string;
    title: string;
    description: string;
    date: Date;
    location?: string;
    clubId?: string; // Reference to ClubT
    attendees?: string[];
    tags?: string[];
    organizerId: string; // Reference to UserT
    $createdAt?: Date;
    $updatedAt?: Date;
}