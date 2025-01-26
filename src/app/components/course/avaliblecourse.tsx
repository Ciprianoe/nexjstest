import React, { useState } from 'react';
import { fetchCourses } from '../../services/api'; // Asegúrate de importar la función correcta

const AvailableCourses: React.FC<{ mentoringId: string }> = ({  }) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAvailableCourses = async () => {
    setLoading(true);
    try {
      const fetchedCourses = await fetchCourses(); // Asegúrate de pasar el mentoringId si es necesario
      // Convertir el objeto a un array
      const coursesArray = Object.values(fetchedCourses);
      setCourses(coursesArray);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
  <button onClick={fetchAvailableCourses} className="button is-primary mt-2">
    Cursos Disponibles
  </button>
  {loading ? (
    <p className="box has-background-dark has-text-white" style={{ maxWidth: '20rem' }}>
      Cargando cursos...
    </p>
  ) : (
    courses.length > 0 && (
      <div>
        <h3 className="title is-3 has-text-primary">Cursos Disponibles:</h3>
        <ul>
          {courses.map(course => (
            <li key={course.categoryKey} className="box has-background-dark has-text-white" style={{ maxWidth: '20rem' }}>
              {course.name}
            </li>
          ))}
        </ul>
      </div>
    )
  )}
</div>

  );
};

export default AvailableCourses;
