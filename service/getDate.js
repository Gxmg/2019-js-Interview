import axios form 'axios';
/*
 * GET LIST OF ALL THE STUDENTS
 * param: {}
*/
export const getStudents= () => axios.get('/api/students');

/*
 * GET COURSES FOR GIVEN A STUDENT
 * param: {}
*/
export const getAllCourses = (id) => axios.get(`/api/courses?filter=studentId eq ${id}`);

/*
 * GET EVALUATION FOR EACH COURSE
 * param: {}
*/
export const getEverylCourses = (course, id) => axios.get(`/api/evaluation/${course}?filter=studentId eq ${id}`);
