// 모노레포: Nx, npm workspaces
// 로그인/보안
// 앱: Next.js
// 디자인시스템: Storybook
// 에러 핸들링
// 마크다운 에디터
// 애니메이션: Framer Motion
// 그래프: D3
// 로깅: Sentry
// 네트워크, 웹서버: NGINX
// 인터페이스: BFF
// 배포: GitHub Action
// 인프라: AWS...
// 상태 관리: React Query, Jotai
// CDN: CloudFront
// TypeScript: Slash 라이브러리

import { CardProps } from "../components/Card";

type CardData = CardProps;

export const CARD_ITEMS: CardData[] = [
  {
    title: "모노레포1",
    subtitle: "Nx, npm workspaces",
    progressRate: [2, 2],
    progressColor: "black",
    deadline: new Date("2024-04-29"),
    commentsCount: 2,
    filesCount: 7,
  },
  {
    title: "모노레포2",
    subtitle: "Nx, npm workspaces",
    progressRate: [2, 2],
    progressColor: "black",
    deadline: new Date("2024-05-11"),
    commentsCount: 0,
    filesCount: 0,
  },
  {
    title: "모노레포3",
    subtitle: "Nx, npm workspaces",
    progressRate: [2, 2],
    progressColor: "black",
    deadline: new Date("2024-05-30"),
    commentsCount: 0,
    filesCount: 0,
  },
  {
    title: "모노레포4",
    subtitle: "Nx, npm workspaces",
    progressRate: [2, 2],
    progressColor: "black",
    deadline: new Date("2024-05-25"),
    commentsCount: 0,
    filesCount: 0,
  },
  {
    title: "모노레포5",
    subtitle: "Nx, npm workspaces",
    progressRate: [2, 2],
    progressColor: "black",
    deadline: new Date("2024-03-15"),
    commentsCount: 0,
    filesCount: 0,
  },
  {
    title: "모노레포6",
    subtitle: "Nx, npm workspaces",
    progressRate: [2, 2],
    progressColor: "black",
    deadline: new Date("2024-04-15"),
    commentsCount: 0,
    filesCount: 0,
  },
  {
    title: "모노레포7",
    subtitle: "Nx, npm workspaces",
    progressRate: [2, 2],
    progressColor: "black",
    deadline: new Date("2024-05-18"),
    commentsCount: 0,
    filesCount: 0,
  },
  {
    title: "모노레포8",
    subtitle: "Nx, npm workspaces",
    progressRate: [2, 2],
    progressColor: "black",
    commentsCount: 0,
    filesCount: 0,
  },
];
