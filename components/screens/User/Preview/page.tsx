import IUser from "@/types/user.type";
import { Image } from "@nextui-org/react";

interface IPreview {
  user: IUser;
}

export default function Preview(props: IPreview) {
  return (
    <div className="text-center mb-2">
      <div className="mb-2">
        <Image
          width={240}
          isBlurred
          src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
        />
      </div>
      <div
        className={`bg-[${props.user.role.color}] w-full py-1 px-2 rounded-md`}
      >
        <span>{props.user.role.name}</span>
      </div>
    </div>
  );
}
