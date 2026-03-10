import axios from "axios"

const BASE =
  import.meta.env.VITE_API_BASE ||
  "https://adarsh-portfolio-tzl4.onrender.com"

const http = axios.create({
  baseURL: BASE,
  timeout: 10000
})

export const getLeetCodeStats = () =>
  http.get("/api/leetcode/latest").then(r => r.data)

export const getGitHubStats = () =>
  http.get("/api/github/latest").then(r => r.data)

export const getGitHubRepos = () =>
  http.get("/api/github/repos").then(r => r.data)

export const getProfileImageUrl = () =>
  `${BASE}/api/profile/image`

export const getResumeUrl = () =>
  `${BASE}/api/resume/download`

export const submitContact = (d) =>
  http.post("/api/contact", d).then(r => r.data)

export default http