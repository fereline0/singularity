"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button, Card, CardBody, Input } from "@nextui-org/react";

export default function ServerSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const onServerSearch = () => {
    const encodedSearchQuery = encodeURI(searchQuery);
    encodedSearchQuery
      ? router.push(`?query=${encodedSearchQuery}`)
      : router.push(pathname);
  };

  return (
    <Card>
      <CardBody>
        <div className="flex gap-2">
          <Input placeholder="Search" onChange={handleChange} />
          <Button color="primary" onClick={onServerSearch}>
            Search
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
