import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Badge, Button, Row } from 'reactstrap'
import { TextFormat, Translate } from 'react-jhipster'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { APP_DATE_FORMAT } from 'app/config/constants'
import { languages } from 'app/config/translation'
import { useAppDispatch, useAppSelector } from 'app/config/store'
import { getUser } from './user-management.reducer'

export const UserManagementDetail = () => {
  const dispatch = useAppDispatch()

  const { login } = useParams<'login'>()

  useEffect(() => {
    dispatch(getUser(login))
  }, [])

  const user = useAppSelector(state => state.userManagement.user)

  return (
    <div>
      <h2>
        <Translate contentKey="userManagement.detail.title">User</Translate> [<strong>{user.login}</strong>]
      </h2>
      <Row size="md">
        <dl className="jh-entity-details">
          <dt>
            <Translate contentKey="userManagement.login">Login</Translate>
          </dt>
          <dd>
            <span>{user.login}</span>&nbsp;
            {user.activated ? (
              <Badge color="success">
                <Translate contentKey="userManagement.activated">Activated</Translate>
              </Badge>
            ) : (
              <Badge color="danger">
                <Translate contentKey="userManagement.deactivated">Deactivated</Translate>
              </Badge>
            )}
          </dd>
          <dt>
            <Translate contentKey="userManagement.firstName">First Name</Translate>
          </dt>
          <dd>{user.firstName}</dd>
          <dt>
            <Translate contentKey="userManagement.lastName">Last Name</Translate>
          </dt>
          <dd>{user.lastName}</dd>
          <dt>
            <Translate contentKey="userManagement.email">Email</Translate>
          </dt>
          <dd>{user.email}</dd>
          <dt>
            <Translate contentKey="userManagement.langKey">Lang Key</Translate>
          </dt>
          <dd>{user.langKey ? languages[user.langKey].name : undefined}</dd>
          <dt>
            <Translate contentKey="userManagement.createdBy">Created By</Translate>
          </dt>
          <dd>{user.createdBy}</dd>
          <dt>
            <Translate contentKey="userManagement.createdDate">Created Date</Translate>
          </dt>
          <dd>{user.createdDate ? <TextFormat value={user.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /> : null}</dd>
          <dt>
            <Translate contentKey="userManagement.lastModifiedBy">Last Modified By</Translate>
          </dt>
          <dd>{user.lastModifiedBy}</dd>
          <dt>
            <Translate contentKey="userManagement.lastModifiedDate">Last Modified Date</Translate>
          </dt>
          <dd>
            {user.lastModifiedDate ? (
              <TextFormat value={user.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="userManagement.profiles">Profiles</Translate>
          </dt>
          <dd>
            <ul className="list-unstyled">
              {user.authorities
                ? user.authorities.map((authority, i) => (
                    <li key={`user-auth-${i}`}>
                      <Badge color="info">{authority}</Badge>
                    </li>
                  ))
                : null}
            </ul>
          </dd>
        </dl>
      </Row>
      <Button tag={Link} to="/admin/user-management" replace color="info">
        <FontAwesomeIcon icon="arrow-left" />{' '}
        <span className="d-none d-md-inline">
          <Translate contentKey="entity.action.back">Back</Translate>
        </span>
      </Button>
    </div>
  )
}

export default UserManagementDetail
