// MentoringDetails.tsx
import React from 'react';
import AvailableCourses from './avaliblecourse';


const MentoringDetails: React.FC<{ mentoring: any }> = ({ mentoring }) => {
  console.log(mentoring)
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-bold text-primary mb-4">Acerca de esta Mentoría:</h2>
    <p className="mb-2"><strong>Título:</strong> {mentoring.title}</p>
    <p className="mb-4"><strong>Descripción:</strong> {mentoring.description}</p>    
    <p className="mb-4" dangerouslySetInnerHTML={{ __html: `<strong>Mas Info:</strong> ${mentoring.detail}` }} />
    
    <h2 className="text-xl font-bold text-primary mb-2">Inversión Inicial:</h2>
    <p className="mb-2"><strong>Precio:</strong> ${mentoring.price}</p>
    <p className="mb-4"><strong>Impuesto:</strong> {mentoring.tax}%</p>
    
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
