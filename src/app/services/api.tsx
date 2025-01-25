import  axios  from "axios";
import mentorings from '../interfaces/interfaces'
import courses from '../interfaces/courses'


const API_URL = 'https://load-qv4lgu7kga-uc.a.run.app/';

  export const fetchMentorings = async (): Promise<mentorings[]> => {
    try{
    const response = await axios.get<{ data: { mentorings: mentorings[] } }>(`${API_URL}/mentorings/all`);
    console.log("Response from API:", response.data);
    return response.data.data.mentorings;
  } catch (error) {
    console.error("Error fetching mentorings:", error);
    return []; // Devuelve un array vacío en caso de error
    }
  };

  export const fetchCourses = async (): Promise<courses[]> => {
    const response = await axios.get<{ data: { items: courses[] } }>(`${API_URL}/courses/all`);
    return response.data.data.items; 
};


export const fetchCoursesM = async (categoryKey:string) => {
  const response = await fetch(`${API_URL}/courses/all`);
  if (!response.ok) {
    throw new Error('Error al cargar los cursos');
  }
  const data = await response.json(); // Convierte la respuesta a JSON
  return data.data.items; // Devuelve el array de cursos
};

export const fetchCoursesD = async (pkey: string): Promise<courses> => {
  const response = await axios.get(`${API_URL}/Courses/show?pKey=${pkey}`);
  console.log("Data received from fetchCoursesD:", response);
  return response.data.data.item; // Asegúrate de que esto sea correcto según la respuesta de tu API
};


export const fetchMentoringDetails = async (pKey: string) => {
  try {
    const response = await axios.get<{ data: { mentoring: mentorings } }>(`${API_URL}/mentorings/show`, {
      params: { pKey }
    });
    return response.data.data.mentoring;
  } catch (err) {
    // Manejo de errores
    return null;
  }
};