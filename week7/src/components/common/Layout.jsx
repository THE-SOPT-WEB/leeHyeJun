import styled from "styled-components";
import Header from "./Header";

function Layout({ children }) {
  return (
    <LayoutWrapper>
      <Header />
      {children}
    </LayoutWrapper>
  );
}

export default Layout;

const LayoutWrapper = styled.div``;
