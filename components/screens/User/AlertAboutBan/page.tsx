import Marginer from "@/components/shared/Marginer/page";
import PairsJustified from "@/components/shared/PairsJustified/page";
import IUserBan from "@/interfaces/userBan.interface";
import { Card, CardBody, Link } from "@nextui-org/react";
import { formatDistance } from "date-fns";

interface IAlertAboutBan {
  ban: IUserBan;
}

export default function AlertAboutBan(props: IAlertAboutBan) {
  return (
    <Card shadow="none">
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
