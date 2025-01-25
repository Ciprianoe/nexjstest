import React from 'react';
import AvailableCourses from './avaliblecourse';

const MentoringDetails: React.FC<{ mentoring: any }> = ({ mentoring }) => {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Fecha no válida"; // Manejo de fecha inválida
    }
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-primary mb-4">Acerca de esta Mentoría:</h2>
      <p className="mb-2"><strong>Título:</strong> {mentoring.title}</p>
      <p className="mb-4"><strong>Descripción:</strong> {mentoring.description}</p>
      <p className="mb-4"><strong>Actualizado en:</strong> {formatDate(mentoring.updatedAt)}</p>
      <p className="mb-4">
        <strong>Próxima:</strong>
        {mentoring.characteristics.length > 2 && mentoring.characteristics[2].isActive
          ? `${mentoring.characteristics[2].description} 2025`
          : "No disponible"}
      </p>
      <p className="mb-4">
        <strong>Cantidad de Plazas:</strong>
        {mentoring.quantity > 0
          ? mentoring.quantity
          : "No disponible"}
      </p>
      <p className="mb-4">
        <strong>Ranking:</strong>
        {mentoring.ranking
          ? Math.round(mentoring.ranking)
          : "0"}
      </p>

      <p className="mb-4" dangerouslySetInnerHTML={{ __html: `<strong>Mas Info:</strong> ${mentoring.detail}` }} />
      <h2 className="text-xl font-bold text-primary mb-2">Inversión Inicial:</h2>
      <p className="mb-2"><strong>Precio:</strong> ${mentoring.price}</p>
      {mentoring.promotionalPrice ? (
        <p className="mb-4">
          <strong>Promoción o Descuento:</strong> {mentoring.promotionalPrice}$
        </p>
      ) : null}
      <p className="mb-4"><strong>Impuesto:</strong> {mentoring.tax}%</p>
      <p className="mb-4"><strong>Duración</strong> {mentoring.characteristics[0].description}</p>

      <h2 className="text-xl font-bold text-primary mb-2">Información del Mentor:</h2>
      <img
        src={`https://load-qv4lgu7kga-uc.a.run.app/images/${mentoring.mentor.avatar}`}
        alt={mentoring.mentor.name}
        className="mt-2 w-32 h-32 rounded-full"
        width={"680"}
        height={"500"}
      />
      <p className="mb-2"><strong>Mentor:</strong> {mentoring.mentor.name}</p>
      <p className="mb-2"><strong>Email:</strong> {mentoring.mentor.email}</p>
      <p className="mb-2"><strong>Mentorías dictadas:</strong> {mentoring.mentor.numberOfMentoring}</p>
      <p className="mb-2"><strong>Acerca del mentor:</strong> {mentoring.mentor.biography}</p>

      <AvailableCourses mentoringId={mentoring.categoryKey} />
    </div>
  );
};

export default MentoringDetails;
