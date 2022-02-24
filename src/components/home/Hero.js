import { Button } from 'antd';
import React from 'react';
import { Fade, Rotate, Zoom } from 'react-reveal';
import styles from './Hero.module.scss';
import Tada from 'react-reveal/Tada';
import { Link } from 'react-router-dom';

export function Hero({ imgPosition, title, desc, image }) {
    return (
        <div className={imgPosition == 'right' ? styles.hero : styles.hero2}>
            {/* Hero Slogan */}
            <div className={styles.slogan}>
                {/* Hero Description */}
                <div className={styles.desc}>
                    {imgPosition == 'right' ? (
                        <Fade left delay={100} duration={3000}>
                            <h1>{title}</h1>
                        </Fade>
                    ) : (
                        <Fade right delay={100} duration={3000}>
                            <h1>{title}</h1>
                        </Fade>
                    )}

                    <Fade bottom delay={100} duration={3000}>
                        <p>{desc}</p>
                    </Fade>
                </div>

                {/* Button */}
                {imgPosition == 'right' ? (
                    <div className={styles.btn}>
                        <Fade delay={1000}>
                            <Link to='./products/men'>
                                <Button type='primary' shape='round' size='large'>
                                    Explore Now
                                </Button>
                            </Link>
                        </Fade>
                    </div>
                ) : (
                    <div className={styles.btn}>
                        <Fade delay={500}>
                            <Link to='./products/detail/2e5b5a37-6e52-4263-87d4-c8c84aab8cb8'>
                                <Button type='primary' shape='round' size='large'>
                                    Buy Now
                                </Button>
                            </Link>
                        </Fade>
                    </div>
                )}
            </div>

            {/* Hero Image */}
            <div className={imgPosition == 'right' ? styles.image : styles.image2}>
                <Zoom delay={200} duration={3000}>
                    <img src={image} alt='Hero Image' />
                </Zoom>
            </div>
        </div>
    );
}
