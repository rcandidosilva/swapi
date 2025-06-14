import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Col, Row, Card } from 'reactstrap'
import { TextFormat, Translate } from 'react-jhipster'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { APP_DATE_FORMAT } from 'app/config/constants'
import { useAppDispatch, useAppSelector } from 'app/config/store'

import { getEntity } from './vehicle.reducer'

export const VehicleDetail = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams<'id'>()

  useEffect(() => {
    dispatch(getEntity(id))
  }, [])

  const vehicleEntity = useAppSelector(state => state.vehicle.entity)
  return (
    <Card className="jh-card">
      <Row>
        <Col md="8">
          <h2 data-cy="vehicleDetailsHeading">
            <Translate contentKey="swapiApiApp.vehicle.detail.title">Vehicle</Translate>
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="id">
                <Translate contentKey="swapiApiApp.vehicle.id">Id</Translate>
              </span>
            </dt>
            <dd>{vehicleEntity.id}</dd>
            <dt>
              <span id="created">
                <Translate contentKey="swapiApiApp.vehicle.created">Created</Translate>
              </span>
            </dt>
            <dd>{vehicleEntity.created ? <TextFormat value={vehicleEntity.created} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
            <dt>
              <span id="edited">
                <Translate contentKey="swapiApiApp.vehicle.edited">Edited</Translate>
              </span>
            </dt>
            <dd>{vehicleEntity.edited ? <TextFormat value={vehicleEntity.edited} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="swapiApiApp.vehicle.name">Name</Translate>
              </span>
            </dt>
            <dd>{vehicleEntity.name}</dd>
            <dt>
              <span id="model">
                <Translate contentKey="swapiApiApp.vehicle.model">Model</Translate>
              </span>
            </dt>
            <dd>{vehicleEntity.model}</dd>
            <dt>
              <span id="manufacturer">
                <Translate contentKey="swapiApiApp.vehicle.manufacturer">Manufacturer</Translate>
              </span>
            </dt>
            <dd>{vehicleEntity.manufacturer}</dd>
            <dt>
              <span id="costInCredits">
                <Translate contentKey="swapiApiApp.vehicle.costInCredits">Cost In Credits</Translate>
              </span>
            </dt>
            <dd>{vehicleEntity.costInCredits}</dd>
            <dt>
              <span id="length">
                <Translate contentKey="swapiApiApp.vehicle.length">Length</Translate>
              </span>
            </dt>
            <dd>{vehicleEntity.length}</dd>
            <dt>
              <span id="maxAtmospheringSpeed">
                <Translate contentKey="swapiApiApp.vehicle.maxAtmospheringSpeed">Max Atmosphering Speed</Translate>
              </span>
            </dt>
            <dd>{vehicleEntity.maxAtmospheringSpeed}</dd>
            <dt>
              <span id="crew">
                <Translate contentKey="swapiApiApp.vehicle.crew">Crew</Translate>
              </span>
            </dt>
            <dd>{vehicleEntity.crew}</dd>
            <dt>
              <span id="passengers">
                <Translate contentKey="swapiApiApp.vehicle.passengers">Passengers</Translate>
              </span>
            </dt>
            <dd>{vehicleEntity.passengers}</dd>
            <dt>
              <span id="cargoCapacity">
                <Translate contentKey="swapiApiApp.vehicle.cargoCapacity">Cargo Capacity</Translate>
              </span>
            </dt>
            <dd>{vehicleEntity.cargoCapacity}</dd>
            <dt>
              <span id="consumables">
                <Translate contentKey="swapiApiApp.vehicle.consumables">Consumables</Translate>
              </span>
            </dt>
            <dd>{vehicleEntity.consumables}</dd>
            <dt>
              <span id="vehicleClass">
                <Translate contentKey="swapiApiApp.vehicle.vehicleClass">Vehicle Class</Translate>
              </span>
            </dt>
            <dd>{vehicleEntity.vehicleClass}</dd>
          </dl>
          <Button tag={Link} to="/vehicle" replace className="rounded-pill" color="info" data-cy="entityDetailsBackButton">
            <span className="d-none d-md-inline">
              BACK TO SEARCH              
            </span>
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default VehicleDetail
