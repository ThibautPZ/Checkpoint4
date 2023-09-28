import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import App from "./App";
// import {
//   Accueil,
//   Acrylique,
//   Aquarelle,
//   Atelier,
//   Bio,
//   BioManagement,
//   CarouselManagement,
//   Contact,
//   Crayon,
//   Huile,
//   Maxis,
//   Messages,
//   Minis,
//   Oeuvre,
//   Oeuvres,
//   OeuvresManagement,
//   Profil,
//   Projet,
//   Projets,
//   Tableaux,
//   UtilisateurManagement,
//   Management,
// } from "./pages";
import Accueil from "./pages/Accueil";
import Acrylique from "./pages/Acrylique";
import Aquarelle from "./pages/Aquarelle";
import Atelier from "./pages/Atelier";
import Bio from "./pages/Bio";
import BioManagement from "./pages/BioManagement";
import CarouselManagement from "./pages/CarouselManagement";
import Contact from "./pages/Contact";
import Crayon from "./pages/Crayon";
import Huile from "./pages/Huile";
import Maxis from "./pages/Maxis";
import Messages from "./pages/Messages";
import Minis from "./pages/Minis";
import Oeuvre from "./pages/Oeuvre";
import Oeuvres from "./pages/Oeuvres";
import OeuvresManagement from "./pages/OeuvresManagement";
import Profil from "./pages/Profil";
import Projet from "./pages/Projet";
import Projets from "./pages/Projets";
import Tableaux from "./pages/Tableaux";
import UtilisateurManagement from "./pages/UtilisateurManagement";
import Management from "./pages/Management";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Accueil />,
      },
      {
        path: "/oeuvres",
        element: <Outlet />,
        children: [
          { index: true, element: <Oeuvres /> },
          { path: "acrylique", element: <Acrylique /> },
          { path: "huile", element: <Huile /> },
          {
            path: "aquarelle",
            element: <Aquarelle />,
          },
          { path: "crayon", element: <Crayon /> },
          { path: "minis", element: <Minis /> },
          { path: "tableaux", element: <Tableaux /> },
          { path: "maxis", element: <Maxis /> },
        ],
      },
      { path: "/oeuvre/:id", element: <Oeuvre /> },
      { path: "/projets", element: <Projets /> },
      { path: "/projet/:id", element: <Projet /> },
      { path: "/atelier", element: <Atelier /> },
      { path: "/bio", element: <Bio /> },
      { path: "/contact", element: <Contact /> },
      { path: "/messages", element: <Messages /> },
      { path: "/profil", element: <Profil /> },
      {
        path: "/management",
        element: <Outlet />,
        children: [
          { index: true, element: <Management /> },
          { path: "oeuvres", element: <OeuvresManagement /> },
          { path: "bio", element: <BioManagement /> },
          { path: "carousel", element: <CarouselManagement /> },
          { path: "utilisateurs", element: <UtilisateurManagement /> },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
