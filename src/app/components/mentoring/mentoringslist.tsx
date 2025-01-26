import React from 'react';
import Mentorings from '../../interfaces/interfaces';

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
    <div>
      <h3>Mentorías Disponibles JAH!!!!:</h3>
      <ul>
        {mentorings.map(mentoring => (
          <li key={mentoring.description}>{mentoring.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MentoringsList;
