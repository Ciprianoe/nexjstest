"use client";
// components/Courses.tsx BY CEEM
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchCourses, fetchMentorings, fetchCoursesD } from '../services/api';
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
      setExpandedIndex(null); // Oculta detalles
      setCourseDetails(null); // Resetea los detalles
      setShowMentorings(false);
    } else {
      const course = courses[index];
      const details = await fetchCoursesD(course.key); // Asegúrate de que Key esté disponible
      if (details) {
        setCourseDetails(details); // Actualiza los detalles de la mentoría
        setExpandedIndex(index); // Muestra detalles
        setShowMentorings(false);
        localStorage.setItem('selectedCourse', JSON.stringify(details));
      }
    }
  };

  const handleFetchMentorings = async () => {
    setShowMentorings((prevState) => !prevState);
    if (!showMentorings) {
      setMentoringsLoading(true);
      try {
        const data = await fetchMentorings();
        setMentorings(data);
      } catch (err) {
        const error = err as AxiosError;
        console.error('Error al cargar las mentorías:', error.response ? error.response.data : error.message);
      } finally {
        setMentoringsLoading(false);
      }
    } else {
      setMentorings([]);
    }
  };

  if (loading) return <div></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Cursos</h1>
      {courses.length === 0 ? (
        <div>No hay cursos disponibles.</div>
      ) : (
        <ul className="space-y-4">
          {courses.map((course, index) => (
            <li key={course.categoryKey} className="mx-auto flex max-w-sm flex-col gap-y-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
              <div className="flex items-center">
                <Image src={`https://load-qv4lgu7kga-uc.a.run.app/images/${course.image}`} alt={course.name} className="h-24 w-24 rounded-lg mr-4" />
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
                  <p><strong>Cantidad:</strong> {courseDetails.quantity}</p>
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
                    mentorings.length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-semibold">Mentorías Disponibles:</h3>
                        <ul>
                          {mentorings.map(mentoring => (
                            <li key={mentoring.categoryKey} className="mt-2">{mentoring.title}</li>
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
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoursesComponent;
