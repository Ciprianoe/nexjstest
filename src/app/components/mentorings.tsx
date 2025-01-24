"use client";
// components/Mentorias.tsx BY CEEM
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchMentorings, fetchMentoringDetails, fetchCourses } from '../services/api';
import DOMPurify from 'dompurify';
import MentoringsInterface  from '../interfaces/interfaces';
import { AxiosError } from 'axios';

const Mentorings: React.FC = () => {
  const [mentorings, setMentorings] = useState<MentoringsInterface []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [mentoringDetails, setMentoringDetails] = useState<MentoringsInterface  | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [coursesLoading, setCoursesLoading] = useState<boolean>(false);

  useEffect(() => {
    const getMentorings = async () => {
      try {
        const data = await fetchMentorings();
        setMentorings(data);
      } catch (err) {
        setError('Error al cargar las mentorías');
      } finally {
        setLoading(false);
      }
    };

    getMentorings();
  }, []);

  const toggleDetails = async (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
      setMentoringDetails(null);
      setCourses([]);
    } else {
      const mentoring = mentorings[index];
      const details = await fetchMentoringDetails(mentoring.key);
      if (details) {
        setMentoringDetails(details);
        setExpandedIndex(index);
      }
    }
  };

  const handleFetchCourses = async () => {
    if (courses.length > 0) {
      setCourses([]);
    } else {
      setCoursesLoading(true);
      try {
        const response = await fetchCourses();
        setCourses(response);
      } catch (err) {
        const error = err as AxiosError;
        console.error('Error al cargar los cursos:', error.response ? error.response.data : error.message);
      } finally {
        setCoursesLoading(false);
      }
    }
  };

  const formattedDate = mentoringDetails ? new Date(mentoringDetails.updatedAt).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : '';

  if (loading) return <div> </div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center">
    <h1 className="text-2xl font-bold mb-4">Mentorías</h1>
    <ul className="flex flex-wrap justify-center space-x-4 space-y-4">
      {mentorings.length > 0 ? (
        mentorings.map((mentoring, index) => (
          mentoring.name && mentoring.image ? (
            <li key={mentoring.categoryKey} className="flex flex-col gap-y-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 max-w-sm">
              <div className="flex items-center">
                <Image
                  src={`https://load-qv4lgu7kga-uc.a.run.app/images/${mentoring.image}`}
                  alt={mentoring.name}
                  className="h-24 w-24 rounded-lg mr-4"
                  width={640} height={480}
                />
                <h2 className="text-xl font-bold text-primary">{mentoring.name}</h2>
              </div>
              <button onClick={() => toggleDetails(index)} className="mt-2 bg-blue-500 text-white rounded px-4 py-2">
                {expandedIndex === index ? 'Ver menos' : 'Más info'}
              </button>
              
              {expandedIndex === index && mentoringDetails && (
                <div>
                  <h2 className="text-xl font-bold text-primary">Acerca de esta Mentoría:</h2>
                  <div className="mt-4">
                    <p><strong>Título:</strong> {mentoringDetails.title}</p>
                    <p><strong>Descripción:</strong> {mentoringDetails.description}</p>
                    <p><strong>Precio:</strong> ${mentoringDetails.price}</p>
                    <p><strong>Precio Promocional:</strong> ${mentoringDetails.promotionalPrice}</p>
                    <p><strong>Impuesto:</strong> {mentoringDetails.tax}%</p>                    
                    <p><strong>Actualizado el:</strong> {formattedDate}</p>
                    <p><strong>Disponibilidad:</strong> {mentoringDetails.isActive ? 'Disponible' : 'No Disponible'}</p>
                    
                    <h2 className="text-xl font-bold text-primary">Información del Mentor:</h2>
                    <div className="flex items-center">
                      <Image
                        src={`https://load-qv4lgu7kga-uc.a.run.app/images/${mentoringDetails.mentor.avatar}`}
                        alt={mentoringDetails.mentor.name}
                        className="rounded-full h-16 w-16 mr-4"
                        width={640} height={480} />
                      <h3 className="font-semibold">Mentor: {mentoringDetails.mentor.name}</h3>
                    </div>
                    <p><strong>Email:</strong> {mentoringDetails.mentor.email}</p>
                    <p><strong>Biografía:</strong> {mentoringDetails.mentor.biography}</p>
                    <p><strong>Número de Mentorías:</strong> {mentoringDetails.mentor.numberOfMentoring}</p>
                    <p><strong>Rol:</strong> {mentoringDetails.mentor.role}</p>

                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(mentoringDetails.detail) }} />

                    {mentoringDetails.isActive && (
                      <div className='flex justify-center mt-4'>
                        <button onClick={handleFetchCourses} className="mt-4 bg-black text-white rounded px-4 py-2">
                          Cursos Disponibles
                        </button>
                      </div>
                    )}

                    {coursesLoading ? (
                      <p>Cargando cursos...</p>
                    ) : (
                      courses.length > 0 && (
                        <div className="mt-4">
                          <h3 className="font-semibold">Cursos Disponibles:</h3>
                          <ul>
                            {courses.map(course => (
                              <li key={course.categoryKey} className="mt-2">{course.name}</li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </li>
          ) : null
        ))
      ) : (
        <div>No hay mentorías disponibles.</div>
      )}
    </ul>
  </div>
);
};
 

export default Mentorings;
