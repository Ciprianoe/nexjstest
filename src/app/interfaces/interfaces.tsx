"use client";

import { Key } from "react";

export default interface Characteristic {
    categoryKey: Key | null | undefined;
    description: string;
    icon: string;
    isActive: boolean;
    name: string;
    descriptionUno?: string; // Propiedad opcional
    descriptionDos?: string; // Propiedad opcional
    descriptionTres?: string; // Propiedad opcional
}

export  interface Mentorings {
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


