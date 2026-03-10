import axios from 'axios'

const BASE = import.meta.env.VITE_API_BASE || '/api'

const http = axios.create({ baseURL: BASE, timeout: 10000 })

export const getLeetCodeStats  = () => http.get('/leetcode/latest').then(r => r.data)
export const getGitHubStats    = () => http.get('/github/latest').then(r => r.data)
export const getGitHubRepos    = () => http.get('/github/repos').then(r => r.data)
export const getProfileImageUrl = () => `${BASE}/profile/image`
export const getResumeUrl      = () => `${BASE}/resume/download`
export const submitContact     = (d) => http.post('/contact', d).then(r => r.data)

export default http
