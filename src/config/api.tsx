const isDev = () => process.env.NODE_ENV === 'development'

export const host = isDev() ? 'http://localhost:5000' : ''
