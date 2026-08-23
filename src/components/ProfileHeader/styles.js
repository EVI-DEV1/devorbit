import styled from "styled-components";

export const Container = styled.div`
    width:100%;
    margin-bottom:12px;
`;
export const Cover = styled.div`
  width: 100%;
  height: 220px;

  @media (max-width: 480px) {
    height: 160px;
  }
  border-radius: 16px;
  cursor: ${({ image }) =>
    image ? "pointer" : "default"};

  background: ${({ image }) =>
    image
      ? `url(${image}) center / cover no-repeat`
      : `linear-gradient(
          135deg,
          #1f1f1f,
          #2d2d2d,
          #8B5CF6
        )`};
`;

export const Content = styled.div`
    margin-top:-70px;

    padding:0 40px;

    display:flex;
    flex-direction:column;
    align-items:center;

    @media (max-width: 768px) {
        padding: 0 16px;
    }
`;

export const AvatarWrapper = styled.div`
    width:140px;
    height:140px;

    border-radius:50%;
    padding:5px;

    background:#121212;
`;

export const Avatar = styled.img`
    width:100%;
    height:100%;

    object-fit:cover;

    border-radius:50%;
`;
export const UserInfo = styled.div`
  margin-top: 18px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  gap: 8px;
`;

export const Name = styled.h1`
  color: #fff;
  font-size: 34px;
  margin: 0;
`;

export const Profession = styled.p`
  color: #9b72ff;
  font-size: 18px;
  margin: 0;
`;

export const Bio = styled.p`
  color: #cfcfcf;
  line-height: 1.5;
  max-width: 600px;
  margin: 0;
`;



export const AvatarContainer = styled.div`
    position: relative;
    width: 150px;
    height: 150px;
    cursor: pointer;
`;

export const CameraButton = styled.button`
    position: absolute;
    bottom: 8px;
    right: 8px;

    width: 38px;
    height: 38px;

    border: none;
    border-radius: 50%;

    background: #8B5CF6;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    transition: .2s;

    &:hover{
        transform: scale(1.08);
    }
`;

export const CoverContainer = styled.div`
    position: relative;
    width: 100%;
`;

export const CoverButton = styled.button`
    position: absolute;

    right: 20px;
    bottom: 20px;

    width: 42px;
    height: 42px;

    border-radius: 50%;
    border: none;

    background: rgba(0,0,0,.65);

    color: white;

    display:flex;
    justify-content:center;
    align-items:center;

    cursor:pointer;

    transition:.2s;

    &:hover{
        transform:scale(1.05);
    }
`;

export const ProfileLinks = styled.div`
  margin-top: 4px;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
`;

export const InfoItem = styled.span`
  color: #cfcfcf;
  font-size: 14px;

  a {
    color: #c4b5fd;
    text-decoration: none;
    font-weight: 600;
  }
`
