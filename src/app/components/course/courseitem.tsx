// components/CourseItem.tsx
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
    <li>
      <div>
        <img src={`https://load-qv4lgu7kga-uc.a.run.app/images/${course.image}`} alt={course.name} />
        <h2>{course.name}</h2>
      </div>

      <button onClick={() => toggleDetails(index)}>
        {expandedIndex === index ? 'Ver menos' : 'Más info'}
      </button>
      {expandedIndex === index && courseDetails ? (
        <div>
          <p>{courseDetails.description}</p>
          <p><strong>Título:</strong> {courseDetails.title}</p>
          <p><strong>Precio:</strong> ${courseDetails.price}</p>
          <p><strong>Impuesto:</strong> {courseDetails.tax}%</p>
          <p><strong>Última Actualización:</strong> {new Date(courseDetails.updatedAt).toLocaleDateString()}</p>
          <p><strong>Creado el:</strong> {new Date(courseDetails.createdAt).toLocaleDateString()}</p>
          <p><strong>Ranking:</strong> {courseDetails.ranking}</p>
          <p><strong>Cantidad:</strong> {courseDetails.quantity || "No disponible"}</p>
          <p><strong>Vistas:</strong> {courseDetails.view}</p>
          <div>
            <h2>Material de Apoyo:</h2>
            {courseDetails.class.map((courseClass, index) => (
              <div key={index}>
                <p><strong>Clase #{index + 1}:</strong> {courseClass.name}</p>
                <p><strong>Recursos:</strong> {courseClass.resource.name}</p>
              </div>
            ))}
          </div>
          <div>
            <button onClick={handleFetchMentorings}>
              Mentorías Disponibles
            </button>
          </div>
          {mentoringsLoading ? (
            <p>Cargando Mentorías...</p>
          ) : (
            showMentorings && mentorings.length > 0 && (
              <div>
                <h3>Mentorías Disponibles:</h3>
                <ul>
                  {mentorings.map(mentoring => (
                    <li key={mentoring.description}>{mentoring.name}</li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      ) : (
        expandedIndex === index && <div>No hay detalles del curso disponibles.</div>
      )}
    </li>
  );
};

export default CourseItem;
