import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const listQuizzes = async (courseId: string) =>
    (await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`)).data;
export const createQuiz = async (courseId: string, payload: any = {}) =>
    (await axiosWithCredentials.post(`${COURSES_API}/${courseId}/quizzes`, payload)).data;
export const getQuiz = async (quizId: string) =>
    (await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`)).data;
export const updateQuiz = async (quizId: string, payload: any) =>
    (await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}`, payload)).data;
export const deleteQuiz = async (quizId: string) =>
    (await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`)).data;
export const setPublished = async (quizId: string, published: boolean) =>
    (await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/publish`, { published })).data;

export const listQuestions = async (quizId: string) =>
    (await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/questions`)).data;
export const createQuestion = async (quizId: string, payload: any = {}) =>
    (await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/questions`, payload)).data;
export const updateQuestion = async (questionId: string, payload: any) =>
    (await axiosWithCredentials.put(
        `${QUIZZES_API}/questions/${questionId.replace(/^[^/]+\//, "")}`,
        payload
    )).data;
export const updateQuestionDirect = async (questionId: string, payload: any) =>
    (await axiosWithCredentials.put(`${REMOTE_SERVER}/api/questions/${questionId}`, payload)).data;
export const deleteQuestion = async (questionId: string) =>
    (await axiosWithCredentials.delete(`${REMOTE_SERVER}/api/questions/${questionId}`)).data;

export const submitAttempt = async (quizId: string, answers: any[]) =>
    (await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/attempts`, { answers })).data;
export const getLastAttempt = async (quizId: string) =>
    (await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts/last`)).data;
export const getMyAttempts = async (quizId: string) =>
    (await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts/mine`)).data;

export const canStartQuiz = async (quizId: string) =>
    (await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/can-start`)).data;
export const getAttemptsCount = async (quizId: string) =>
    (await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts/count`)).data;