import React from 'react';
import styles from './BreadcrumbSection.module.scss';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

export function BreadcrumbSection({ type, category }) {
    return (
        <div className={styles.container}>
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
                        <h2>{type === 'shoes' ? `${category} ${type}` : `${type} ${category}`}</h2>
                    ) : (
                        <h2>{type}</h2>
                    )}
                </div>
            </div>
        </div>
    );
}
