import React, { useEffect, useState } from "react";

import { TrainerReviewData, TrainerProps } from "src/interface";
import Pagination from "@mui/material/Pagination";
import Rating from "@mui/material/Rating";
import styled from "styled-components";
import axios from "axios";
import { api } from "@shared/common-data";

const TotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0%;
`;
const ContainerSet = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 5%;
  /* background-color: ${({ theme }) => theme.color.light}; */
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  /* min-height:10rem; */
  padding: 3%;
  /* border-radius: 10px; */
  background-color: ${({ theme }) => theme.color.light};
  border-bottom: 1px solid lightgray;
  @media (max-width:767px){
    margin: 1% 0%;    
  }
  `;

const ProfileWrapper = styled.div`
  display: flex;
  flex: 3;
  flex-direction: row;
  align-items: center;
  padding-bottom: 1%;
`;

const ContentsWrapper = styled.div`
  display: flex;
  font-size: 1rem;
  padding: 2% 1%;
`;

const UserProfileTextData = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.5%;
  @media (max-width:767px){
    margin-left: 1.5%;
  }
`;

const UserProfileimg = styled.img`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  background-color: lightgray;
  /* box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1); */
`;

const NameWrapper = styled.div`
 
`;

const DateRateWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
`;

const TrainerReview: React.FC<TrainerProps> = ({ trainer }) => {
  const [page, setPage] = React.useState(1);
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const [reviewData, setReviewData] = useState<TrainerReviewData>();

  useEffect(() => {
    axios
      .get(`${api}/reviews/trainer/${trainer}?page=${page}&size=10`)
      .then((response) => {
        setReviewData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, trainer]);

  return (
    <TotalWrapper>
      <ContainerSet>
        {reviewData?.data[0] ? (
          reviewData.data.map((item, index) => (
            <ReviewContainer key={index}>
              <ProfileWrapper>
                <UserProfileimg src={item.profileImg}/>
                <UserProfileTextData>
                  <NameWrapper>
                    <b style={{ fontSize: "1.5rem"}}> {item.profileName}</b>
                    <b style={{ fontSize: "1rem", marginLeft: "0.5rem" }}>회원님</b>
                  </NameWrapper>

                  <DateRateWrapper>
                    <Rating value={item.star} precision={0.5} readOnly />
                    <b style={{ fontSize: "1rem", marginLeft: "0.5rem"}}>{item.star}</b>
                    {/* <b style={{ fontSize: "0.7rem" }}>작성자 : {item.profileName}</b> */}
                  </DateRateWrapper>
                </UserProfileTextData>
              </ProfileWrapper>

              <ContentsWrapper>{item.content}</ContentsWrapper>
            </ReviewContainer>
          ))
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h6>아직 작성된 리뷰가 없습니다</h6>
          </div>
        )}
      </ContainerSet>

      <Pagination
        count={reviewData?.pageInfo.totalPages}
        page={page}
        onChange={handleChangePage}
        color="standard"
        style={{ marginBottom: "3%" }}
      />
    </TotalWrapper>
  );
};

export default TrainerReview;
