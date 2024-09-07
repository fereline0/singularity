"use client";

import { Editor } from "@tiptap/react";
import { TbH1, TbH2, TbH3, TbH4, TbH5, TbH6 } from "react-icons/tb";
import { IoCode } from "react-icons/io5";
import {
  MdAddLink,
  MdFormatQuote,
  MdOutlineFormatListBulleted,
  MdOutlineFormatListNumbered,
} from "react-icons/md";
import {
  CiTextAlignCenter,
  CiTextAlignJustify,
  CiTextAlignLeft,
  CiTextAlignRight,
} from "react-icons/ci";
import { Button } from "@nextui-org/button";
import { Card, CardBody, Input, useDisclosure } from "@nextui-org/react";
import Dialog from "@/components/shared/Dialog/page";
import { useState } from "react";

interface IActions {
  editor: Editor;
}

export default function Actions(props: IActions) {
  const [url, setUrl] = useState("");

  const {
    isOpen: isOpenSetLinkModal,
    onOpen: onOpenSetLinkModal,
    onOpenChange: onOpenChangeSetLinkModal,
  } = useDisclosure();

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const addLink = () => {
    onOpenChangeSetLinkModal();

    if (url === null) {
      return;
    }

    if (url === "") {
      props.editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    props.editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  };

  interface IItem {
    action: React.MouseEventHandler<HTMLButtonElement>;
    icon: React.ReactNode;
  }

  const items: IItem[] = [
    {
      action: () =>
        props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
      icon: <TbH1 size={20} />,
    },
    {
      action: () =>
        props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
      icon: <TbH2 size={20} />,
    },
    {
      action: () =>
        props.editor.chain().focus().toggleHeading({ level: 3 }).run(),
      icon: <TbH3 size={20} />,
    },
    {
      action: () =>
        props.editor.chain().focus().toggleHeading({ level: 4 }).run(),
      icon: <TbH4 size={20} />,
    },
    {
      action: () =>
        props.editor.chain().focus().toggleHeading({ level: 5 }).run(),
      icon: <TbH5 size={20} />,
    },
    {
      action: () =>
        props.editor.chain().focus().toggleHeading({ level: 6 }).run(),
      icon: <TbH6 size={20} />,
    },
    {
      action: () => props.editor.chain().focus().toggleCodeBlock().run(),
      icon: <IoCode size={20} />,
    },
    {
      action: () => props.editor.chain().focus().toggleBlockquote().run(),
      icon: <MdFormatQuote size={20} />,
    },
    {
      action: () => props.editor.chain().focus().setTextAlign("left").run(),
      icon: <CiTextAlignLeft size={20} />,
    },
    {
      action: () => props.editor.chain().focus().setTextAlign("center").run(),
      icon: <CiTextAlignCenter size={20} />,
    },
    {
      action: () => props.editor.chain().focus().setTextAlign("right").run(),
      icon: <CiTextAlignRight size={20} />,
    },
    {
      action: () => props.editor.chain().focus().setTextAlign("justify").run(),
      icon: <CiTextAlignJustify size={20} />,
    },
    {
      action: onOpenSetLinkModal,
      icon: <MdAddLink size={20} />,
    },
    {
      action: () => props.editor.chain().focus().toggleBulletList().run(),
      icon: <MdOutlineFormatListBulleted size={20} />,
    },
    {
      action: () => props.editor.chain().focus().toggleOrderedList().run(),
      icon: <MdOutlineFormatListNumbered size={20} />,
    },
  ];

  return (
    <>
      <Card>
        <CardBody>
          <div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(40px,1fr))]">
            {items.map((item, index) => (
              <Button
                variant="light"
                key={index}
                onClick={item.action}
                isIconOnly
              >
                {item.icon}
              </Button>
            ))}
          </div>
        </CardBody>
      </Card>
      <Dialog
        title="Add link"
        color="primary"
        description="Enter the link to be redirected to when you click on the text you selected."
        action={addLink}
        isOpen={isOpenSetLinkModal}
        onOpenChange={onOpenChangeSetLinkModal}
      >
        <Input
          placeholder="Link"
          onChange={handleUrlChange}
          defaultValue={props.editor.getAttributes("link").href}
        />
      </Dialog>
    </>
  );
}
