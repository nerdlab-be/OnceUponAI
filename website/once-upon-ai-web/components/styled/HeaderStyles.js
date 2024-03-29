import styled from "@emotion/styled";
import Link from "next/link";

export const HeaderWrapper = styled.header`
  min-height: 80px;
  padding: 1rem 4rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid white;
  position: relative;
  overflow: hidden;

  &:after {
    right: 0;
    transform: translate(50%);
  }
  &:before {
    left: 0;
    transform: translate(-50%);
  }
  &:before,
  &:after {
    content: "";
    aspect-ratio: 1 / 1;
    height: calc(3px + 100%);
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    border: 1.5px solid white;
    position: absolute;
    box-sizing: border-box;
  }
`;

export const HeaderContainer = styled.header`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-end;
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const MenuItems = styled.nav`
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

export const NavList = styled.ul`
  text-align: center;
  display: flex;
  list-style: none;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    flex-direction: column;
    margin-top: ${(props) => (props.isOpen ? "16px" : "")};
    gap: 4px;
  }
`;

export const NavItem = styled.li`
  border-bottom: 3px solid transparent;

  &:hover {
    border-bottom: 2px solid white;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-bottom: 0.5rem;
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
`;
