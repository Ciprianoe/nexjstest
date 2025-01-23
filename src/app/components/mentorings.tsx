"use client";
// components/Mentorias.tsx
import React, { useEffect, useState } from 'react';
import {fetchMentorings}  from '../services/api'; // Asegúrate de ajustar la ruta
import DOMPurify from 'dompurify';
import  Mentorings  from '../interfaces/interfaces';

const Mentorings: React.FC = () => {
  const [mentorings, setMentorings] = useState<Mentorings[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Mentorías</h1>
      <ul className="space-y-4">
        {mentorings.map((mentoring) => (
          <li key={mentoring.categoryKey} className="mx-auto flex max-w-sm flex-col gap-y-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
            <h2 className="text-xl font-bold text-primary">{mentoring.name}</h2>
            <p>{mentoring.description}</p>
            <p><strong>Título:</strong> {mentoring.title}</p>
            <p><strong>Precio:</strong> ${mentoring.price}</p>
            <p><strong>Precio Promocional:</strong> ${mentoring.promotionalPrice}</p>
            <p><strong>Impuesto:</strong> {mentoring.tax}%</p>
            <p><strong>Actualizado el:</strong> {new Date(mentoring.updatedAt).toLocaleDateString()}</p>
            <div className="flex-shrink-0">
              <img src={`https://load-qv4lgu7kga-uc.a.run.app/images/${mentoring.image}`} alt={mentoring.name} className="rounded-lg" />
            </div>
            <p><strong>Estado:</strong> {mentoring.isActive ? 'Activo' : 'Inactivo'}</p>
            
            {/* Información del mentor */}
            <div>
              <h3 className="font-semibold">Mentor: {mentoring.mentor.name}</h3>
              <img src={`https://load-qv4lgu7kga-uc.a.run.app/images/${mentoring.mentor.avatar}`} alt={mentoring.mentor.name} className="rounded-full h-16 w-16" />
              <p><strong>Email:</strong> {mentoring.mentor.email}</p>
              <p><strong>Biografía:</strong> {mentoring.mentor.biography}</p>
              <p><strong>Número de Mentorías:</strong> {mentoring.mentor.numberOfMentoring}</p>
              <p><strong>Rol:</strong> {mentoring.mentor.role}</p>
            </div>
    
            {/* Sanitiza el contenido HTML aquí */}
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(mentoring.detail) }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Mentorings;