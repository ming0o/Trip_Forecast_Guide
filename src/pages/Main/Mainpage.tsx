import { useNavigate } from 'react-router-dom';
import * as T from './Styles';
import wave from '../../assets/wave.mp4';
import map from '../../assets/map.png';
import mappin from '../../assets/mappin.png';

function MainPage() {
    const navigate = useNavigate();
    const navigateToPlaceSearch = () => {
        navigate('/whereplace');
    };
    const navigateToCourseSearch = () => {
        navigate('/courseguide');
    };

    return (
        <T.MainContainer>
            <T.VideoBackground>
                <T.VideoContent autoPlay muted loop>
                    <source src={wave} type="video/mp4" />
                    지원하지 않는 브라우저입니다.
                </T.VideoContent>
            </T.VideoBackground>
            <T.Content>
                <T.TextContainer>
                    <T.Title>국내 관광지 날씨 안내 서비스</T.Title>
                    <T.Subtitle>TRIPCAST</T.Subtitle>
                </T.TextContainer>
                <T.ContentContainer>
                    <T.PlaceSearch onClick={navigateToPlaceSearch}>
                        <T.TitleText>지역 검색</T.TitleText>
                        <img src={map} alt="지역 검색" style={{ marginTop: '30px' }} />
                        <T.BottomText>갈 곳은 전부 정했고 날씨만 확인하고 싶어요 !</T.BottomText>
                    </T.PlaceSearch>
                    <T.CourseSearch onClick={navigateToCourseSearch}>
                        <T.TitleText>위치 검색</T.TitleText>
                        <img src={mappin} alt="위치 검색" style={{ marginTop: '30px' }} />
                        <T.BottomText>지역은 정했고 세부 관광지는 추천을 받고 싶어요!</T.BottomText>
                    </T.CourseSearch>
                </T.ContentContainer>
            </T.Content>
        </T.MainContainer>
    );
}

export default MainPage;
