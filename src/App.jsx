import { useEffect, useState } from 'react'
// import { fetchDataFromApi } from './Redux/apiCall'
import Home from './modules/home/home'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle'
import { useDispatch, useSelector } from 'react-redux'
import *as action from './Redux/homePage/home_Actions'
import AppRoutes from './appRoutes'
function App() {
  const dispatch = useDispatch()
  const url = useSelector((state) => state.homepage.url)
  useEffect(() => {
    fetchApiConfiguration()
    genreList()
  }, [])

  const fetchApiConfiguration = async () => {
    const responce = await dispatch(action.fetchApiConfiguration())
    // const responce = await fetchDataFromApi('/movie/popular')
  }
  const genreList = async () => {
    // let Info = []
    const data = ["tv/list", "movie/list"]
    dispatch(action.genreList(data))

    // const dhr = await Promise.all(Info)
    // if (dhr.length === 2) {
    //   console.log()
    // }
  }

  return (
    <>
      <AppRoutes />
      {/* Welcome in my project +
      {url.total_pages}
      <Home /> */}
    </>
  )
}

export default App
