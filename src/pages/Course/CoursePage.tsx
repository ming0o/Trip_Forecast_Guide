import { useState, useEffect } from 'react';
import * as T from './Styles';
import Header from '../../components/Header';
import { TouristSpot } from '../../types/types';

// 현재 날짜와 시간을 'YYYYMMDDHH' 형식으로 변환하는 함수
const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    return `${year}${month}${day}${hours}`;
}

function CoursePage() {
    const [courseData, setCourseData] = useState<TouristSpot[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const BASE_URL = 'https://apis.data.go.kr/1360000/TourStnInfoService1/getTourStnVilageFcst1';
    const API_KEY = import.meta.env.VITE_APP_API_KEY;

    // 필요한 요청 변수들
    const pageNo = 1;
    const numOfRows = 100000;
    const dataType = 'JSON';
    const CURRENT_DATE = getCurrentDate();
    const HOUR = 24;
    const COURSE_ID = '30';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${BASE_URL}?serviceKey=${API_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}&dataType=${dataType}&CURRENT_DATE=${CURRENT_DATE}&HOUR=${HOUR}&COURSE_ID=${COURSE_ID}`;
                const response = await fetch(url);

                // 응답을 텍스트로 출력
                const textResponse = await response.text();
                console.log(textResponse);

                // JSON으로 파싱 시도
                if (response.headers.get('content-type')?.includes('application/json')) {
                    const data = JSON.parse(textResponse);
                    // 데이터가 배열인지 확인하고 변환
                    if (data.response?.body?.items?.item) {
                        setCourseData(Array.isArray(data.response.body.items.item) ? data.response.body.items.item : [data.response.body.items.item]);
                    } else {
                        throw new Error('잘못된 응답 형식입니다.');
                    }
                } else {
                    throw new Error('JSON 형식이 아닙니다.');
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    const filteredData = courseData.filter(item =>
        item.courseAreaName.includes(searchTerm) || item.spotAreaName.includes(searchTerm)
    );

    const courseMap = new Map<string, Set<string>>(); // 중복된 관광지 제거 후 저장
    filteredData.forEach(item => {
        if (!courseMap.has(item.courseName)) {
            courseMap.set(item.courseName, new Set<string>());
        }
        courseMap.get(item.courseName)!.add(item.spotName);
    });

    return (
        <>
            <Header />
            <T.Container>
                <T.TitleContainer>
                    <T.Title>
                        코스 검색
                    </T.Title>
                    <T.InputContainer>
                        <T.Input
                            placeholder="코스명, 관광지명 또는 지역을 검색해주세요."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </T.InputContainer>
                </T.TitleContainer>
                <T.TableContainer>
                    <T.Table>
                        <thead>
                            <T.Tr>
                                <T.Th style={{ width: '40%' }}>코스명</T.Th>
                                <T.Th style={{ width: '40%' }}>관광지명</T.Th>
                                <T.Th style={{ width: '20%' }}>운영시간</T.Th>
                            </T.Tr>
                        </thead>
                        <tbody>
                            {Array.from(courseMap.entries()).map(([courseName, spots], index) => {
                                const spotArray = Array.from(spots);
                                return spotArray.map((spot, spotIndex) => (
                                    <T.Tr key={`${index}-${spotIndex}`}>
                                        {spotIndex === 0 && (
                                            <T.Td rowSpan={spotArray.length}>
                                                {courseName}
                                            </T.Td>
                                        )}
                                        <T.Td>{spot}</T.Td>
                                    </T.Tr>
                                ));
                            })}
                        </tbody>
                    </T.Table>
                </T.TableContainer>
            </T.Container>
        </>
    );
}

export default CoursePage;
