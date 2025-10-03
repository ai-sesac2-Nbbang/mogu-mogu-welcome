"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, PropsWithChildren } from "react";
import { useTransitionOverlay } from "../transition/TransitionProvider";

/**
 * Link 대체: 클릭 순간 전환 오버레이를 켠 뒤 라우팅.
 * 기본 a 동작/접근성은 그대로 유지.
 */
export default function SmoothLink({
  href,
  children,
  prefetch,
  ...rest
}: PropsWithChildren<LinkProps & React.ComponentProps<"a">>) {
  const router = useRouter();
  const { start } = useTransitionOverlay();

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return; // 새 탭/특수 클릭 무시
    e.preventDefault();
    start();            // 전환 시작(오버레이 표시)
    router.push(href.toString());
  };

  return (
    <Link href={href} prefetch={prefetch} {...rest} onClick={onClick}>
      {children}
    </Link>
  );
}
