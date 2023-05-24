import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import { default as AboutDetails } from './Loyout/AboutDetails/AboutDetails'
import ActiveBookings from './Loyout/ActiveBookings/ActiveBookings'
import BookingTimes from './Loyout/BookingTimes/BookingTimes'
import CanceledBookings from './Loyout/CanceledBookings/CanceledBookings'
import ContactDetails from './Loyout/ContactDetails/ContactDetails'
import DoneBookings from './Loyout/DoneBookings/DoneBookings'
import ExtraServices from './Loyout/ExtraServices/ExtraServices'
import Login from './Loyout/Login/Login'
import NewsDetails from './Loyout/NewsDetails/NewsDetails'
import Packages from './Loyout/Packages/Packages'
import ProcessBookings from './Loyout/ProcessBookings/ProcessBookings'
import PassRecovery from './Loyout/Recovery/PassRecovery'
import ServicesDetails from './Loyout/ServicesDetails/ServicesDetails'
import SliderPhotos from './Loyout/SliderPhotos/SliderPhotos'
import PrivateRoute from './PrivateRoute'
import './reset.css'
import {
  ABOUT_DETAILS,
  ACTIVE_BOOKINGS,
  BOOKING_TIMES,
  CANCELED_BOOKINGS,
  CONTACT_DETAILS,
  DONE_BOOKINGS,
  LOGIN,
  NEWS_DETAILS,
  PACKAGES,
  PASS_RECOVERY,
  PROCESS_BOOKINGS,
  SERVICES,
  SERVICES_DETAILS,
  SLIDER_PHOTOS,
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
            path={ACTIVE_BOOKINGS}
            element={
              // <Suspense fallback={<Loader />}>
              <PrivateRoute redirectTo={LOGIN}>
                <ActiveBookings />
              </PrivateRoute>
              // </Suspense>
            }
          />
          <Route
            exact
            path={PROCESS_BOOKINGS}
            element={
              // <Suspense fallback={<Loader />}>
              <PrivateRoute redirectTo={LOGIN}>
                <ProcessBookings />
              </PrivateRoute>
              // </Suspense>
            }
          />
          <Route
            exact
            path={DONE_BOOKINGS}
            element={
              // <Suspense fallback={<Loader />}>
              <PrivateRoute redirectTo={LOGIN}>
                <DoneBookings />
              </PrivateRoute>
              // </Suspense>
            }
          />
          <Route
            exact
            path={CANCELED_BOOKINGS}
            element={
              // <Suspense fallback={<Loader />}>
              <PrivateRoute redirectTo={LOGIN}>
                <CanceledBookings />
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
            path={SLIDER_PHOTOS}
            element={
              // <Suspense fallback={<Loader />}>
              <PrivateRoute redirectTo={LOGIN}>
                <SliderPhotos />
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
