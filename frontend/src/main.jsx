import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import App from "./App";

import Accueil from "./pages/Accueil";
import Atelier from "./pages/Atelier";
import Bio from "./pages/Bio";
import BioManagement from "./pages/BioManagement";
import CarouselManagement from "./pages/CarouselManagement";
import Contact from "./pages/Contact";
import Diaporama from "./pages/Diaporama";
import Messages from "./pages/Messages";
import Oeuvre from "./pages/Oeuvre";
import Oeuvres from "./pages/Oeuvres";
import OeuvresManagement from "./pages/OeuvresManagement";
import Profil from "./pages/Profil";
import Projet from "./pages/Projet";
import Projets from "./pages/Projets";
import UtilisateurManagement from "./pages/UtilisateurManagement";
import Management from "./pages/Management";
import Technique from "./pages/Technique";
import Format from "./pages/Format";
// import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    element: <App />,

    children: [
      // { element: <Navbar /> },
      {
        path: "/",
        element: <Accueil />,
      },
      { path: "/diaporama", element: <Diaporama /> },
      {
        path: "/oeuvres",
        element: <Outlet />,
        children: [
          { index: true, element: <Oeuvres /> },
          {
            path: "technique",
            element: <Outlet />,
            children: [{ path: ":nomTechnique", element: <Technique /> }],
          },
          {
            path: "format",
            element: <Outlet />,
            children: [{ path: ":nomFormat", element: <Format /> }],
          },
        ],
      },
      { path: "/oeuvre/:titreOeuvre", element: <Oeuvre /> },
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
