import styled from "styled-components";

export const FormContainer = styled.main`
    max-width: 30%;
    margin: 0 auto;

    @media (max-width: 1200px) {
        max-width: 50%;
    }

    @media (max-width: 800px) {
        max-width: 95%;
    }
`;

export const FormInput = styled.input`
    width: 100%;
    border: 0;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 5px;
    color: #fff;
    background: #2c2c2c;
`;

export const FormPasswordContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    border: 0;
    margin-bottom: 1rem;
    border-radius: 5px;
    color: #fff;
    background: #2c2c2c;
`;

export const FormPasswordInput = styled.input`
    flex: 1;
    padding: 1rem;
    color: #fff;
    background: #2c2c2c;
    border-radius: 5px 0 0 5px;
    border: 0;
`;

export const FormRevealPasswordIcon = styled.svg`
    margin: 0 .5rem;
    cursor: pointer;
`;

export const FormChangeDetailsButton = styled.button`
    cursor: pointer;
    background: #2c2c2c;
    border-radius: 5px;
    color: #fff;
    padding: .8rem 1rem;
`;