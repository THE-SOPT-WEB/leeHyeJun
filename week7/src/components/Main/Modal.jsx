import styled from "styled-components";

function Modal({ hidden, hideModal, modalInfo, unlock }) {
  return (
    <>
      {!hidden && (
        <>
          <ModalBackground onClick={hideModal} />
          <ModalItem>
            <h1>비밀번호를 입력하세요</h1>
            <p>{modalInfo.hint}</p>
            <input
              type="text"
              onChange={(e) => {
                if (e.target.value === modalInfo.password) {
                  unlock(true);
                  hideModal(true);
                }
              }}
            />
          </ModalItem>
        </>
      )}
    </>
  );
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalItem = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 500px;
  height: 210px;
  padding: 30px;
  background: ${({ theme }) => theme.color.ghostwhite};
  border-radius: 25px;
  z-index: 1;

  h1 {
    font-family: ${({ theme }) => theme.font.title};
    font-weight: bold;
    font-size: 30px;
    color: ${({ theme }) => theme.color.purple};
  }

  p {
    font-family: ${({ theme }) => theme.font.content};
    font-size: 20px;
  }

  input {
    width: 400px;
    height: 50px;

    padding-left: 15px;
    border: 3px solid ${({ theme }) => theme.color.purple};
    border-radius: 10px;

    text-align: center;
    font-family: ${({ theme }) => theme.font.content};
    font-size: 25px;
  }
`;
export default Modal;
