"use client";
import React, { useEffect, useState } from 'react';
import { fetchCourses, fetchMentorings, fetchCoursesD } from '../services/api';
import Courses from '../interfaces/courses';
import Mentorings from '../interfaces/interfaces';
import { AxiosError } from 'axios';
import CourseItem from './courseitem';

const CoursesComponent: React.FC = () => {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [mentorings, setMentorings] = useState<Mentorings[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [courseDetails, setCourseDetails] = useState<Courses | null>(null);
  const [mentoringsLoading, setMentoringsLoading] = useState<boolean>(false);
  const [showMentorings, setShowMentorings] = useState<boolean>(false);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (err) {
        setError('Error al cargar los cursos');
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  const toggleDetails = async (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
      setCourseDetails(null);
      setShowMentorings(false);
    } else {
      const course = courses[index];
      const details = await fetchCoursesD(course.key);
      if (details) {
        setCourseDetails(details);
        setExpandedIndex(index);
        setShowMentorings(false);
        localStorage.setItem('selectedCourse', JSON.stringify(details));
      }
    }
  };

  const handleFetchMentorings = async () => {
    setShowMentorings((prevState) => !prevState);
    if (!showMentorings) {
      setMentoringsLoading(true);
      try {
        const data = await fetchMentorings();
        setMentorings(data);
      } catch (err) {
        const error = err as AxiosError;
        console.error('Error al cargar las mentorías:', error.response ? error.response.data : error.message);
      } finally {
        setMentoringsLoading(false);
      }
    } else {
      setMentorings([]);
    }
  };

  if (loading) return <div>Cargando cursos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Cursos</h1>
      {courses.length === 0 ? (
        <div>No hay cursos disponibles.</div>
      ) : (
        <ul className="space-y-4">
          {courses.map((course, index) => (
            <CourseItem 
              key={course.categoryKey} 
              course={course} 
              index={index} 
              toggleDetails={toggleDetails} 
              expandedIndex={expandedIndex} 
              courseDetails={courseDetails} 
              handleFetchMentorings={handleFetchMentorings} 
              mentorings={mentorings} 
              mentoringsLoading={mentoringsLoading} 
              showMentorings={showMentorings} 
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoursesComponent;
