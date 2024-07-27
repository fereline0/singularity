import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface IDialog<T> {
  title: string;
  description: string;
  action: () => Promise<void | T> | void;
  isLoading: boolean;
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function Dialog<T>(props: IDialog<T>) {
  return (
    <Modal
      backdrop="blur"
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{props.title}</ModalHeader>
            <ModalBody>
              <p>{props.description}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={onClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                onClick={async () => {
                  await props.action();
                  onClose();
                }}
                isLoading={props.isLoading}
              >
                {props.title}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
