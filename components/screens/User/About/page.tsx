import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { formatISO9075 } from "date-fns";

import PairsJustified from "@/components/shared/PairsJustified/page";
import IUser from "@/interfaces/user.interface";

interface IAbout {
  user: IUser;
}

export default function About(props: IAbout) {
  const detailInformation = props.user.detailInformation;

  return (
    <Card>
      <CardHeader>
        <div>
          <h1 className="text-3xl font-semibold">{props.user.name}</h1>
          <p>{props.user.detailInformation?.aboutMe}</p>
        </div>
      </CardHeader>
      {detailInformation && (
        <CardBody>
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
        </CardBody>
      )}
    </Card>
  );
}
