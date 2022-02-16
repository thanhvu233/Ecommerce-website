import { Button } from 'antd';
import React from 'react';
import styles from './Hero.module.scss';
import heroImg from '../../assets/images/heroimg.png';
import { Fade } from 'react-reveal';

export function Hero() {
    return (
        <div className={styles.hero}>
            {/* Hero Slogan */}
            <div className={styles.slogan}>
                {/* Hero Description */}
                <div className={styles.desc}>
                    <Fade left delay={400} duration={3000}>
                        <h1>
                            Impress The World <br />
                            With Your Outfits
                        </h1>
                    </Fade>
                    <Fade bottom delay={400} duration={3000}>
                        <p>
                            Style is something each of us already has, <br />
                            all we need to do is find it.
                        </p>
                    </Fade>
                </div>

                {/* explore Button */}
                <div className={styles.btn}>
                    <Fade delay={500} duration={3000}>
                        <Button type='primary' shape='round' size='large'>
                            Explore Now
                        </Button>
                    </Fade>
                </div>
            </div>

            {/* Hero Image */}
            <div className={styles.image}>
                <Fade delay={600} duration={3000}>
                    <img src={heroImg} alt='Hero Image' />
                </Fade>
            </div>
        </div>
    );
}
