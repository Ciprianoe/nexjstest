// MentoringCard.tsx

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import {fetchCoursesM}from '../../services/api'

const MentoringCard: React.FC<{ mentoring: any }> = ({ mentoring }) => {
 
 
 
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Fecha no válida"; 
    }
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const toggleDetails = () => {
    Swal.fire({
      title: mentoring.name,
      html: `
        <strong>Título:</strong> ${mentoring.title}<br>
        <strong>Descripción:</strong> ${mentoring.description}<br>
        <strong>Actualizado en:</strong> ${formatDate(mentoring.updatedAt)}<br>
        <strong>Cantidad de Plazas:</strong> ${mentoring.quantity > 0 ? mentoring.quantity : "No disponible"}<br>
        <strong>Ranking:</strong> ${mentoring.ranking ? Math.round(mentoring.ranking) : "0"}<br>
        <strong>Precio:</strong> $${mentoring.price}<br>
        <strong>Información del Mentor:</strong><br>
        <div style="display: flex; justify-content: center; margin-top: 10px;">
          <img src="https://load-qv4lgu7kga-uc.a.run.app/images/${mentoring.mentor.avatar}" alt="${mentoring.mentor.name}" style="width: 100px; height: 100px; border-radius: 50%;" />
        </div>
        <strong>Mentor:</strong> ${mentoring.mentor.name}<br>
        <strong>Email:</strong> ${mentoring.mentor.email}<br>
        <strong>Acerca del mentor:</strong> ${mentoring.mentor.biography}
      `,
      icon: 'info',
      confirmButtonText: 'Cerrar',
      denyButtonText: 'Cursos Disponibles',
      showDenyButton: true,
    }).then((result) => {
      if (result.isDenied) {
        
        showCourses();
      }
    });
  };

  const showCourses = async () => {
    try {
      if (!mentoring.categoryKey) {
        throw new Error('La categoría no está definida');
      }
      const courses = await fetchCoursesM(mentoring.categoryKey);
      //console.log(courses); 
      if (!Array.isArray(courses)) {
        throw new Error('La respuesta no es un array');
      }
      const coursesList = courses.map((course: any) => `<li>${course.name}</li>`).join('');
      Swal.fire({
        title: 'El Curso Disponible es:',
        html: `<ul>${coursesList}</ul>`,
        icon: 'success',
        confirmButtonText: 'Cerrar',
      });
    } catch (error) {
      const errorMessage = (error as Error).message || 'No se pudieron cargar los cursos.';
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
    }
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
        Más info
      </button>   
    </li>
  );
};

export default MentoringCard;
