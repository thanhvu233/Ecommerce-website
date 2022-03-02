import { Avatar, Card, Rate } from 'antd';
import React from 'react';
import { Zoom } from 'react-reveal';
import quote from '../../assets/images/quotation-marks-svgrepo-com.svg';
import { Container } from '../common';
import styles from './Comment.module.scss';

export function Comment({ comments }) {
    return (
        <Container>
            <Zoom delay={200} duration={3000}>
                <div className={styles.comment}>
                    {comments.map((comment) => (
                        <Card style={{ width: 300 }} key={comment.commentId} className={styles.card}>
                            <div>
                                <img src={quote} className={styles.icon} />
                            </div>
                            <div className={styles.detail}>{comment.detail}</div>
                            <div className={styles.rating}>
                                <Rate disabled defaultValue={comment.rating} />
                            </div>
                            <div className={styles.avatar}>
                                <Avatar src={comment.avatar} size={50} />
                                <h3>{comment.user}</h3>
                            </div>
                        </Card>
                    ))}
                </div>
            </Zoom>
        </Container>
    );
}
