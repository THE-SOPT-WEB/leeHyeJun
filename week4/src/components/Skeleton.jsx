import styled, { keyframes, css } from "styled-components";

function Skeleton() {
  return (
    <SkeletonItem>
      <SkeletonName />
      <SkeletonPhone />
      <SkeletonInfo>
        <SkeletonDistance />
      </SkeletonInfo>
    </SkeletonItem>
  );
}

export default Skeleton;

const loading = keyframes`
  0% {
    transform: translateX(0);
  }
  50%,
  100% {
    transform: translateX(460px);
  }
`;

const SkeletonItem = styled.div`
  position: relative;
  width: 23rem;
  height: 5rem;
  background-color: white;
  border-radius: 10px;
  margin: 10px;
  padding: 15px 15px 15px 15px;
`;

const SkeletonDiv = css`
  position: relative;
  height: 1rem;
  padding: 5px;
  border-radius: 10px;
  background: #f2f2f2;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loading} 2s infinite linear;
  }
`;

const SkeletonName = styled.div`
  ${SkeletonDiv}

  width: 5rem;
  margin-bottom: 5px;
`;

const SkeletonPhone = styled.div`
  ${SkeletonDiv}

  width: 9rem;
`;

const SkeletonInfo = styled.div`
  display: flex;
  justify-content: right;
`;

const SkeletonDistance = styled.div`
  ${SkeletonDiv}

  width: 3rem;
`;
