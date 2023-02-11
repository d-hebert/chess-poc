import React, { useEffect, useState } from 'react';
import { getPlayer, getStatus } from '../../backend-stuff/lichessInterface';
import { useParams } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { FaVideo } from 'react-icons/fa';
import { RiCheckboxBlankCircleFill, RiCheckboxBlankCircleLine } from 'react-icons/ri';
import CountUp from '../CountUp';
import './Card.css';

const DEFAULT_STATE = {
    username: "username123",
    title: "n/a",
    url: 'https://lichess.org/',
    perfs: {
        bullet: {
            rating: 1234,
        },
        blitz: {
            rating: 2345,
        },
        classical: {
            rating: 3456,
        },
        rapid: {
            rating: 9999,
        },
    },
    count: {
        all: 83438,
    },
    id: 'username123',
};

const DEFAULT_STATUS = {
    online: false,
    playing: false,
};

const DEFAULT_CATS = ['bullet', 'blitz', 'classical', 'rapid'];

export const Card = () => {
    const { username } = useParams();
    const [playerData, setPlayerData] = useState(DEFAULT_STATE);
    const [isTestState, setIsTestState] = useState(false);
    const [timeUpdated, setTimeUpdated] = useState(null);
    const [timeSinceMessage, setTimeSinceMessage] = useState('...');
    const [status, setStatus] = useState(DEFAULT_STATUS);

    // time updated handling - not much of this belongs in fe
    useEffect(() => {
        if (!timeUpdated) return;

        const intervalHandler = setInterval(() => {
            const calculated = Math.floor(Math.abs(timeUpdated - Date.now()) / 1000);
            
            if (calculated < 15) {
                setTimeSinceMessage('a few seconds ago.');
            } else if (calculated < 60) {
                setTimeSinceMessage('less than a minute ago.');
            } else if (calculated < 90) {
                setTimeSinceMessage('less than a minute ago.');
            } else if (calculated < 300) {
                setTimeSinceMessage('a few minutes ago.');
            } else {
                const date = new Date(timeUpdated);
                // todo convert date to readable format
                setTimeSinceMessage(date.getFullYear());
            }
        }, 7000)

        return () => clearInterval(intervalHandler);
    }, [timeUpdated]);
    
    // basic query
    useEffect(() => {
        if (!username) return;

        if (username === 'use-test-state') {
            setPlayerData(DEFAULT_STATE);
            setIsTestState(true);
        } else {
            (async () => {
                // completely ignores error states...s
                const data = await getPlayer(username);
                const currentTime = Date.now();
                setTimeUpdated(currentTime);
                setPlayerData(data);
                setIsTestState(false);
                setTimeSinceMessage('just now.');
            })();
        }
    }, [username]);

    // is online
    useEffect(() => {
        const getStatusWrapper = async () => {
            const data = await getStatus(playerData?.id);
            const newState = {
                online: !!data?.online,
                playing: !!data?.playing,
            };
            setStatus(newState);
        }
        if (isTestState) {
            setStatus({
                online: true,
                playing: true,
            });
        } else {
            getStatusWrapper();
            const statusInterval = setInterval(() => {
                getStatusWrapper();
            }, 5000);
            
            return () => clearInterval(statusInterval);
        }

    }, [playerData])

    if (!username) {
        return null;
    }

    const renderHeadline = () => (
            <div className="details-headline">
                {playerData?.title && <div className="headline-title">
                    {playerData?.title}
                </div>}
                <div className="headline-username">
                    {playerData?.username}
                </div>
            </div>
    );


    const renderRatings = () => {
        const ratings = [];
        const { perfs } = playerData || {};

        DEFAULT_CATS.forEach(cat => {
            ratings.push({
                type: cat,
                value: perfs?.[cat]?.rating,
            })
        });

        return (
            <div className="ratings-container">
                {ratings?.map(entry => (
                        <div className="ratings-entry">
                            <span className="ratings-entry-type">
                                {entry?.type}
                            </span>
                            <span className="ratings-entry-value">
                                <CountUp value={entry?.value} duration={750} />
                            </span>
                        </div>
                    ))}
                    {renderExtraDetail()}
            </div>
        )
    }

    const renderTimeSinceUpdate = () => {
        return (
            <div className="time-since">
                Last updated {timeSinceMessage}
            </div>
        )
    }

    // last updated def needs to live in BE and not calculated by FE
    const renderExtraDetail = () => (
        <div className="games-count-container">
            <div>
                <span className="games-count-title">
                    Total games played
                </span>
                <span className="games-count-value">
                    <CountUp value={playerData?.count?.all} duration={1000} />
                </span>
            </div>
            {renderTimeSinceUpdate()}
        </div>
    );

    const renderStatus = () => {
        const { online, playing } = status;

        const onlineString = status?.online ? 'Online' : 'Offline';
        const onlineIcon = status?.online
            ? <RiCheckboxBlankCircleFill />
            : <RiCheckboxBlankCircleLine />;
        const nowPlayingElement = (
            <div className="status now-playing">
                <span>{<FaVideo />}{' '}Now Playing!</span>
            </div>
        );

        return (
            <div className="status-container">
                <div className={`status ${onlineString}`}>
                    <span>{onlineIcon}{' '}{onlineString}</span>
                </div>
                {playing && nowPlayingElement}
            </div>
        )
    }

    return (
        <div className="profile-container">
            <div className="icon-container">
                <FiUser className="icon"/>
                {renderStatus()}
            </div>
            <div className="details-container">
                {renderHeadline()}
                {renderRatings()}
             </div>
        </div>
    );
};
