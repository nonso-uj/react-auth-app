import { Route, Routes } from 'react-router'
import Register from './Register'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import Reset from './Reset'
import SetNew from './SetNew'
import AllDone from './AllDone'
import { AuthLinks } from './utils/Routes'

const AuthRoutes = () => {
  return (
    <Routes>
        <Route index element={<Login />} />

        <Route path={AuthLinks.signUp} element={<Register />} />

        <Route path={AuthLinks.forgotPassword} element={<ForgotPassword />} />

        <Route path={AuthLinks.resetPassword} element={<Reset />} />

        <Route path={AuthLinks.setNewPassword} element={<SetNew />} />

        <Route path={AuthLinks.allDone} element={<AllDone />} />
    </Routes>
  )
}

export default AuthRoutes