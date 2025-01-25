"use client";
// src/app/mentorings/MentoringsClient.tsx
import React, { useEffect, useState } from 'react';
import { fetchMentorings } from '../services/api';
import Mentorings from '../components/mentorings';
import Mentoring from '../interfaces/interfaces';

const MentoringsClient = () => {
  const [mentorings, setMentorings] = useState<Mentoring[]>([]);
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  useEffect(() => {
    const loadMentorings = async () => {
      try {
        const data = await fetchMentorings();
        setMentorings(data);
      } catch (error) {
        console.error("Error al cargar mentorías:", error);
        setError("No se pudieron cargar las mentorías. Intenta de nuevo más tarde."); // Mensaje de error
      }
    };

    loadMentorings();
  }, []);

  return (
    <div>
      {error && <div className="error-message">{error}</div>} {/* Mostrar mensaje de error si existe */}
      <Mentorings mentorings={mentorings} />
    </div>
  );
};

export default MentoringsClient;
