import { BrowserRouter, Route, Routes } from 'react-router'
import Dashboard from './pages/Dashboard'
import AuthRoutes from './pages/Auth/AuthRoutes'
import { AuthLinks } from './pages/Auth/utils/Routes'
import Login from './pages/Auth/Login'
import { useAppSelector } from './redux/hooks'
import { AppLinks } from './utils/Routes'
import Settings from './pages/Settings'

function App() {
  // const user = useAppSelector((state) => state.user.user);
  const isLoggedIn = useAppSelector((state) => !!state.user.user);

  console.log('first= ', isLoggedIn);

  return (
   <BrowserRouter>
    <Routes>
      <Route index element={isLoggedIn ? <Dashboard /> : <Login />} />

      {isLoggedIn ? (
        <>
          <Route index element={<Dashboard />} />
          <Route path={AppLinks.settings} element={<Settings />} />
        </>
      ) : (
        <Route path={AuthLinks.auth} element={<AuthRoutes />} />
      )}
    </Routes>
   </BrowserRouter>
  )
}

export default App