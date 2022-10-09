import Header from "./Header"
import HomePage from "./HomePage"
import GlobalStyle from "../style/globalStyles"
import SelectTime from "./SelectTime"
import SelectSeat from "./SelectSeat"
import Success from "./success"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

export default function App() {
  const [successText, setSuccessText] = useState({})

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
       <Route path="/" element={<HomePage />} /> 
       <Route path="/:idFilm" element={<SelectTime />} /> 
       <Route path="/:idFilm/:idDate" element={<SelectSeat setSuccessText={setSuccessText}/>} />
       <Route path="/:idFilm/:idDate/success" element={<Success successText={successText}/>} />
      </Routes>
    </BrowserRouter>
  )
}
