import React, { useEffect, MutableRefObject, RefObject } from "react";

/**
 * 무한스크롤을 위한 스크롤 감지 hooks
 * @param targetEle useRef를 사용하여 넘겨줄 Ele
 * @param callback intersetion시 실행할 함수
 * @param root intersetion 요소
 * @param rootMargin root와 targetEle이 감지하는 여백의 거리
 * @param threshold 임계점. 1.0이면 root내에서 targetEle이 100% 보여질 때 callback 실행
 */
export const useObserver = (
  targetEle: RefObject<HTMLElement>,
  callback: (...params: any) => void,
  root: HTMLElement | null = null,
  rootMargin: string = "0px",
  threshold: number = 1.0,
) => {
  useEffect(() => {
    let observer: IntersectionObserver;

    // 넘어오는 element가 있어야 observer를 생성할 수 있도록 한다.
    if (targetEle && targetEle.current) {
      observer = new IntersectionObserver(callback, {
        root,
        rootMargin,
        threshold,
      });
      // 실제 Element가 들어있는 current 관측을 시작한다.
      observer.observe(targetEle.current);
    }

    // observer를 사용하는 컴포넌트가 해제되면 observer 역시 꺼 주자.
    return () => observer && observer.disconnect();
  }, [targetEle, rootMargin, threshold]);
};
