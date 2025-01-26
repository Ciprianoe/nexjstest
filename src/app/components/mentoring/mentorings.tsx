"use client";
// Mentorings.tsx
// components/Mentorias.tsx BY CEEM
import React from 'react';
import MentoringCard from './mentoringscard';

const Mentorings: React.FC<{ mentorings: any[] }> = ({ mentorings }) => {
  console.log(mentorings);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Mentorías</h1>
      <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
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
