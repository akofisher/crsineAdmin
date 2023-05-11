import './App.css';
import Main from './Loyout/Main/Main';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ADD_CATEGORY, ADD_PRODUCT, LOGIN, MAIN_PAGE, PASS_RECOVERY } from './routes';
import './reset.css'
import Category from './Loyout/Category/Category';
import Products from './Loyout/Products/Products';
import Login from './Loyout/Login/Login';
import PrivateRoute from './PrivateRoute';
import PassRecovery from './Loyout/Recovery/PassRecovery';



function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route exact path={LOGIN} element={<Login />} />
          <Route exact path={PASS_RECOVERY} element={<PassRecovery />} />
          <Route exact path={MAIN_PAGE} element={
            // <Suspense fallback={<Loader />}>
            <PrivateRoute redirectTo={LOGIN}>
              <Main />
            </PrivateRoute>
            // </Suspense> 
          } />
          <Route exact path={ADD_CATEGORY} element={
            // <Suspense fallback={<Loader />}>
            <PrivateRoute redirectTo={LOGIN}>
              <Category />
            </PrivateRoute>
            // </Suspense> 
          } />
          <Route exact path={ADD_PRODUCT} element={
            // <Suspense fallback={<Loader />}>
            <PrivateRoute redirectTo={LOGIN}>
              <Products />
            </PrivateRoute>
            // </Suspense> 
          } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
