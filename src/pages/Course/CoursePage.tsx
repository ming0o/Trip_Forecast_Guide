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

// 랜덤한 COURSE_ID 10개를 생성하는 함수
const getRandomCourseIds = (count: any, maxNumber: any) => {
    const courseIds = [];
    for (let i = 0; i < count; i++) {
        const randomNumber = Math.floor(Math.random() * maxNumber) + 1;
        courseIds.push(String(randomNumber));
    }
    return courseIds;
}

function CoursePage() {
    const [courseData, setCourseData] = useState<TouristSpot[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const BASE_URL = 'https://apis.data.go.kr/1360000/TourStnInfoService1/getTourStnVilageFcst1';
    const API_KEY = import.meta.env.VITE_APP_API_KEY;

    // 필요한 요청 변수들
    const pageNo = 1;
    const numOfRows = 100;
    const dataType = 'JSON';
    const CURRENT_DATE = getCurrentDate();
    const HOUR = 24;
    const COURSE_IDS = getRandomCourseIds(5, 438);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allData = [];
                for (const COURSE_ID of COURSE_IDS) {
                    const url = `${BASE_URL}?serviceKey=${API_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}&dataType=${dataType}&CURRENT_DATE=${CURRENT_DATE}&HOUR=${HOUR}&COURSE_ID=${COURSE_ID}`;
                    const response = await fetch(url);

                    // 응답을 텍스트로 출력
                    const textResponse = await response.text();
                    // JSON으로 파싱 시도
                    if (response.headers.get('content-type')?.includes('application/json')) {
                        const data = JSON.parse(textResponse);

                        // NO_DATA 응답을 처리
                        if (data.response?.header?.resultCode === "03") {
                            console.log(`No data for COURSE_ID ${COURSE_ID}`);
                            continue;
                        }

                        // 데이터가 배열인지 확인하고 변환
                        if (data.response?.body?.items?.item) {
                            const items = Array.isArray(data.response.body.items.item) ? data.response.body.items.item : [data.response.body.items.item];
                            allData.push(...items);
                        } else {
                            throw new Error('잘못된 응답 형식입니다.');
                        }
                    } else {
                        throw new Error('JSON 형식이 아닙니다.');
                    }
                }
                setCourseData(allData);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [CURRENT_DATE]);

    // 검색어를 바탕으로 데이터를 필터링하는 함수
    const filterData = (term: string) => {
        const lowerCaseTerm = term.toLowerCase().trim();
        console.log("검색어:", lowerCaseTerm); // 검색어 출력
        return courseData.filter(item => {
            console.log("코스 지역명:", item.courseAreaName.toLowerCase()); // 코스 지역명 출력
            console.log("관광지 지역명:", item.spotAreaName.toLowerCase()); // 관광지 지역명 출력
            console.log("관광지명:", item.spotName.toLowerCase()); // 관광지명 출력
            const courseMatches = item.courseAreaName.toLowerCase().includes(lowerCaseTerm);
            const spotAreaMatches = item.spotAreaName.toLowerCase().includes(lowerCaseTerm);
            const spotMatches = item.spotName.toLowerCase().includes(lowerCaseTerm);
            return courseMatches || spotAreaMatches || spotMatches;
        });
    }

    const filteredData = filterData(searchTerm);

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
