// src/app/mentorings/page.tsx
import React from 'react';
import Navbar from '../components/navbar';
import MentoringsClient from './MentoringsClient';


const MentoringsPage = () => {
  return (
    <div>
      <Navbar />
      <MentoringsClient />
    </div>
  );
};

export default MentoringsPage;
