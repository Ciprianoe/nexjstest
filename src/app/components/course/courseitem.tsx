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
    <li className="mx-auto flex max-w-sm flex-col gap-y-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
      <div className="flex items-center">
        <img src={`https://load-qv4lgu7kga-uc.a.run.app/images/${course.image}`} alt={course.name} className="h-24 w-24 rounded-lg mr-4" />
        <h2 className="text-xl font-bold text-primary">{course.name}</h2>
      </div>

      <button onClick={() => toggleDetails(index)} className="mt-2 bg-blue-500 text-white rounded px-4 py-2">
        {expandedIndex === index ? 'Ver menos' : 'Más info'}
      </button>
      {expandedIndex === index && courseDetails ? (
        <div className="mt-4">
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
            <h2 className="text-xl font-bold text-primary">Material de Apoyo:</h2>
            {courseDetails.class.map((courseClass, index) => (
              <div key={index} className="mb-4">
                <p><strong>Clase #{index + 1}:</strong> {courseClass.name}</p>
                <p><strong>Recursos:</strong> {courseClass.resource.name}</p>
              </div>
            ))}
          </div>
          <div className='flex justify-center mt-4'>
            <button onClick={handleFetchMentorings} className="mt-4 bg-black text-white rounded px-4 py-2">
              Mentorías Disponibles
            </button>
          </div>
          {mentoringsLoading ? (
            <p>Cargando Mentorías...</p>
          ) : (
            showMentorings && mentorings.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold">Mentorías Disponibles:</h3>
                <ul>
                  {mentorings.map(mentoring => (
                    <li key={mentoring.description} className="mt-2">{mentoring.name}</li>
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
