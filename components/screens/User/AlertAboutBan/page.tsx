import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { formatDistance } from "date-fns";

import Marginer from "@/components/shared/Marginer/page";
import PairsJustified from "@/components/shared/PairsJustified/page";
import IUserBan from "@/interfaces/userBan.interface";

interface IAlertAboutBan {
  ban: IUserBan;
}

export default function AlertAboutBan(props: IAlertAboutBan) {
  return (
    <Card>
      <CardBody>
        <Marginer y={8}>
          <p>
            This user is blocked, we do not recommend conducting transactions
            with him at the time of blocking, if the user has already deceived
            you in any way, contact support so that we can solve the problem as
            soon as possible
          </p>
          <PairsJustified
            data={[
              {
                label: "Initiator",
                value: (
                  <Link href={`/users/${props.ban.initiator.id}`}>
                    {props.ban.initiator.name}
                  </Link>
                ),
              },
              {
                label: "Reason",
                value: props.ban.reason,
              },
              {
                label: "Expires",
                value: formatDistance(props.ban.expires, new Date(), {
                  includeSeconds: true,
                  addSuffix: true,
                }),
              },
            ]}
          />
        </Marginer>
      </CardBody>
    </Card>
  );
}
