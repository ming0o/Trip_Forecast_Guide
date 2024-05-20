import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as T from './Styles';
import Header from '../../components/Header';

interface Course {
    id: number;
    courseName: string;
    touristSpotName: string;
    operatingHours: string;
}

function CoursePage() {
    const [courseData, setCourseData] = useState<Course[]>([]);
    const BASE_URL = 'apis.data.go.kr/1360000/TourStnInfoService1/getTourStnVilageFcst1';
    const API_KEY = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}?serviceKey=${API_KEY}&numOfRows=1&pageNo=10`);
                const data: Course[] = await response.json();
                setCourseData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Header />
            <T.Container>
                <T.TitleContainer>
                    <T.Title>
                        코스 검색
                    </T.Title>
                    <T.InputContainer>
                        <T.Input placeholder="코스명, 관광지명 또는 지역을 검색해주세요." />
                    </T.InputContainer>
                </T.TitleContainer>
                <T.TableContainer>
                    <T.Table>
                        <thead>
                            <T.Tr>
                                <T.Th>코스명</T.Th>
                                <T.Th>관광지명</T.Th>
                                <T.Th>운영시간</T.Th>
                            </T.Tr>
                        </thead>
                        <tbody>
                            {courseData.map((item, index) => (
                                <T.Tr key={index}>
                                    <T.Td>{item.courseName}</T.Td>
                                    <T.Td>{item.touristSpotName}</T.Td>
                                    <T.Td>{item.operatingHours}</T.Td>
                                </T.Tr>
                            ))}
                        </tbody>
                    </T.Table>
                </T.TableContainer>
            </T.Container>
        </>
    );
}

export default CoursePage;
