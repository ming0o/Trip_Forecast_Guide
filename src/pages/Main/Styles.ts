import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
`;

export const VideoBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; 
  z-index: -1; 
`;

export const VideoContent = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover; 
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1; 
  display: flex;
  flex-direction: column;
  color: white; 
`;

export const TextContainer = styled.div`
  display: flex;
  width: 100%;
  height: 40%;
  flex-direction: column;
  align-items: center;  
  justify-content: center;
  padding-top: 13%;
  position: relative;
`;

export const Title = styled.div`
  font-size: 2em; 
  color: #ebebeb;
`;

export const Subtitle = styled.div`
  font-weight: semibold;
  font-size: 8em;
  color: #ffffff;
  letter-spacing: 20px;
`;

export const ContentContainer = styled.div`
  display: flex;  
  width: 100%;
  height: 50%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: #ffffff; 
  top: 50%;
  gap: 50px;
`;

export const SearchBox = styled.div`
  width: 30%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 30px;
  border-radius: 20px;
  position: relative;
`

export const PlaceSearch = styled(SearchBox)`
  background-color: #F5F5F5;
  color: #222222;
`;

export const CourseSearch = styled(SearchBox)`
  background-color: #262626;
  color: #ffffff;
`;

export const TitleText = styled.div`
  font-size: 2.5em; 
`

export const BottomText = styled.div`
  font-size: 1em;
  display: flex;
  position: absolute;
  bottom: 40px;
  width: 100%;
  justify-content: center;
`