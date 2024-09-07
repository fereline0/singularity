"use client";

import Marginer from "@/components/shared/Marginer/page";
import { Card, CardBody } from "@nextui-org/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import { mergeAttributes } from "@tiptap/core";
import Actions from "./Actions/page";

interface ITipTap {
  setHTML?: React.Dispatch<React.SetStateAction<string>>;
  content?: string;
  readOnly?: boolean;
}

export default function TipTap(props: ITipTap) {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
    extensions: [
      StarterKit.configure({
        heading: false,
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 border-gray-300 pl-4",
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class: "bg-black text-white rounded-lg p-4 text-sm",
          },
        },
      }),
      Heading.extend({
        levels: [1, 2, 3, 4, 5, 6],
        renderHTML({ node, HTMLAttributes }) {
          const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0];
          const classes: { [index: number]: string } = {
            1: "text-2xl",
            2: "text-xl",
            3: "text-lg",
            4: "text-base",
            5: "text-sm",
            6: "text-xs",
          };
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]}`,
            }),
            0,
          ];
        },
      }).configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Link.configure({
        HTMLAttributes: {
          class:
            "relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-primary no-underline hover:opacity-80 active:opacity-disabled transition-opacity",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editable: !props.readOnly,
    content: props.content,
    onUpdate: ({ editor }) => {
      props.setHTML?.(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <Marginer y={8}>
      {!props.readOnly && <Actions editor={editor} />}
      <Card>
        <CardBody>
          <EditorContent editor={editor} />
        </CardBody>
      </Card>
    </Marginer>
  );
}
