import React, { useState } from "react";
import styled from "styled-components";

const Tab = styled.button`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: blue;
  border: 0;
  outline: 0;
  text-color:white
  ${({ active }) =>
    active &&
    `
    border: 4px solid white;
    opacity: 1;
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-left: 50px;
  margin-top: 30px;
  flex-wrap: wrap;
  gap: 10px;
`;

const types = [
  "Register", "Delivery Order", "Utr Entry", "Tender Purchase", "Database Backup",
  "Carporate Sale", "Multiple Recipent", "Recepit Payment", "Trial Balance Screen",
  "Sugar Balance Stack","Dispatch Summary", "Transport SMS", "Stock Book", "Stock Summary",
  "Daily Report", "Ledger", "Carporate Register", "Broker Report", "Grain Sale Bill"
];

function chunkArray(array, chunkSize) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }
  return chunkedArray;
}

function Home() {
  const [active, setActive] = useState(types[0]);

  const chunkedTypes = chunkArray(types, 5);

  return (
    <>
      {chunkedTypes.map((chunk, index) => (
        <ButtonGroup key={index}>
          {chunk.map((type) => (
            <Tab
              key={type}
              active={active === type}
              onClick={() => setActive(type)}
            >
              {type}
            </Tab>
          ))}
        </ButtonGroup>
      ))}
    </>
  );
}

export default Home;