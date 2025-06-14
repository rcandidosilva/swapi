import React from 'react'
import { Translate } from 'react-jhipster'

import MenuItem from 'app/shared/layout/menus/menu-item'

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/vehicle">
        <Translate contentKey="global.menu.entities.vehicle" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/starship">
        <Translate contentKey="global.menu.entities.starship" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/species">
        <Translate contentKey="global.menu.entities.species" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/person">
        <Translate contentKey="global.menu.entities.person" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/film">
        <Translate contentKey="global.menu.entities.film" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/planet">
        <Translate contentKey="global.menu.entities.planet" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  )
}

export default EntitiesMenu
