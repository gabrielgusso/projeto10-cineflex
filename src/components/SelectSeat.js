import styled from "styled-components"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function SelectSeat() {
  const { idDate } = useParams()
  const [items, setItems] = useState([])
  const [seats, setSeats] = useState([])
  useEffect(() => {
    const promisse = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idDate}/seats`
    )

    promisse.then((response) => {
      setItems(response.data)
      setSeats(response.data.seats)
      console.log(response.data.seats)
    })

    promisse.catch((error) => {
      console.log(error.response.data)
    })
  }, [])

  return (
    <>
      <Text>
        <h1>Selecione o(s) assento(s)</h1>
      </Text>
      <AllSeats>
        {seats.map((e) => (
          <Seat color={e.isAvailable ? "#c3cfd9" : "#fbe192"}>{e.name}</Seat>
        ))}
      </AllSeats>
      <Subtitle>
        <SubtitleDiv>
          <Select />
          <p>Selecionado</p>
        </SubtitleDiv>
        <SubtitleDiv>
          <Avaliable />
          <p>Disponível</p>
        </SubtitleDiv>
        <SubtitleDiv>
          <Unavailable />
          <p>Indisponível</p>
        </SubtitleDiv>
      </Subtitle>
      <Form>
        <label htmlFor="nome">Nome do comprador:</label>
        <input type="text" id="nome" placeholder="Digite seu nome..." />
        <label htmlFor="cpf">CPF do comprador:</label>
        <input type="text" id="cpf" placeholder="Digite seu CPF..." />
        <ButtonFlex>
          <button>Reservar assento(s)</button>
        </ButtonFlex>
      </Form>
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

const AllSeats = styled.div`
  margin: 0 21px 0 24px;
  display: flex;
  flex-wrap: wrap;
`

const Seat = styled.div`
  width: 26px;
  height: 26px;
  background: ${(props) => props.color};
  border: 1px solid #808f9d;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin: 10px 3px 10px 3px;
`
const Subtitle = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 16px 35px 0px 35px;
`

const Select = styled.div`
  width: 25px;
  height: 25px;
  background: #1aae9e;
  border: 1px solid #0e7d71;
  border-radius: 17px;
`

const Avaliable = styled.div`
  width: 24px;
  height: 24px;
  background: #c3cfd9;
  border: 1px solid #7b8b99;
  border-radius: 17px;
`

const Unavailable = styled.div`
  width: 24px;
  height: 24px;
  background: #fbe192;
  border: 1px solid #f7c52b;
  border-radius: 17px;
`

const SubtitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    margin-top: 10px;
    font-size: 13px;
  }
`
const Form = styled.form`
  margin: 0 21px 0 24px;
  display: flex;
  padding: 4px;
  justify-content: center;
  flex-direction: column;
  margin-top: 25px;

  label {
    font-size: 18px;
    margin-top: 12px;
    margin-bottom: 5px;
  }
  input {
    width: 327px;
    height: 51px;
    border-radius: 3px;
    outline: none;
    border: 1px solid #D5D5D5;
  }

  button {
    width: 225px;
    height: 42px;
    border: none;
    font-size: 18px;
    background-color: #e8833a;
    border-radius: 3px;
  }
`
const ButtonFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`
