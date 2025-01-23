import  axios  from "axios";
import mentorings from '../interfaces/interfaces'


const API_URL = 'https://load-qv4lgu7kga-uc.a.run.app/';

  export const fetchMentorings = async (): Promise<mentorings[]> => {
    const response = await axios.get<{ data: { mentorings: mentorings[] } }>(`${API_URL}/mentorings/all`);
    return response.data.data.mentorings;
  };

