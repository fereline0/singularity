import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { VariantProps } from "@nextui-org/react";

import Marginer from "../Marginer/page";

interface IDialog {
  title: string;
  description: string;
  actions: VariantProps<typeof Button>[];
  isOpen: boolean;
  onOpenChange: () => void;
  children?: React.ReactNode;
}

export default function Dialog(props: IDialog) {
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
              {props.actions.map(({ key, ...action }) => (
                <Button key={key} {...action} />
              ))}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
