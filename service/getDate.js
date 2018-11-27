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
export const getAllCourses = () => axios.get('/api/courses?filter=studentId eq 1');

/*
 * GET EVALUATION FOR EACH COURSE
 * param: {}
*/
export const getEverylCourses = () => axios.get('/api/evaluation/history?filter=studentId eq 1');
