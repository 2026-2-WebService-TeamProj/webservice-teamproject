import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { createServer } from 'miragejs'
import axios from 'axios'
import App from './App'
import makeServer from './server'

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(queryKey[0], { params: queryKey[1] })
  return data
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      staleTime: 300000,
    },
  },
})

if (window.Cypress && process.env.NODE_ENV === 'test') {
  const cyServer = createServer({
    routes() {
      ;['get', 'put', 'patch', 'post', 'delete'].forEach((method) => {
        this[method]('/*', (schema, request) => window.handleFromCypress(request))
      })
    },
  })
  cyServer.logging = false
} else {
  // 13주차: 백엔드 연결 전이라 배포(Vercel)에서도 Mirage mock 서버로 화면을 보여준다.
  // 14주차에 Spring Boot API를 연결하면 이 부분을 axios.defaults.baseURL 설정으로 바꾼다.
  makeServer({ environment: 'development' })
}

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} containerElement="div" />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
