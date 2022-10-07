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
      console.log(response.data.days)
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
            <p>{e.weekday} - {e.date}</p>
            <DivButtons>
            <StlyledLink to={`/${items.id}/${e.showtimes[0].id}`}><button>15:00</button> </StlyledLink>
            <StlyledLink to={`/${items.id}/${e.showtimes[1].id}`}><button>19:00</button> </StlyledLink>
            </DivButtons>
          </>
        ))}
      </ChoseTime>
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