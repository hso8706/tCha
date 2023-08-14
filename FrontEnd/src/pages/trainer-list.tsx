import { useEffect, useState } from "react";
import axios from "axios";

import { api } from "@shared/common-data";

import TrainerListHeader from "@trainer-list/trainer-list-header";
import TrainerListItem from "@trainer-list/trainer-list-item";

import styled from "styled-components";
import { Pagination } from "@mui/material";
import { SearchFormData, TrainerListData } from "src/interface";
import { error } from "console";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  /* justify-content: center; */
  align-items: center;
  padding: 1% 3%;
  border-radius: 5px;
  /* background-color: lightgrey; */
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
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  const searchTrainer = (body: any) => {
    console.log(page);
    console.log(body);
    axios
      .get(`${api}/trainers/search?page=2&size=10`, {
        data: JSON.stringify(body),
      })
      .then((response) => {
        console.log(response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sortTrainer = (condition: string) => {
    axios
      .get(`${api}/trainers${condition}?page=${page}&size=10`)
      .then((response) => {
        console.log(response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Wrapper>
      <TrainerListHeader
        searchTrainer={searchTrainer}
        sortTrainer={sortTrainer}
      />
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
