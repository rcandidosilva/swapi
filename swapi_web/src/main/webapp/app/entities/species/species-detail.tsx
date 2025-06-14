import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Col, Row, Card } from 'reactstrap'
import { TextFormat, Translate } from 'react-jhipster'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { APP_DATE_FORMAT } from 'app/config/constants'
import { useAppDispatch, useAppSelector } from 'app/config/store'

import { getEntity } from './species.reducer'

export const SpeciesDetail = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams<'id'>()

  useEffect(() => {
    dispatch(getEntity(id))
  }, [])

  const speciesEntity = useAppSelector(state => state.species.entity)
  return (
    <Card className="jh-card">
      <Row>
        <Col md="8">
          <h2 data-cy="speciesDetailsHeading">
            <Translate contentKey="swapiApiApp.species.detail.title">Species</Translate>
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="id">
                <Translate contentKey="swapiApiApp.species.id">Id</Translate>
              </span>
            </dt>
            <dd>{speciesEntity.id}</dd>
            <dt>
              <span id="created">
                <Translate contentKey="swapiApiApp.species.created">Created</Translate>
              </span>
            </dt>
            <dd>{speciesEntity.created ? <TextFormat value={speciesEntity.created} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
            <dt>
              <span id="edited">
                <Translate contentKey="swapiApiApp.species.edited">Edited</Translate>
              </span>
            </dt>
            <dd>{speciesEntity.edited ? <TextFormat value={speciesEntity.edited} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="swapiApiApp.species.name">Name</Translate>
              </span>
            </dt>
            <dd>{speciesEntity.name}</dd>
            <dt>
              <span id="classification">
                <Translate contentKey="swapiApiApp.species.classification">Classification</Translate>
              </span>
            </dt>
            <dd>{speciesEntity.classification}</dd>
            <dt>
              <span id="designation">
                <Translate contentKey="swapiApiApp.species.designation">Designation</Translate>
              </span>
            </dt>
            <dd>{speciesEntity.designation}</dd>
            <dt>
              <span id="averageHeight">
                <Translate contentKey="swapiApiApp.species.averageHeight">Average Height</Translate>
              </span>
            </dt>
            <dd>{speciesEntity.averageHeight}</dd>
            <dt>
              <span id="skinColors">
                <Translate contentKey="swapiApiApp.species.skinColors">Skin Colors</Translate>
              </span>
            </dt>
            <dd>{speciesEntity.skinColors}</dd>
            <dt>
              <span id="hairColors">
                <Translate contentKey="swapiApiApp.species.hairColors">Hair Colors</Translate>
              </span>
            </dt>
            <dd>{speciesEntity.hairColors}</dd>
            <dt>
              <span id="eyeColors">
                <Translate contentKey="swapiApiApp.species.eyeColors">Eye Colors</Translate>
              </span>
            </dt>
            <dd>{speciesEntity.eyeColors}</dd>
            <dt>
              <span id="averageLifespan">
                <Translate contentKey="swapiApiApp.species.averageLifespan">Average Lifespan</Translate>
              </span>
            </dt>
            <dd>{speciesEntity.averageLifespan}</dd>
            <dt>
              <span id="languages">
                <Translate contentKey="swapiApiApp.species.languages">Languages</Translate>
              </span>
            </dt>
            <dd>{speciesEntity.languages}</dd>
            <dt>
              <Translate contentKey="swapiApiApp.species.homeworld">Homeworld</Translate>
            </dt>
            <dd>{speciesEntity.homeworld ? speciesEntity.homeworld.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/species" replace className="rounded-pill" color="info" data-cy="entityDetailsBackButton">
            <span className="d-none d-md-inline">
              BACK TO SEARCH              
            </span>
          </Button>        
        </Col>
      </Row>
    </Card>
  )
}

export default SpeciesDetail
