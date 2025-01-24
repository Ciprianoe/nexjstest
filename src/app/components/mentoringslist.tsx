"use client";
import React from 'react';
import { MentoringsList as MentoringsListType } from '../interfaces/interfaces';

interface MentoringsListProps {
  mentorings: MentoringsListType[];
  setSelectedMentoring: (mentoring: MentoringsListType) => void;
}

const MentoringsList: React.FC<MentoringsListProps> = ({ mentorings, setSelectedMentoring }) => {
  return (
    <ul>
      {mentorings.map((mentoring) => (
        <li key={mentoring.key}>
          <h2>{mentoring.name}</h2>
          <button onClick={() => setSelectedMentoring(mentoring)}>Más Información</button>
        </li>
      ))}
    </ul>
  );
};

export default MentoringsList;
