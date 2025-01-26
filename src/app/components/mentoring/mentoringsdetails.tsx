import React from 'react';
import AvailableCourses from '../../components/course/avaliblecourse';

const MentoringDetails: React.FC<{ mentoring: any }> = ({ mentoring }) => {

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

  return (
    <div>
      <h2>Acerca de esta Mentoría:</h2>
      <p><strong>Título:</strong> {mentoring.title}</p>
      <p><strong>Descripción:</strong> {mentoring.description}</p>
      <p><strong>Actualizado en:</strong> {formatDate(mentoring.updatedAt)}</p>
      <p>
        <strong>Próxima:</strong>
        {mentoring.characteristics.length > 2 && mentoring.characteristics[2].isActive
          ? `${mentoring.characteristics[2].description} 2025`
          : "No disponible"}
      </p>
      <p>
        <strong>Cantidad de Plazas:</strong>
        {mentoring.quantity > 0
          ? mentoring.quantity
          : "No disponible"}
      </p>
      <p>
        <strong>Ranking:</strong>
        {mentoring.ranking
          ? Math.round(mentoring.ranking)
          : "0"}
      </p>

      <p dangerouslySetInnerHTML={{ __html: `<strong>Mas Info:</strong> ${mentoring.detail}` }} />
      <h2>Inversión Inicial:</h2>
      <p><strong>Precio:</strong> ${mentoring.price}</p>
      {mentoring.promotionalPrice ? (
        <p>
          <strong>Promoción o Descuento:</strong> {mentoring.promotionalPrice}$
        </p>
      ) : null}
      <p><strong>Impuesto:</strong> {mentoring.tax}%</p>
      <p><strong>Duración</strong> {mentoring.characteristics[0].description}</p>

      <h2>Información del Mentor:</h2>
      <img
        src={`https://load-qv4lgu7kga-uc.a.run.app/images/${mentoring.mentor.avatar}`}
        alt={mentoring.mentor.name}
      />
      <p><strong>Mentor:</strong> {mentoring.mentor.name}</p>
      <p><strong>Email:</strong> {mentoring.mentor.email}</p>
      <p><strong>Mentorías dictadas:</strong> {mentoring.mentor.numberOfMentoring}</p>
      <p><strong>Acerca del mentor:</strong> {mentoring.mentor.biography}</p>

      <AvailableCourses mentoringId={mentoring.categoryKey} />
    </div>
  );
};

export default MentoringDetails;
