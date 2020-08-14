import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      rating
      language
      medium_cover_image
      description_intro
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
`;

const Detail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id: Number(id) },
  });
  if (loading) {
    return <Container>loading...</Container>;
  } else if (error) {
    return <Container>error...</Container>;
  } else if (!data || !data.movie) {
    return <Container>데이터 없음..</Container>;
  } else {
    const {
      title,
      language,
      rating,
      description_intro,
      medium_cover_image,
    } = data.movie;
    return (
      <Container>
        <Column>
          <Title>{title}</Title>
          <Subtitle>
            {language} · {rating}
          </Subtitle>
          <Description>{description_intro}</Description>
        </Column>
        <Poster>
          <img src={medium_cover_image} alt="poster" />
        </Poster>
      </Container>
    );
  }
};

export default Detail;
