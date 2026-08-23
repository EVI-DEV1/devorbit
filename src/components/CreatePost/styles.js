import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  margin: 12px 0 38px;
`;

export const OpenButton = styled.button`
  width: 100%;
  min-height: 72px;

  display: flex;
  align-items: center;
  gap: 14px;

  padding: 18px 22px;

  border: 1px solid #00e676;
  border-radius: 18px;

  background: #211c33;
  color: #ffffff;

  font-size: 16px;
  font-weight: 700;

  cursor: pointer;
  transition: 0.25s;

  svg {
    color: #00e676;
    font-size: 22px;
  }

  &:hover {
    background: rgba(0, 230, 118, 0.06);
    transform: translateY(-2px);
  }
`;

export const Composer = styled.div`
  width: 100%;
  padding: 24px;

  background: #211c33;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  margin-bottom: 20px;
`;

export const UserAvatar = styled.img`
  width: 52px;
  height: 52px;

  border-radius: 50%;
  border: 2px solid #00e676;

  object-fit: cover;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    color: #ffffff;
    font-size: 16px;
  }

  span {
    color: #9fa8b7;
    font-size: 13px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Input = styled.input`
  width: 100%;

  padding: 14px 16px;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;

  background: #17131f;
  color: #ffffff;

  outline: none;

  &::placeholder {
    color: #8f8f9b;
  }

  &:focus {
    border-color: #00e676;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 130px;

  padding: 14px 16px;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;

  background: #17131f;
  color: #ffffff;

  outline: none;
  resize: vertical;

  &::placeholder {
    color: #8f8f9b;
  }

  &:focus {
    border-color: #00e676;
  }
`;

export const HelperText = styled.span`
  color: #8f8f9b;
  font-size: 12px;
  text-align: right;
`;

export const PreviewContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const PreviewImage = styled.img`
  width: 100%;
  max-height: 380px;

  display: block;
  object-fit: cover;

  border-radius: 14px;
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;

  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 50%;

  background: rgba(0, 0, 0, 0.75);
  color: #ffffff;

  cursor: pointer;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;

  div {
    display: flex;
    gap: 10px;
  }

  @media (max-width: 600px) {
    align-items: stretch;
    flex-direction: column;

    div {
      width: 100%;
    }
  }
`;

export const ImageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: 11px 16px;

  border: 1px solid #00e676;
  border-radius: 9px;

  background: transparent;
  color: #00e676;

  cursor: pointer;
  font-weight: 600;
`;

export const PublishButton = styled.button`
  padding: 12px 24px;

  border: none;
  border-radius: 9px;

  background: #6f00ff;
  color: #ffffff;

  cursor: pointer;
  font-weight: 700;

  &:hover {
    background: #8527ff;
  }
`;

export const CancelButton = styled.button`
  padding: 12px 20px;

  border: 1px solid #55515e;
  border-radius: 9px;

  background: transparent;
  color: #ffffff;

  cursor: pointer;
`;

export const HiddenInput = styled.input`
  display: none;
`;
export const FieldGroup = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  color: #ffffff;

  font-size: 14px;
  font-weight: 700;
`;
export const Select = styled.select`
  width: 100%;

  padding: 14px 16px;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;

  background: #17131f;
  color: #ffffff;

  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #00e676;
  }

  option {
    background: #17131f;
  }
`;
