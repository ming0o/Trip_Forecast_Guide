import styled from 'styled-components';

export const Title = styled.div`
  font-size: 2.7rem; 
  font-weight: bold;
  color: #000000;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 8%;
    margin: 0 6%;
`

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
`

export const InputContainer = styled.div`
    display: flex;
    width: 35%;
    right: 0;
    align-items: center;
    justify-content: center;
    border: 1px solid #d9d9d9;
    border-radius: 20px;
    padding: 10px; 
    margin: 4px 0; 
    margin-left: auto;
`

export const Input = styled.input`
    border: none;
    outline: none;
    width: 100%;
    font-size: 20px;
    &::placeholder {
        color: #777;
    }
`;

export const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto; 
    margin-top: 20px; 
    border: 1px solid #d9d9d9; 
    border-radius: 10px; 
    padding: 20px; 
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;


export const Th = styled.th`
    border-bottom: 1px solid #d9d9d9;
    padding: 8px;
    font-size: 1.5rem;
    text-align: center;
`;

export const Td = styled.td`
    border-bottom: 1px solid #d9d9d9;
    padding: 8px;
    font-size: 1.3rem;
    text-align: center;
    vertical-align: middle;
`;

export const Tr = styled.tr`
    font-size: 1.3rem;
    text-align: center;
`;