"use client";
// components/Mentorias.tsx BY CEEM
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchMentorings, fetchMentoringDetails, fetchCourses } from '../services/api';
import DOMPurify from 'dompurify';
import MentoringsInterface from '../interfaces/interfaces';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';

const Mentorings: React.FC = () => {
  const [mentorings, setMentorings] = useState<MentoringsInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [mentoringDetails, setMentoringDetails] = useState<MentoringsInterface | null>(null);
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
  
        // Mostrar SweetAlert2 con la información de la mentoría
        Swal.fire({
          title: mentoring.name,
          html: `
          <div class="modal-content">
            <div class="section">
              <h3 style="font-weight: bold;">Información de la Mentoría</h3>
              <strong>Título:</strong> ${details.title}<br>
              <strong>Descripción:</strong> ${details.description}<br>
            </div>
            <div class="section">
              <h3 style="font-weight: bold;">Información del Mentor</h3>
              <div class="flex items-center">
                <img
                  src="https://load-qv4lgu7kga-uc.a.run.app/images/${details.mentor.avatar}"
                  alt="${details.mentor.name}"
                  class="h-20 w-20 mr-2" style="object-fit: cover;" />
                <div>
                  <strong>Mentor:</strong> <span>${details.mentor.name}</span><br>
                  <strong>Email:</strong> ${details.mentor.email}<br>
                  <strong>Biografía:</strong> ${details.mentor.biography}<br>
                  <strong>Número de Mentorías:</strong> ${details.mentor.numberOfMentoring}<br>
                  <strong>Rol:</strong> ${details.mentor.role}<br>
                </div>
              </div>
            </div>
            <div class="section">
              <h3 style="font-weight: bold;">Inversión Inicial</h3>
              <strong>Precio:</strong> $${details.price}<br>
              <strong>Precio Promocional:</strong> $${details.promotionalPrice}<br>
              <strong>Impuesto:</strong> ${details.tax}%<br>
              <strong>Actualizado el:</strong> ${formattedDate}<br>
              <strong>Disponibilidad:</strong> ${details.isActive ? 'Disponible' : 'No Disponible'}<br>
            </div>
          </div>
          `,
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Cerrar',
          cancelButtonText: 'Cursos Disponibles',
          preConfirm: async () => {
            await handleFetchCourses();
            return courses;
          },
        }).then((result) => {
          if (result.isConfirmed) {
            // Cerrar el modal
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Mostrar cursos
            const coursesHtml = courses.length > 0 
              ? courses.map(course => `<strong>${course.name}</strong><br>`).join('')
              : 'No hay cursos disponibles.';
            Swal.fire({
              title: 'Cursos Disponibles',
              html: coursesHtml,
              icon: 'success',
              confirmButtonText: 'Cerrar',
            });
          }
        });
      }
    
  }
   
};

  const handleFetchCourses = async () => {
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
  };

  const formattedDate = mentoringDetails ? new Date(mentoringDetails.updatedAt).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : '';

  if (loading) return <div>Cargando...</div>;
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
                  Más Información
                </button>
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
