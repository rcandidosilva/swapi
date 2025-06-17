import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Col, Row, Card } from 'reactstrap'
import { TextFormat, Translate } from 'react-jhipster'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants'
import { useAppDispatch, useAppSelector } from 'app/config/store'

import { getEntity } from './film.reducer'

export const FilmDetail = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams<'id'>()

  useEffect(() => {
    dispatch(getEntity(id))
  }, [])

  const filmEntity = useAppSelector(state => state.film.entity)
  return (
    <Card className="jh-card">
      <Row className='mt-2'>
        <Col md="12">
          <h2 data-cy="filmDetailsHeading">
            {filmEntity.title}
          </h2>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col md="12">
          <h5 data-cy="filmDetailsHeading">
            Details
          </h5>
          <hr className="hr" />
        </Col>
      </Row>
      <Row className='mb-5'>
        <Col md="12">
          <table>
            <tr>
              <td>Episode Id: {filmEntity.episode_id}</td> 
            </tr>
            <tr>
              <td>Opening Crawl: {filmEntity.opening_crawl}</td> 
            </tr>
            <tr>
              <td>Director: {filmEntity.director}</td> 
            </tr>
            <tr>
              <td>Producer: {filmEntity.producer}</td> 
            </tr>
            <tr>
              <td>Release Date: {filmEntity.release_date ? <TextFormat value={filmEntity.release_date} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</td> 
            </tr>
          </table>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col md="12">
          <Button tag={Link} to="/film" replace className="rounded-pill" color="info" data-cy="entityDetailsBackButton">
            <span className="d-none d-md-inline">
              BACK TO SEARCH              
            </span>
          </Button>          
        </Col>
      </Row>
    </Card>
  )
}

export default FilmDetail
