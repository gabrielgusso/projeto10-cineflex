import Header from "./Header"
import HomePage from "./HomePage"
import GlobalStyle from "../style/globalStyles"
import SelectTime from "./SelectTime"
import SelectSeat from "./SelectSeat"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
       <Route path="/" element={<HomePage />} /> 
       <Route path="/:idFilm" element={<SelectTime />} /> 
       <Route path="/:idFilm/:idDate" element={<SelectSeat />} />
      </Routes>
    </BrowserRouter>
  )
}
