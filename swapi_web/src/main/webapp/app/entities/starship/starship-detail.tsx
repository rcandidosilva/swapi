import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Col, Row, Card } from 'reactstrap'
import { TextFormat, Translate } from 'react-jhipster'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { APP_DATE_FORMAT } from 'app/config/constants'
import { useAppDispatch, useAppSelector } from 'app/config/store'

import { getEntity } from './starship.reducer'

export const StarshipDetail = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams<'id'>()

  useEffect(() => {
    dispatch(getEntity(id))
  }, [])

  const starshipEntity = useAppSelector(state => state.starship.entity)
  return (
    <Card className="jh-card">
      <Row>
        <Col md="8">
          <h2 data-cy="starshipDetailsHeading">
            <Translate contentKey="swapiApiApp.starship.detail.title">Starship</Translate>
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="id">
                <Translate contentKey="swapiApiApp.starship.id">Id</Translate>
              </span>
            </dt>
            <dd>{starshipEntity.id}</dd>
            <dt>
              <span id="created">
                <Translate contentKey="swapiApiApp.starship.created">Created</Translate>
              </span>
            </dt>
            <dd>{starshipEntity.created ? <TextFormat value={starshipEntity.created} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
            <dt>
              <span id="edited">
                <Translate contentKey="swapiApiApp.starship.edited">Edited</Translate>
              </span>
            </dt>
            <dd>{starshipEntity.edited ? <TextFormat value={starshipEntity.edited} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="swapiApiApp.starship.name">Name</Translate>
              </span>
            </dt>
            <dd>{starshipEntity.name}</dd>
            <dt>
              <span id="model">
                <Translate contentKey="swapiApiApp.starship.model">Model</Translate>
              </span>
            </dt>
            <dd>{starshipEntity.model}</dd>
            <dt>
              <span id="manufacturer">
                <Translate contentKey="swapiApiApp.starship.manufacturer">Manufacturer</Translate>
              </span>
            </dt>
            <dd>{starshipEntity.manufacturer}</dd>
            <dt>
              <span id="costInCredits">
                <Translate contentKey="swapiApiApp.starship.costInCredits">Cost In Credits</Translate>
              </span>
            </dt>
            <dd>{starshipEntity.costInCredits}</dd>
            <dt>
              <span id="length">
                <Translate contentKey="swapiApiApp.starship.length">Length</Translate>
              </span>
            </dt>
            <dd>{starshipEntity.length}</dd>
            <dt>
              <span id="maxAtmospheringSpeed">
                <Translate contentKey="swapiApiApp.starship.maxAtmospheringSpeed">Max Atmosphering Speed</Translate>
              </span>
            </dt>
            <dd>{starshipEntity.maxAtmospheringSpeed}</dd>
            <dt>
              <span id="crew">
                <Translate contentKey="swapiApiApp.starship.crew">Crew</Translate>
              </span>
            </dt>
            <dd>{starshipEntity.crew}</dd>
            <dt>
              <span id="passengers">
                <Translate contentKey="swapiApiApp.starship.passengers">Passengers</Translate>
              </span>
            </dt>
            <dd>{starshipEntity.passengers}</dd>
            <dt>
              <span id="cargoCapacity">
                <Translate contentKey="swapiApiApp.starship.cargoCapacity">Cargo Capacity</Translate>
              </span>
            </dt>
            <dd>{starshipEntity.cargoCapacity}</dd>
            <dt>
              <span id="consumables">
                <Translate contentKey="swapiApiApp.starship.consumables">Consumables</Translate>
              </span>
            </dt>
            <dd>{starshipEntity.consumables}</dd>
            <dt>
              <span id="hyperdriveRating">
                <Translate contentKey="swapiApiApp.starship.hyperdriveRating">Hyperdrive Rating</Translate>
              </span>
            </dt>
            <dd>{starshipEntity.hyperdriveRating}</dd>
            <dt>
              <span id="mglt">
                <Translate contentKey="swapiApiApp.starship.mglt">Mglt</Translate>
              </span>
            </dt>
            <dd>{starshipEntity.mglt}</dd>
            <dt>
              <span id="startshipClass">
                <Translate contentKey="swapiApiApp.starship.startshipClass">Startship Class</Translate>
              </span>
            </dt>
            <dd>{starshipEntity.startshipClass}</dd>
          </dl>
          <Button tag={Link} to="/starship" replace className="rounded-pill" color="info" data-cy="entityDetailsBackButton">
            <span className="d-none d-md-inline">
              BACK TO SEARCH              
            </span>
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default StarshipDetail
