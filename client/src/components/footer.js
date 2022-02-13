import React from 'react'

import { FaHeart } from 'react-icons/fa';
// Footer 구현
const Footer = () => {
    return (
        <footer>
            <small>
              © {new Date().getFullYear()} made with <FaHeart style={{ color: 'red' }} /> by -{' '}
              <a target="_blank" rel="noopener noreferrer" href=" https://github.com/codestates/beb-02-hypebear">
                HYPEBEAR
              </a>
            </small>
            <br />
            <div className="social-bagdes">
              <a href="https://github.com/codestates/beb-02-hypebear" target="_blank" rel="noopener noreferrer">
                <img
                  alt="GitHub followers"
                  src="https://img.shields.io/github/followers/codestates?label=github&style=social"
                />
              </a>
              <a href="https://twitter.com/azouaoui_med" target="_blank" rel="noopener noreferrer">
                <img
                  alt="Twitter Follow"
                  src="https://img.shields.io/twitter/follow/codestates?label=twitter&style=social"
                />
              </a>
            </div>
      </footer>
    )
}

export default Footer;
