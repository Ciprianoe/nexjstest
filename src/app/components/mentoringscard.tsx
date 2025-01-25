// MentoringCard.tsx

import React, { useState } from 'react';
import MentoringDetails from './mentoringsdetails';


const MentoringCard: React.FC<{ mentoring: any }> = ({ mentoring }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDetails = () => {
    setExpanded(!expanded);
  };

  return (
    <li className="flex flex-col gap-y-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 max-w-sm">
      <div className="flex items-center">
        <img
          src={`https://load-qv4lgu7kga-uc.a.run.app/images/${mentoring.image}`}
          alt={mentoring.name}
          className="h-24 w-24 rounded-lg mr-4"
          width={"800"}
          height={"500"}
        />
        <h2 className="text-xl font-bold text-primary">{mentoring.name}</h2>
      </div>
      <button onClick={toggleDetails} className="mt-2 bg-blue-500 text-white rounded px-4 py-2">
        {expanded ? 'Ver menos' : 'Más info'}
      </button>
      {expanded && <MentoringDetails mentoring={mentoring} />}
    </li>
  );
};

export default MentoringCard;
