import { Breadcrumb } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../common';
import styles from './BreadcrumbSection.module.scss';

export function BreadcrumbSection({ type, category }) {
  return (
    <Container>
      <div className={styles.breadcrumb}>
        <div className={styles.navigate}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/'>Home</Link>
            </Breadcrumb.Item>
            {category ? (
              <>
                <Breadcrumb.Item>
                  <Link to={`/products/${type}`}>{type}</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{category}</Breadcrumb.Item>
              </>
            ) : (
              <>
                <Breadcrumb.Item>{type}</Breadcrumb.Item>
              </>
            )}
          </Breadcrumb>
        </div>

        <div className={styles.heading}>
          {category ? (
            <h2>
              {type === 'shoes' ? `${category} ${type}` : `${type} ${category}`}
            </h2>
          ) : (
            <h2>{type}</h2>
          )}
        </div>
      </div>
    </Container>
  );
}
