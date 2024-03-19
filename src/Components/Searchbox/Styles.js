// Libraries.

import styled, { css } from 'styled-components';

export const StyledImageContainer = styled.div`
  ${() => css`
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 100%;
    }
  `}
`;