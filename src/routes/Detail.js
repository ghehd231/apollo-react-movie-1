import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Movie from "../components/Movie";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      rating
      language
      medium_cover_image
      description_intro
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: ${({ height }) => (height ? height : "100vh")};
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  width: 50%;
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
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

const SuggestionsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SuggestionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -50px;
`;

const Detail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id: Number(id) },
  });
  if (error) {
    return <Container>error...</Container>;
  } else {
    return (
      <>
        <Container height={loading ? "100vh" : "80vh"}>
          <Column>
            <Title>{loading ? "loading.." : data.movie.title}</Title>
            {!loading && (
              <Subtitle>
                {data?.movie?.language} · {data?.movie?.rating}
              </Subtitle>
            )}
            <Description>{data?.movie?.description_intro}</Description>
          </Column>
          <Poster bg={data?.movie?.medium_cover_image}></Poster>
        </Container>
        <SuggestionsWrap>
          <SuggestionsContainer>
            {data?.suggestions?.map((m) => (
              <Movie key={m.id} id={m.id} bg={m.medium_cover_image} />
            ))}
          </SuggestionsContainer>
        </SuggestionsWrap>
      </>
    );
  }
};

export default Detail;
