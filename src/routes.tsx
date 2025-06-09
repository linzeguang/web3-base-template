import { lazy } from 'react'

import { createBrowserRouter, Navigate } from 'react-router'

export enum RoutePath {
  Root = '/',
  Swap = '/swap'
}

export const router = createBrowserRouter([
  {
    path: RoutePath.Root,
    // Component: RootLayout
    children: [
      {
        index: true,
        Component: () => <Navigate to={RoutePath.Swap} replace />
      },
      {
        path: RoutePath.Swap,
        Component: lazy(() => import('@/pages/swap'))
      }
    ]
  }
])
