// src/app/mentorings/page.tsx
import React from 'react';
import Mentorings from '../components/mentorings';
import Navbar from '../components/navbar';

const MentoringsPage = () => {
  return (
    <div>      
      <Navbar/>
      <Mentorings/>
    </div>
  );
};

export default MentoringsPage;
