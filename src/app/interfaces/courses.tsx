"use client";
interface Resource {
    [x: string]: any;
    file: string;
    name: string;
}

interface Class {
    [x: string]: any;
    courseKey: string;
    createdAt: string;
    description: string;
    isActive: boolean;
    name: string;
    orden: number;   
    video: string;
    key: string;
}


interface Characteristic {
    description: string;
    icon: string;
    isActive: boolean;
    name: string;
}

export default interface Courses {
    [x: string]: any;
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
    createdAt: string; 
    ranking: number; 
    quantity: number; 
    view: number; 
    class: Class[]; 
    mentor: { 
        avatar: string;
        biography: string;
        email: string;
        key: string;
        name: string;
        numberOfMentoring: number;
        role: string;
    };
    resource:Resource[];
   
}