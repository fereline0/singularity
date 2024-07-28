import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Marginer from "../Marginer/page";

interface IDialog<T> {
  title: string;
  description: string;
  action: () => Promise<void | T> | void;
  isOpen: boolean;
  onOpenChange: () => void;
  isLoading?: boolean;
  children?: React.ReactNode;
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
              <Marginer y={8}>
                <p>{props.description}</p>
                {props.children}
              </Marginer>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={onClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                onClick={async () => await props.action()}
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
