"use client";
// components/Courses.tsx
import React, { useEffect, useState } from 'react';
import { fetchCourses } from '../services/api'; // Asegúrate de ajustar la ruta
import DOMPurify from 'dompurify';
import Courses from '../interfaces/courses'; // Asegúrate de que la ruta sea correcta

const CoursesComponent: React.FC = () => {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (err) {
        setError('Error loading courses');
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center">
    <h1 className="text-2xl font-bold mb-4">Courses</h1>
    <ul className="space-y-4">
      {courses.length > 0 ? (
        courses.map((course) => (
          <li key={course.categoryKey} className="mx-auto flex max-w-sm flex-col gap-y-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
            <h2 className="text-xl font-bold text-primary">{course.name}</h2>
            <p>{course.description}</p>
            <p><strong>Titulo:</strong> {course.title}</p>
            <p><strong>Precio:</strong> ${course.price}</p>
            <p><strong>Impuesto:</strong> {course.tax}%</p>
            <p><strong>Ultima Actualización:</strong> {new Date(course.updatedAt).toLocaleDateString()}</p>
            <div className="flex-shrink-0">
              <img src={`https://load-qv4lgu7kga-uc.a.run.app/images/${course.image}`} alt={course.name} className="rounded-lg" />
            </div>
            <p><strong>Status:</strong> {course.isActive ? 'Disponible' : 'No Disponible'}</p>
            {/* Mostrar características */}
            {course.characteristics && course.characteristics.length > 0 && (
              <div>
                <h3 className="font-semibold">Informacion:</h3>
                <ul>
                  {course.characteristics.map((char, index) => (
                    <li key={index}>
                      <strong>{char.name}:</strong> {char.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))
      ) : (
        <div>No hay cursos disponibles</div>
      )}
    </ul>
  </div>
  );
};

export default CoursesComponent;