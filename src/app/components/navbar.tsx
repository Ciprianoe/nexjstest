"use client"; 
//components/navbar.tsx  BY CEEM
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation'; 

const Navbar: React.FC = () => {
    const pathname = usePathname(); 

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 space-x-4">
                            <Link href="/" className={`text-xl font-bold ${pathname === '/' ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
                                Home
                            </Link>
                            <Link href="/mentorings" className={`text-gray-700 hover:text-primary ${pathname === '/mentorings' ? 'text-primary' : ''}`}>
                                Mentorías
                            </Link>
                            <Link href="/courses" className={`text-gray-700 hover:text-primary ${pathname === '/courses' ? 'text-primary' : ''}`}>
                                Cursos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
