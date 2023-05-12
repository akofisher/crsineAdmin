import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import { default as AboutDetails } from './Loyout/AboutDetails/AboutDetails'
import BookingTimes from './Loyout/BookingTimes/BookingTimes'
import Booking from './Loyout/Bookings/Booking'
import ContactDetails from './Loyout/ContactDetails/ContactDetails'
import ExtraServices from './Loyout/ExtraServices/ExtraServices'
import Login from './Loyout/Login/Login'
import NewsDetails from './Loyout/NewsDetails/NewsDetails'
import Packages from './Loyout/Packages/Packages'
import PassRecovery from './Loyout/Recovery/PassRecovery'
import ServicesDetails from './Loyout/ServicesDetails/ServicesDetails'
import PrivateRoute from './PrivateRoute'
import './reset.css'
import {
  ABOUT_DETAILS,
  BOOKINGS,
  BOOKING_TIMES,
  CONTACT_DETAILS,
  LOGIN,
  NEWS_DETAILS,
  PACKAGES,
  PASS_RECOVERY,
  SERVICES,
  SERVICES_DETAILS,
} from './routes'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path={LOGIN} element={<Login />} />
          <Route exact path={PASS_RECOVERY} element={<PassRecovery />} />
          <Route
            exact
            path={BOOKINGS}
            element={
              // <Suspense fallback={<Loader />}>
              <PrivateRoute redirectTo={LOGIN}>
                <Booking />
              </PrivateRoute>
              // </Suspense>
            }
          />
          <Route
            exact
            path={BOOKING_TIMES}
            element={
              // <Suspense fallback={<Loader />}>
              <PrivateRoute redirectTo={LOGIN}>
                <BookingTimes />
              </PrivateRoute>
              // </Suspense>
            }
          />

          <Route
            exact
            path={CONTACT_DETAILS}
            element={
              // <Suspense fallback={<Loader />}>
              <PrivateRoute redirectTo={LOGIN}>
                <ContactDetails />
              </PrivateRoute>
              // </Suspense>
            }
          />
          <Route
            exact
            path={ABOUT_DETAILS}
            element={
              // <Suspense fallback={<Loader />}>
              <PrivateRoute redirectTo={LOGIN}>
                <AboutDetails />
              </PrivateRoute>
              // </Suspense>
            }
          />
          <Route
            exact
            path={NEWS_DETAILS}
            element={
              // <Suspense fallback={<Loader />}>
              <PrivateRoute redirectTo={LOGIN}>
                <NewsDetails />
              </PrivateRoute>
              // </Suspense>
            }
          />
          <Route
            exact
            path={SERVICES_DETAILS}
            element={
              // <Suspense fallback={<Loader />}>
              <PrivateRoute redirectTo={LOGIN}>
                <ServicesDetails />
              </PrivateRoute>
              // </Suspense>
            }
          />
          <Route
            exact
            path={PACKAGES}
            element={
              // <Suspense fallback={<Loader />}>
              <PrivateRoute redirectTo={LOGIN}>
                <Packages />
              </PrivateRoute>
              // </Suspense>
            }
          />
          <Route
            exact
            path={SERVICES}
            element={
              // <Suspense fallback={<Loader />}>
              <PrivateRoute redirectTo={LOGIN}>
                <ExtraServices />
              </PrivateRoute>
              // </Suspense>
            }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
