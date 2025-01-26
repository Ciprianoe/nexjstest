"use client";
// src/app/mentorings/MentoringsClient.tsx
import React, { useEffect, useState } from 'react';
import { fetchMentorings } from '../services/api';
import Mentorings from '../components/mentoring/mentorings';
import Mentoring from '../interfaces/interfaces';

const MentoringsClient = () => {
  const [mentorings, setMentorings] = useState<Mentoring[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMentorings = async () => {
      try {
        const data = await fetchMentorings();
        setMentorings(data);
      } catch (error) {
        console.error("Error al cargar mentorías:", error);
        setError("No se pudieron cargar las mentorías. Intenta de nuevo más tarde.");
      }
    };

    loadMentorings();
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}
      <Mentorings mentorings={mentorings} />
    </div>
  );
};

export default MentoringsClient;
