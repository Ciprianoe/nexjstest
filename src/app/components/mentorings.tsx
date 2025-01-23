"use client";
// components/Mentorias.tsx
import React, { useEffect, useState } from 'react';
import { fetchMentorings, fetchMentoringDetails } from '../services/api'; 
import DOMPurify from 'dompurify';
import Mentorings from '../interfaces/interfaces';

const Mentorings: React.FC = () => {
  const [mentorings, setMentorings] = useState<Mentorings[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [mentoringDetails, setMentoringDetails] = useState<Mentorings | null>(null);

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
    } else {
      const mentoring = mentorings[index];
      const details = await fetchMentoringDetails(mentoring.key);
      if (details) {
        setMentoringDetails(details);
        setExpandedIndex(index);
      }
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Mentorías</h1>
      <ul className="space-y-4">
        {mentorings.map((mentoring, index) => (
          <li key={mentoring.categoryKey} className="mx-auto flex max-w-sm flex-col gap-y-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
            <h2 className="text-xl font-bold text-primary">{mentoring.name}</h2>
            <button onClick={() => toggleDetails(index)} className="mt-2 bg-blue-500 text-white rounded px-4 py-2">
              {expandedIndex === index ? 'Ver menos' : 'Más info'}
            </button>
            {expandedIndex === index && mentoringDetails && (
              <div className="mt-4">
                <p>{mentoringDetails.description}</p>
                <p><strong>Título:</strong> {mentoringDetails.title}</p>
                <p><strong>Precio:</strong> ${mentoringDetails.price}</p>
                {mentoringDetails.promotionalPrice && (
                  <p><strong>Precio Promocional:</strong> ${mentoringDetails.promotionalPrice}</p>
                )}
                <p><strong>Impuesto:</strong> {mentoringDetails.tax}%</p>
                <p><strong>Actualizado el:</strong> {new Date(mentoringDetails.updatedAt).toLocaleDateString()}</p>
                <div className="flex-shrink-0">
                  <img src={`https://load-qv4lgu7kga-uc.a.run.app/images/${mentoringDetails.image}`} alt={mentoringDetails.name} className="rounded-lg" />
                </div>
                <p><strong>Estado:</strong> {mentoringDetails.isActive ? 'Activo' : 'Inactivo'}</p>
                <div>
                  <h3 className="font-semibold">Mentor: {mentoringDetails.mentor.name}</h3>
                  <img src={`https://load-qv4lgu7kga-uc.a.run.app/images/${mentoringDetails.mentor.avatar}`} alt={mentoringDetails.mentor.name} className="rounded-full h-16 w-16" />
                  <p><strong>Email:</strong> {mentoringDetails.mentor.email}</p>
                  <p><strong>Biografía:</strong> {mentoringDetails.mentor.biography}</p>
                  <p><strong>Número de Mentorías:</strong> {mentoringDetails.mentor.numberOfMentoring}</p>
                  <p><strong>Rol:</strong> {mentoringDetails.mentor.role}</p>
                </div>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(mentoringDetails.detail) }} />
                <div className="flex justify-center mt-4">
                  <button className="bg-black text-white rounded px-4 py-2">Cursos disponibles</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Mentorings;