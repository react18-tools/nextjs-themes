"use client";
import { HTMLProps } from "react";

export default function Logo(props: HTMLProps<HTMLElement>) {
  return <code {...props}>{location.origin.split("://")[1].split(".")[0]}</code>;
}
