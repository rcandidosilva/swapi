import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Col, Row, Card } from 'reactstrap'

import { useAppDispatch, useAppSelector } from 'app/config/store'

import { getEntity } from './person.reducer'

export const PersonDetail = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams<'id'>()

  useEffect(() => {
    dispatch(getEntity(id))
  }, [])

  const personEntity = useAppSelector(state => state.person.entity)
  return (
    <Card className="jh-card">
      <Row className='mt-2'>
        <Col md="12">
          <h2 data-cy="personDetailsHeading">
            {personEntity.name}
          </h2>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col md="12">
          <h5 data-cy="personDetailsHeading">
            Details
          </h5>
          <hr className="hr" />
        </Col>
      </Row>
      <Row className='mb-5'>
        <Col md="12">
          <table>
            <tr>
              <td>Birth Year: {personEntity.birth_year}</td> 
            </tr>
            <tr>
              <td>Gender: {personEntity.gender}</td> 
            </tr>
            <tr>
              <td>Eye Color: {personEntity.eye_color}</td> 
            </tr>
            <tr>
              <td>Hair Color: {personEntity.hair_color}</td> 
            </tr>
            <tr>
              <td>Skin Color: {personEntity.skin_color}</td> 
            </tr>
            <tr>
              <td>Height: {personEntity.height}</td> 
            </tr>
            <tr>
              <td>Mass: {personEntity.mass}</td> 
            </tr>
          </table>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col md="12">              
          <Button tag={Link} to="/person" replace className="rounded-pill" color="info" data-cy="entityDetailsBackButton">
            <span className="d-none d-md-inline">
              BACK TO SEARCH              
            </span>
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default PersonDetail
