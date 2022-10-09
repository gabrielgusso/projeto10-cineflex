import styled from "styled-components"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom";


export default function SelectTimeScreen() {
  const { idFilm } = useParams()
  const [items, setItems] = useState([])
  const [days, setDays] = useState([])


  useEffect(() => {
    const promisse = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilm}/showtimes`
    )

    promisse.then((response) => {
      setItems(response.data)
      setDays(response.data.days)
    })

    promisse.catch((error) => {
      console.log(error.response.data)
    })
  }, [])

  return (
    <>
      <Text>
        <h1>Selecione o horário</h1>
      </Text>

      <ChoseTime>
        {days.map((e) => (
          <>
            <p data-identifier="session-date" >{e.weekday} - {e.date}</p>
            <DivButtons>
            <StlyledLink to={`/${items.id}/${e.showtimes[0].id}`}><button data-identifier="hour-minute-btn">15:00</button> </StlyledLink>
            <StlyledLink to={`/${items.id}/${e.showtimes[1].id}`}><button data-identifier="hour-minute-btn">19:00</button> </StlyledLink>
            </DivButtons>
          </>
        ))}
      </ChoseTime>
      <Footer>
        <img data-identifier="movie-img-preview" src={items.posterURL} alt={items.title} />
        <div>
          <p data-identifier="movie-and-session-infos-preview" >{items.title}</p>
        </div>
      </Footer>
    </>
  )
}

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    color: #293845;
    font-size: 24px;
    margin: 50px 0 50px 0;
  }
`
const ChoseTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 24px 0 24px;
  font-size: 20px;
`
const DivButtons = styled.div`
  margin: 25px 0 25px 0;
  button {
    background: #e8833a;
    border-radius: 3px;
    border: none;
    width: 83px;
    height: 43px;
    color: white;
    font-size: 18px;
    margin-right: 10px;
    cursor: pointer;
  }
`
const StlyledLink = styled(Link)`
text-decoration: none;`

const Footer = styled.div`
  position: absolute;
  width: 100%;
  height: 117px;
  background: #dfe6ed;
  position: fixed;
  bottom: 0;
  display: flex;
  font-size: 22px;
  align-items: center;
  padding-left: 10px;
  img {
    width: 48px;
    height: 72px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    border: 8px solid white;
  }
  p {
    margin-left: 10px;
  }
`