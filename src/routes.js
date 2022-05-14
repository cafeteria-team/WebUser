import { Navigate, useRoutes } from "react-router-dom";
import {
  MainContainer,
  MainPage,
  StorePage,
  LikePage,
  NotFoundPage,
  NoticeDetail,
  NoticeListPage,
  ServicePage,
} from "./pages";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <MainContainer />,
      children: [
        { path: "/", element: <MainPage /> },
        { path: "detail", element: <StorePage /> },
        { path: "like", element: <LikePage /> },
        { path: "notice", element: <NoticeListPage /> },
        { path: "notice/:id", element: <NoticeDetail /> },
        { path: "service", element: <ServicePage /> },
        { path: "404", element: <NotFoundPage /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
  ]);
};

export default Router;
