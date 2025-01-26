import React from 'react';
import Courses from '../../interfaces/courses';
import Mentorings from '../../interfaces/interfaces';

interface CourseItemProps {
  course: Courses;
  index: number;
  toggleDetails: (index: number) => void;
  expandedIndex: number | null;
  courseDetails: Courses | null;
  handleFetchMentorings: () => void;
  mentorings: Mentorings[];
  mentoringsLoading: boolean;
  showMentorings: boolean;
}

const CourseItem: React.FC<CourseItemProps> = ({
  course,
  index,
  toggleDetails,
  expandedIndex,
  courseDetails,
  handleFetchMentorings,
  mentorings,
  mentoringsLoading,
  showMentorings,
}) => {
  return (
    <div className="box has-background-dark has-text-white" style={{ maxWidth: '20rem', width: '100%' }}>
      <div className="is-flex is-align-items-center">
        <img 
          src={`https://load-qv4lgu7kga-uc.a.run.app/images/${course.image}`} 
          alt={course.name} 
          className="image is-128x128" 
          width="800" 
          height="500" 
        />
        <h2 className="title is-5 has-text-primary">{course.name}</h2>
      </div>
  
      <button onClick={() => toggleDetails(index)} className="button is-primary mt-2">
        {expandedIndex === index ? 'Ver menos' : 'Más info'}
      </button>
      {expandedIndex === index && courseDetails ? (
        <div>
          <p>{courseDetails.description}</p>
          <button className="button is-primary mt-2" onClick={handleFetchMentorings}>Mentorías Disponibles</button>
          {mentoringsLoading ? (
            <p>Cargando Mentorías...</p>
          ) : (
            showMentorings && mentorings.length > 0 && (
              <div>
                <h3>Mentorías Disponibles:</h3>
                <ul>
                  {mentorings.map(mentoring => (
                    <li key={mentoring.categoryKey}>{mentoring.name}</li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      ) : (
        expandedIndex === index && 
        <div className="box has-background-dark has-text-white" style={{ maxWidth: '20rem' }}>
          No hay detalles del curso disponibles.
        </div>
      )}
    </div>
  );
};

export default CourseItem;
