import React, { useEffect } from 'react'
import LoginPage from './pages/login/Login'
import SideBar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import WelcomePage from './pages/WelcomePage'
import { useDispatch, useSelector } from 'react-redux'
import FormPage from './pages/product/Form'
import FormUpdate from './pages/product/Update'
import type { AppDispatch } from './lib/store'
import ProductPage from './pages/product/Product'
import { ProductList } from './pages/product/ProductSlice'

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      dispatch(ProductList());
    }, []);
  const{token} = useSelector((state:any) => state.login);
  return (
    <div className='overflow-hidden lg:flex'>
      <SideBar/>
      <Routes>
        <Route path='/' element={
          !token ? <WelcomePage/> : <Dashboard/>
        }/>
        <Route path='/dashboard' element={
          !token ? <LoginPage/> : <Dashboard/>
        }/>
        <Route path='/product' element={
          !token ? <LoginPage/> : <ProductPage/>
        }/>
        <Route path='/product/create' element={
          !token ? <LoginPage/> : <FormPage/>
        }/>
        <Route path='/product/:id' element={
          !token ? <LoginPage/> : <FormUpdate/>
        }/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </div>
  )
}

export default App