import { useEffect } from "react";
import { FiX } from "react-icons/fi";

import { Overlay, Dialog, Head, Title, CloseButton, Body } from "./styles";

/*
 * Modal genérico (formulários do painel administrativo).
 */
const Modal = ({ title, onClose, children, width }) => {
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <Overlay onClick={onClose}>
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-label={title}
        $width={width}
        onClick={(event) => event.stopPropagation()}
      >
        <Head>
          <Title>{title}</Title>
          <CloseButton type="button" onClick={onClose} aria-label="Fechar">
            <FiX />
          </CloseButton>
        </Head>

        <Body>{children}</Body>
      </Dialog>
    </Overlay>
  );
};

export { Modal };
