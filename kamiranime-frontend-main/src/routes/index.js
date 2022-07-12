import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// layouts
import MainLayout from "../layouts/main";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
// guards
// components
import LoadingScreen from "../components/LoadingScreen";



const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes("/dashboard");

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: "fixed",
            }),
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "*",
      element: <LogoOnlyLayout />,
      children: [
        { path: "coming-soon", element: <ComingSoon /> },
        { path: "maintenance", element: <Maintenance /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {path: '', element: <Home />},
        {path: 'carrito', element: <Cart />},
        {path: 'favoritos', element: <Favorites />},
        {path: 'contactanos', element: <ContactUs />},
        {path: 'preguntas-frecuentes', element: <Questions />},
      ]
    },
    {
      path: 'categorias',
      element: <MainLayout />,
      children: [
        {path: ':category', element: <ProductSearch />},
        {path: ':category/:slug', element: <ProductDetail />},
      ]
    },
  ])
}

const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const NotFound = Loadable(lazy(() => import('../pages/NotFound')));

const Home = Loadable(lazy(() => import('../pages/Home')));
const Questions = Loadable(lazy(() => import('../pages/Questions')));
const Cart = Loadable(lazy(() => import('../pages/Cart')));
const Favorites = Loadable(lazy(() => import('../pages/Favorites')));
const ProductSearch = Loadable(lazy(() => import('../pages/products')));
const ProductDetail = Loadable(lazy(() => import('../pages/products/Detail')));
const ContactUs = Loadable(lazy(() => import('../pages/ContactUs')));


