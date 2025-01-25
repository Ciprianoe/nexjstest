"use client";
// Mentorings.tsx
// components/Mentorias.tsx BY CEEM
import React, { useState } from 'react';
import MentoringCard from './mentoringscard';

const Mentorings: React.FC<{ mentorings: any[] }> = ({ mentorings }) => {
  console.log(mentorings);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Mentorías</h1>
      <ul className="flex flex-wrap justify-center space-x-4 space-y-4">
        {mentorings.length > 0 ? (
          mentorings.map((mentoring, index) => (
            <MentoringCard key={mentoring.categoryKey} mentoring={mentoring} />
          ))
        ) : (
          <div>No hay mentorías disponibles.</div>
        )}
      </ul>
    </div>
  );
};

export default Mentorings;
