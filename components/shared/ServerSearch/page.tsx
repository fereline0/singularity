"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card, CardBody } from "@nextui-org/card";

import pushSearchParams from "@/utils/pushSearchParams";

export default function ServerSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get("query");
  const defaultSelected = defaultValue ?? "";
  const [searchQuery, setSearchQuery] = useState(defaultSelected);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const pushQueryParams = useCallback(
    (name: string, value: string) => {
      return pushSearchParams(searchParams, name, value, "page");
    },
    [searchParams],
  );

  const onServerSearch = () => {
    const encodedSearchQuery = encodeURI(searchQuery);

    router.push(`?${pushQueryParams("query", encodedSearchQuery)}`);
  };

  return (
    <Card>
      <CardBody>
        <div className="flex gap-2">
          <Input
            defaultValue={searchQuery}
            placeholder="Search"
            onChange={handleChange}
          />
          <Button color="primary" onClick={onServerSearch}>
            Search
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
