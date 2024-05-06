import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface AlertDialogProps {
  title: string;
  message: string;
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const AlertDialog = (props: AlertDialogProps) => {
  const { title, message, open, onClose, onAccept } = props;

  return (
    <Modal title={title} isOpen={open} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-2xl">{title}</ModalHeader>
            <ModalBody>
              <p>{message}</p>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={onAccept} color="primary">
                Aceptar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AlertDialog;
