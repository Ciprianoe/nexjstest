"use client";
import React, { useEffect, useState } from 'react';
import Mentoring from '../interfaces/interfaces'; 
import { fetchMentoringDetails, fetchCoursesD } from '../services/api';

interface MentoringDetailsProps {
  mentoring: Mentoring; 
}

interface Course {
  id: string;
  title: string;
}

const MentoringDetails: React.FC<MentoringDetailsProps> = ({ mentoring }) => {
  const [details, setDetails] = useState<any>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShowDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedDetails = await fetchMentoringDetails(mentoring.key);
      setDetails(fetchedDetails);
    } catch (err) {
      setError('Error al cargar los detalles: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedCourses = await fetchCoursesD(mentoring.key);
      setCourses(fetchedCourses);
    } catch (err) {
      setError('Error al cargar los cursos: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleShowDetails}>Ver Detalles</button>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {details && (
        <div>
          <h2>{mentoring.name}</h2>
          <p>Descripción: {details.description}</p>
          <p>Duración: {details.duration}</p>
          <p>Nivel: {details.level}</p>
          <button onClick={handleFetchCourses}>Ver Cursos Disponibles</button>
        </div>
      )}
      {courses.length > 0 && (
        <div>
          <h3>Cursos Disponibles:</h3>
          <ul>
            {courses.map(course => (
              <li key={course.id}>{course.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MentoringDetails;
