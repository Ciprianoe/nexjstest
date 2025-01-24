"use client";

export interface Characteristic {
    description: string;
    icon: string;
    isActive: boolean;
    name: string;

}



export interface MentoringsList {
    id: string;
    categoryKey: string;
    characteristics: Characteristic[];
    description: string;
    detail: string;
    name: string;
    image: string; 
    isActive: boolean; 
    key: string; 
    mentorKey: string; 
    price: number; 
    promotionalPrice: number; 
    tax: number; 
    title: string; 
    updatedAt: string; 
    icon: string;
    mentor: { 
        avatar: string;
        biography: string;
        email: string;
        key: string;
        name: string;
        numberOfMentoring: number;
        role: string;
    };
}