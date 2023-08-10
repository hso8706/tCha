import { useEffect, useState } from "react";
import axios from "axios";

import { api } from "@shared/common-data";

import TrainerListHeader from "@trainer-list/trainer-list-header";
import TrainerListItem from "@trainer-list/trainer-list-item";

import styled from "styled-components";
import { Pagination } from "@mui/material";
import { TrainerListData } from "src/interface";

const Wrapper = styled.div`
  margin: 1%;
  padding: 3%;
  border-radius: 5px;
  background-color: white;
`;

function TrainerList() {
  const [items, setItems] = useState<TrainerListData>();
  const [page, setPage] = useState(1);
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    axios
      .get(`${api}/trainers?page=${page}&size=10`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Wrapper>
      <TrainerListHeader />
      {items?.data.map((item, index) => (
        <TrainerListItem data={item} key={index} />
      ))}
      <Pagination
        count={items?.pageInfo.totalPages}
        page={page}
        onChange={handleChangePage}
        color="standard"
      />
    </Wrapper>
  );
}

export default TrainerList;
