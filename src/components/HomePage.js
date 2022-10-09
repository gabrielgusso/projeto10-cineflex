import styled from "styled-components"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom";

export default function HomePage() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const promisse = axios.get(
      "https://mock-api.driven.com.br/api/v5/cineflex/movies"
    )

    promisse.then((response) => {
      setItems(response.data)
    })

    promisse.catch((error) => {
      console.log(error.response.data)
    })
  }, [])

  return (
    <Container>
      <>
        <h1>Selecione o filme</h1>
      </>
      <Films>
      {items.map((e) =>
      <Link to={`/${e.id}`}>
        <FilmCard data-identifier="movie-outdoor" src={e.posterURL} alt={e.title} />
      </Link>
      
      )}
      </Films>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: #293845;
    font-size: 24px;
    margin: 50px 0 50px 0;
  }
`
const Films =styled.div`
display: flex;
justify-content: center;
flex-wrap: wrap;
`
const FilmCard =styled.img`
    width: 129px;
    margin: 0 20px 20px 20px;
    border: 8px solid #FFFFFF;
    border-radius: 3px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;
`