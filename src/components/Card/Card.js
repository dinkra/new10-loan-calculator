import styled from 'styled-components';

const Card = styled.div`
  margin: 0.5em 0;
  padding: 0.5em;
  box-shadow: 0 2px 4px 0 rgba(49, 50, 51, 0.2);
  background-color: ${(p) => (p.dark ? p.theme.backgroundInfo : p.theme.white)};
`;

export default Card;
