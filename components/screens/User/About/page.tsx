import PairsJustified from "@/components/shared/PairsJustified/page";
import IUser from "@/types/user.type";
import { Card, CardBody } from "@nextui-org/react";
import { formatISO9075 } from "date-fns";

interface IAbout {
  user: IUser;
}

export default function About(props: IAbout) {
  const detailInformation = props.user.detailInformation;

  return (
    <Card shadow="none" className="mb-2">
      <CardBody>
        <div className="mb-2">
          <h1 className="text-3xl">{props.user.name}</h1>
          <p>{props.user.detailInformation?.aboutMe}</p>
        </div>
        {detailInformation && (
          <PairsJustified
            data={[
              {
                label: "Occupation",
                value: detailInformation.occupation,
              },
              {
                label: "Interests",
                value: detailInformation.interests,
              },
              {
                label: "Gender",
                value: detailInformation.gender,
              },
              {
                label: "Bithday",
                value:
                  detailInformation.bithday &&
                  formatISO9075(detailInformation.bithday),
              },
            ]}
          />
        )}
      </CardBody>
    </Card>
  );
}
