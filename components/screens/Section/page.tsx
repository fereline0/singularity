import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";

import ISection from "@/interfaces/section.interface";

interface Section {
  section: ISection;
}

export default function Section(props: Section) {
  return (
    <Card isPressable as={Link} href={`/${props.section.id}`}>
      <CardBody>{props.section.name}</CardBody>
    </Card>
  );
}
