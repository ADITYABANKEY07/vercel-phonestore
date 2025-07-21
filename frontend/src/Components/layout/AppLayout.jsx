import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from '../ScrollToTop'

function AppLayout() {
  return (
    <>
        <ScrollToTop />
        <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}

export default AppLayout