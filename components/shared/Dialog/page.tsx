import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  VariantProps,
} from "@nextui-org/react";

import Marginer from "../Marginer/page";

interface IDialog<T> {
  title: string;
  description: string;
  action: () => Promise<void | T> | void;
  isOpen: boolean;
  onOpenChange: () => void;
  color?: VariantProps<typeof Button>["color"];
  submitText?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
}

export default function Dialog<T>(props: IDialog<T>) {
  const handleSubmit = async () => {
    const action = props.action();

    if (action instanceof Promise) {
      await action;
    }
  };

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
                color={props.color}
                isLoading={props.isLoading}
                onClick={async () => await handleSubmit()}
              >
                {props.submitText ?? props.title}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
