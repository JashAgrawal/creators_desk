import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FOLDER, useRoot } from "@/contexts/root";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function BreadcrumbDemo({ currentFolder }: { currentFolder: FOLDER }) {
  const [loading, setLoading] = useState(true);
  const { ROOT_FOLDER } = useRoot();
  const [cfolder, setCFolder] = useState(ROOT_FOLDER);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentFolder) {
      setCFolder(currentFolder);
      setLoading(false);
    }
  }, [currentFolder]);
  if (loading) return <p>Loading</p>;
  return (
    <Breadcrumb>
      {cfolder.path &&
      Array.isArray(cfolder.path) &&
      cfolder.path.length > 0 ? (
        <>
          {cfolder.path.length > 3 ? (
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/files`}>Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {cfolder.path
                      .slice(1, cfolder.path.length - 2)
                      .map((folder, idx) => (
                        <React.Fragment>
                          <DropdownMenuItem
                            key={idx}
                            className={"cursor-pointer hover:bg-indigo-300"}
                            onClick={() => navigate(`/files/${folder.id}`)}
                          >
                            <BreadcrumbLink
                              href={`/files/${folder.id}`}
                              className="text-center"
                            >
                              {cfolder.name}
                            </BreadcrumbLink>
                          </DropdownMenuItem>
                          {idx !== cfolder.path.length - 4 && (
                            <DropdownMenuSeparator className="border mx-1" />
                          )}
                        </React.Fragment>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              {cfolder.path
                .slice(cfolder.path.length - 2)
                .map((folder, idx) => (
                  <React.Fragment key={idx}>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={`/files/${folder.id}`}>
                        {folder.name}
                      </BreadcrumbLink>
                    </BreadcrumbItem>

                    {idx !== cfolder.path.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              {/* <BreadcrumbSeparator /> */}
              <BreadcrumbItem>
                <BreadcrumbLink href={`/files/${cfolder.id}`}>
                  {cfolder.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          ) : (
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/files">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {cfolder.path.map((folder, idx) => (
                <React.Fragment key={idx}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/files/${folder.id}`}>
                      {folder.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  {idx !== cfolder.path.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/files/${cfolder.id}`}>
                  {cfolder.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          )}
        </>
      ) : (
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/files">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {cfolder.id !== ROOT_FOLDER.id && <BreadcrumbSeparator />}
          {cfolder.id !== ROOT_FOLDER.id && (
            <BreadcrumbItem>
              <BreadcrumbLink href={`/files/${cfolder?.id}`}>
                {cfolder.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      )}
    </Breadcrumb>
  );
}
