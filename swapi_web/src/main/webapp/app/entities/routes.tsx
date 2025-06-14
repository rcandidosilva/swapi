import React from 'react'
import { Route } from 'react-router'

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes'

import Vehicle from './vehicle'
import Starship from './starship'
import Species from './species'
import Person from './person'
import Film from './film'
import Planet from './planet'
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="vehicle/*" element={<Vehicle />} />
        <Route path="starship/*" element={<Starship />} />
        <Route path="species/*" element={<Species />} />
        <Route path="person/*" element={<Person />} />
        <Route path="film/*" element={<Film />} />
        <Route path="planet/*" element={<Planet />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  )
}
