// MentoringCard.tsx

import React from 'react';
import Swal from 'sweetalert2';
import { fetchCoursesM } from '../../services/api';

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
    console.log(mentoring);
    Swal.fire({
      title: mentoring.name,
      html: `
      <strong>Acerca de la mentoria:</strong><br><br>
        <strong>Título:</strong> ${mentoring.title}<br>
        <strong>Descripción:</strong> ${mentoring.description}<br>
        <strong>Actualizado el:</strong> ${formatDate(mentoring.updatedAt)}<br>
        <strong>Cantidad de Plazas:</strong> ${mentoring.quantity > 0 ? mentoring.quantity : "Agotadas"}<br>
        <strong>Duración:</strong> ${mentoring.characteristics[0].description}<br>
        <strong>Ranking:</strong> ${mentoring.ranking ? Math.round(mentoring.ranking) : "0"}<br><br>
        <strong>Inversión Inicial:</strong><br>
        <br><strong>Precio:</strong>${mentoring.price} $<br>
        <strong>Impuesto:</strong> ${mentoring.tax} $<br>
        ${mentoring.promotionalPrice ? `<strong>Precio de promoción:</strong> ${mentoring.promotionalPrice}  $<br>` : ''}
        <br><strong>Información del Mentor:</strong><br>
        <div style="display: flex; justify-content: center; margin-top: 10px;">
          <img src="https://load-qv4lgu7kga-uc.a.run.app/images/${mentoring.mentor.avatar}" alt="${mentoring.mentor.name}" style="width: 100px; height: 100px; border-radius: 50%;" />
        </div>
        <strong>Mentor:</strong> ${mentoring.mentor.name}<br>
        <strong>Email:</strong> ${mentoring.mentor.email}<br>
        <strong>Mentorias:</strong> ${mentoring.mentor.numberOfMentoring}<br>
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
    <li style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderRadius: '1rem', backgroundColor: 'white', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', outline: '1px solid rgba(0, 0, 0, 0.05)', maxWidth: '20rem' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={`https://load-qv4lgu7kga-uc.a.run.app/images/${mentoring.image}`}
          alt={mentoring.name}
          style={{ height: '6rem', width: '6rem', borderRadius: '0.5rem', marginRight: '1rem' }}
          width={"800"}
          height={"500"}
        />
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'blue' }}>{mentoring.name}</h2>
      </div>
      <button onClick={toggleDetails} style={{ marginTop: '0.5rem', backgroundColor: 'blue', color: 'white', borderRadius: '0.25rem', padding: '0.5rem 1rem' }}>
        Más info
      </button>   
    </li>
  );
};

export default MentoringCard;
