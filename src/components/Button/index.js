import styled from "styled-components";

const Button = styled.button`
color: #ffe;
border: 1px solid #ffe;
box-sizing: border-box;
cursor: pointer;
padding: 16px 24px;
margin-right: 105px;
font-style: normal;
font-weight: bold;
font-size: 16px;
outline: none;
border-radius: 5px;
text-decoration: none;
display: inline-block;
transition: opacity .3s;
&:hover,
&:focus {
    opacity: .5;
    `;

export const ButtonNao = styled.button`
    color: #f34;
    align-self: center;
    border: 1px solid #f34;
    width: 48%;
    flex: 1;
    margin: 5px 1%;
    box-sizing: border-box; 
    cursor: pointer;
    padding: 16px 24px;
    font-style: normal;
    font-weight: bold;
    font-size: 17px;
    outline: none;
    border-radius: 5px;
    text-decoration: none;
    display: inline-block;
    transition: opacity .3s;
    &:hover,
    &:focus {
      opacity: .5;
    `;

export const ButtonSim = styled.button`
    color: #003;
    align-self: center;
    border: 1px solid #003;
    width: 48%;
    margin: 5px 1%;
    box-sizing: border-box; 
    cursor: pointer;
    padding: 16px 24px;
    font-style: normal;
    font-weight: bold;
    font-size: 17px;
    outline: none;
    border-radius: 5px;
    text-decoration: none;
    display: inline-block;
    transition: opacity .3s;
    &:hover,
    &:focus {
      opacity: .5;
    `;

export const ButtonFiltro = styled.button`
    color: #003;
    border: 1px solid #003;
    box-sizing: border-box;
    cursor: pointer;
    padding: 16px 24px;
    margin-right: 105px;
    margin-left: 15px;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    outline: none;
    border-radius: 5px;
    text-decoration: none;
    display: inline-block;
    transition: opacity .3s;
    &:hover,
    &:focus {
        opacity: .5;
        `;

export default Button;
