// components/MentoringsList.tsx
import React from 'react';
import Mentorings from '../interfaces/interfaces';

interface MentoringsListProps {
  mentorings: Mentorings[];
  loading: boolean;
}

const MentoringsList: React.FC<MentoringsListProps> = ({ mentorings, loading }) => {
  if (loading) {
    return <p>Cargando Mentorías...</p>;
  }

  if (mentorings.length === 0) {
    return <p>No hay mentorías disponibles.</p>;
  }

  return (
    <div className="mt-4">
      <h3 className="font-semibold">Mentorías Disponibles JAH!!!!:</h3>
      <ul>
        {mentorings.map(mentoring => (
          <li key={mentoring.description} className="mt-2">{mentoring.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MentoringsList;
