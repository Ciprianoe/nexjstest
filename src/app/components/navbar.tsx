"use client"; 
// components/navbar.tsx  BY CEEM
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation'; 

const Navbar: React.FC = () => {
    const pathname = usePathname(); 

    return (
        <nav style={{ backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', height: '64px' }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'flex', flexShrink: 0, gap: '1rem' }}>
                            <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: pathname === '/' ? 'blue' : 'gray' }}>
                                Home
                            </Link>
                            <Link href="/mentorings" style={{ color: 'gray' }}>
                                Mentorías
                            </Link>
                            <Link href="/courses" style={{ color: 'gray' }}>
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
