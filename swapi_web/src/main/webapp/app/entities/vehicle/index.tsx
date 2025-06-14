import React from 'react'
import { Route } from 'react-router'

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes'

import Vehicle from './vehicle'
import VehicleDetail from './vehicle-detail'

const VehicleRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Vehicle />} />
    <Route path=":id">
      <Route index element={<VehicleDetail />} />
    </Route>
  </ErrorBoundaryRoutes>
)

export default VehicleRoutes
