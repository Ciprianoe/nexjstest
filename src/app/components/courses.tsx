"use client";
// components/Courses.tsx
import React, { useEffect, useState } from 'react';
import { fetchCourses, fetchMentorings } from '../services/api';
import Courses from '../interfaces/courses'; 
import Mentorings from '../interfaces/interfaces';
import { AxiosError } from 'axios';

const CoursesComponent: React.FC = () => {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [mentorings, setMentorings] = useState<Mentorings[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [courseDetails, setCourseDetails] = useState<Courses | null>(null);
  const [coursesLoading, setCoursesLoading] = useState<boolean>(false);
  const [mentoringsLoading, setMentoringsLoading] = useState<boolean>(false);
  const [showMentorings, setShowMentorings] = useState<boolean>(false); 

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (err) {
        setError('Error al cargar los cursos');
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  const toggleDetails = async (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
      setCourseDetails(null);
      setShowMentorings(false); 
    } else {
      const course = courses[index];
      setCourseDetails(course);
      setExpandedIndex(index);
      setShowMentorings(false); 
    }
  };

  const handleFetchMentorings = async () => {
    if (showMentorings) {
      setShowMentorings(false); // Si ya están visibles, oculta
    } else {
      setMentoringsLoading(true);
      try {
        const data = await fetchMentorings();
        setMentorings(data);
        setShowMentorings(true); // Muestra mentorías
      } catch (err) {
        const error = err as AxiosError;
        console.error('Error al cargar las mentorías:', error.response ? error.response.data : error.message);
      } finally {
        setMentoringsLoading(false);
      }
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Cursos</h1>
      <ul className="space-y-4">
        {courses.map((course, index) => (
          <li key={course.categoryKey} className="mx-auto flex max-w-sm flex-col gap-y-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
            <h2 className="text-xl font-bold text-primary">{course.name}</h2>
            <button onClick={() => toggleDetails(index)} className="mt-2 bg-blue-500 text-white rounded px-4 py-2">
              {expandedIndex === index ? 'Ver menos' : 'Más info'}
            </button>
            {expandedIndex === index && courseDetails && (
              <div className="mt-4">
                <p>{courseDetails.description}</p>
                <p><strong>Título:</strong> {courseDetails.title}</p>
                <p><strong>Precio:</strong> ${courseDetails.price}</p>
                <p><strong>Impuesto:</strong> {courseDetails.tax}%</p>
                <p><strong>Última Actualización:</strong> {new Date(courseDetails.updatedAt).toLocaleDateString()}</p>
                <div className="flex-shrink-0">
                  <img src={`https://load-qv4lgu7kga-uc.a.run.app/images/${courseDetails.image}`} alt={courseDetails.name} className="rounded-lg" />
                </div>
                <p><strong>Disponibilidad:</strong> {courseDetails.isActive ? 'Disponible' : 'No Disponible'}</p>
                
                <div className='flex justify-center mt-4'>
                  <button onClick={handleFetchMentorings} className="mt-4 bg-black text-white rounded px-4 py-2">
                   Mentorias Disponibles
                  </button>
                </div>

                {/* Mostrar Mentorías si están disponibles */}
                {mentoringsLoading ? (
                  <p>Cargando Mentorías...</p>
                ) : (
                  showMentorings && mentorings.length > 0 && (
                    <div className="mt-4">
                      <h3 className="font-semibold">Mentorias Disponibles:</h3>
                      <ul>
                        {mentorings.map(mentoring => (
                          <li key={mentoring.categoryKey} className="mt-2">{mentoring.title}</li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesComponent;